'use strict';
/* IA Architecte — Media Studio | Unsplash & Google Fonts */

const MediaStudio = (() => {
    
    const UNSPLASH_SEARCH = 'https://source.unsplash.com/featured/?';
    const GOOGLE_FONTS = [
        { name: 'Inter', family: "'Inter', sans-serif" },
        { name: 'Roboto', family: "'Roboto', sans-serif" },
        { name: 'Playfair Display', family: "'Playfair Display', serif" },
        { name: 'Montserrat', family: "'Montserrat', sans-serif" },
        { name: 'Open Sans', family: "'Open Sans', sans-serif" },
        { name: 'Poppins', family: "'Poppins', sans-serif" },
        { name: 'Oswald', family: "'Oswald', sans-serif" },
        { name: 'Merriweather', family: "'Merriweather', serif" }
    ];

    function renderMediaTab() {
        const isFr = window.lang === 'fr';
        return `
<div class="media-studio">
    <div class="ms-section">
        <h3>🖼️ ${isFr ? 'Recherche Unsplash' : 'Unsplash Search'}</h3>
        <div class="ms-search">
            <input type="text" id="ms-img-query" placeholder="${isFr ? 'Ex: business, nature...' : 'Exp: business, nature...'}">
            <button id="ms-img-search-btn">🔍</button>
        </div>
        <div id="ms-img-preview" class="ms-preview"></div>
    </div>
    
    <div class="ms-section" style="margin-top:20px">
        <h3>🔡 ${isFr ? 'Google Fonts Explorer' : 'Google Fonts Explorer'}</h3>
        <div class="ms-fonts-grid">
            ${GOOGLE_FONTS.map(f => `
                <div class="ms-font-card" onclick="MediaStudio.injectFont('${f.name}', '${f.family}')">
                    <span style="font-family:${f.family}">${f.name}</span>
                    <button>+</button>
                </div>
            `).join('')}
        </div>
    </div>
</div>
<style>
    .media-studio { padding: 15px; }
    .ms-section h3 { font-size: 13px; color: #fff; margin-bottom: 10px; opacity: 0.8; }
    .ms-search { display: flex; gap: 5px; margin-bottom: 10px; }
    .ms-search input { flex: 1; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: #fff; padding: 8px; font-size: 13px; }
    .ms-search button { background: #3b82f6; border: none; border-radius: 8px; color: #fff; padding: 0 12px; cursor: pointer; }
    .ms-preview { width: 100%; height: 180px; background: #111; border-radius: 12px; border: 2px dashed #222; display: flex; align-items: center; justify-content: center; overflow: hidden; cursor: crosshair; }
    .ms-preview img { width: 100%; height: 100%; object-fit: cover; }
    .ms-fonts-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
    .ms-font-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 10px; border-radius: 10px; cursor: pointer; display: flex; justify-content: space-between; align-items:center; transition: 0.2s; }
    .ms-font-card:hover { border-color: #3b82f6; background: rgba(59,130,246,0.1); }
    .ms-font-card span { font-size: 12px; color: #fff; }
    .ms-font-card button { background: none; border: none; color: #3b82f6; font-size: 18px; cursor: pointer; font-weight: 700; }
</style>
        `;
    }

    function searchImage() {
        const queryInp = document.getElementById('ms-img-query');
        const query = queryInp ? queryInp.value || 'abstract' : 'abstract';
        // Switching to loremflickr for much higher reliability than source.unsplash
        const url = `https://loremflickr.com/800/600/${encodeURIComponent(query)}?lock=${Math.floor(Math.random()*1000)}`;
        const preview = document.getElementById('ms-img-preview');
        if(preview) {
            preview.innerHTML = `<div style="width:100%; height:100%; position:relative; background:#000;">
                <img src="${url}" 
                     onload="this.nextElementSibling.style.display='none'" 
                     onerror="this.src='https://via.placeholder.com/800x600?text=Search+Failed'"
                     onclick="MediaStudio.injectImage('${url}')" 
                     title="Click to inject into code" 
                     style="cursor:pointer; width:100%; height:100%; object-fit:cover; display:block;">
                <div style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:#111; color:#555; font-size:12px; font-weight:700;">⌛ GENERATING ASSET...</div>
            </div>`;
        }
    }

    function injectImage(url) {
        if(!window.insertAtCursor) return;
        const html = `<img src="${url}" alt="Stock Image" style="width:100%; border-radius:15px; box-shadow:0 15px 40px rgba(0,0,0,0.3); margin: 25px 0; display:block;">`;
        window.insertAtCursor('\n' + html + '\n');
        if(window.showToast) window.showToast('🖼️ Professional Image Injected!');
        if(window.runPreview) window.runPreview();
    }

    function injectFont(name, family) {
        if(!window.editor) return;
        const model = window.editor.getModel();
        let code = model.getValue();
        
        const linkTag = `<link href="https://fonts.googleapis.com/css2?family=${name.replace(/ /g, '+')}&display=swap" rel="stylesheet">`;
        const styleTag = `<style id="ms-font-style">\n  body { font-family: ${family} !important; }\n</style>`;

        // Clean previous font style if exists
        code = code.replace(/<style id="ms-font-style">[\s\S]*?<\/style>/g, '');

        if (!code.includes(linkTag)) {
            if (code.includes('</head>')) {
                code = code.replace('</head>', `  ${linkTag}\n</head>`);
            } else if (code.includes('<body')) {
                code = code.replace('<body', linkTag + '\n<body');
            } else {
                code = linkTag + '\n' + code;
            }
        }
        
        if (code.includes('</head>')) {
             code = code.replace('</head>', `  ${styleTag}\n</head>`);
        } else if (code.includes('<body')) {
             code = code.replace('<body', styleTag + '\n<body');
        } else {
             code += '\n' + styleTag;
        }

        window.editor.setValue(code);
        if(window.showToast) window.showToast(`🔡 Font ${name} applied!`);
        if(window.runPreview) window.runPreview();
    }

    function init() {
        document.addEventListener('click', e => {
            if(e.target && e.target.id === 'ms-img-search-btn') searchImage();
        });
        document.addEventListener('keydown', e => {
            if(e.target && e.target.id === 'ms-img-query' && e.key === 'Enter') searchImage();
        });
    }

    return { renderMediaTab, injectImage, injectFont, init };
})();

window.MediaStudio = MediaStudio;
MediaStudio.init();
