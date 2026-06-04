/** guide-knowledge.js — IA Guide Bot Knowledge Base */
window.GK = {
  categories: {
    ai:      { label:'🤖 AI & Logic',    color:'#8b5cf6', modules:['iaultra','voice','bugfixer','codeexplain','lpscore','prompt','personaswarm','neuro','aipair','aimentor'] },
    visual:  { label:'✨ Visual FX',     color:'#38bdf8', modules:['zerog','vortexui','cyberglitch','chaosshake','neonpulse','xrayvision','terminalos','pixelforge','glassbreaker','vhsrewind','glassmorphism'] },
    design:  { label:'🎨 Design',      color:'#ec4899', modules:['gradient','typography','cssanim','icongen','gridbuilder','colorharmony','background'] },
    devtools:{ label:'🔧 Dev Tools',   color:'#f59e0b', modules:['regexforge','cronstudio','dataforge','webhooklab','bundleradar','sqlbuilder','jsonvis','dbarch','performance'] },
    network: { label:'🌐 Network',     color:'#06b6d4', modules:['headers','jwt','livapi','sitemap','seo'] },
    data:    { label:'🗃️ Data',        color:'#34d399', modules:['mockdata','codehealth','codestats','audit','deadcss'] },
    biz:     { label:'📈 Business',    color:'#fbbf24', modules:['invoice','ratecalc','monetizecalc','privacy','cookies','devscore'] },
    social:  { label:'📱 Social',      color:'#f97316', modules:['social','promo','timelapse','email','qrcode'] },
    '3d':    { label:'🕶️ 3D / AR',    color:'#a78bfa', modules:['webxr','draw3d','threejs','dom3d'] },
    collab:  { label:'👥 Collab',      color:'#60a5fa', modules:['collab','github','timemachine','pomodoro','export'] },
    ads:     { label:'📢 Ad Studio',   color:'#f43f5e', modules:['productad','adbannerpro','ythumb','socialproof','podcast','licarousel','webticket','rollup','billboard','fencebanner','floatingprod','lightbox','pedestal','printflyer','doohsim','iabbanner','promobanner','videoad','storiesad','gamifiedad','smartpopup'] },
    futuretech: { label:'🔮 FUTURE TECH LAB', color:'#8b5cf6', modules:['web3studio','extgen','scraperbot','gameengine','cloudarch','neuralnet','quantum','iot','webxr','zk','webrtc','geomap','aiswarm','biotech','hud'] }
  },
  en: {
    iaultra:     { tab:'iaultra',     icon:'⚡', name:'IA ULTRA',              desc:'Type any idea → full website generated instantly. Most powerful module.',           how:'1. Type: "A sushi restaurant" → 2. Press Enter → 3. Complete site appears!' },
    voice:       { tab:'voice',       icon:'🎙️', name:'Voice AI',              desc:'Speak or type a command → AI generates HTML/CSS instantly.',                        how:'1. Click mic or type → 2. Say "Add blue navbar" → 3. Code injected!' },
    bugfixer:    { tab:'bugfix',      icon:'🤖', name:'AI Bug Fixer',          desc:'Paste console error → get explanation + fix code instantly.',                       how:'1. Paste error → 2. Click Analyze → 3. Copy fix or inject to editor' },
    codeexplain: { tab:'codeexplain', icon:'🔮', name:'Code Explainer',        desc:'Paste any code → AI explains line by line in EN or FR.',                           how:'1. Paste code → 2. Choose EN/FR → 3. Click Explain' },
    lpscore:     { tab:'lpscore',     icon:'🎯', name:'Landing Page Score',    desc:'Paste HTML → get conversion score: CTA, SEO, Trust, Mobile (A+ to F).',           how:'1. Paste page HTML → 2. Click Analyze → 3. See score + tips' },
    gradient:    { tab:'gradient',    icon:'🌈', name:'Gradient Studio',       desc:'Build mesh, conic, radial gradients visually. Export CSS or SVG.',                  how:'1. Pick type → 2. Drag color stops → 3. Copy CSS' },
    typography:  { tab:'typography',  icon:'🔤', name:'Typography AI',         desc:'Pick a mood → AI suggests Google Font combos with live preview.',                   how:'1. Select mood → 2. See font pairs → 3. Inject to editor' },
    cssanim:     { tab:'cssanim',     icon:'🎬', name:'CSS Animation Timeline',desc:'Visual @keyframes editor. Play, pause, export CSS animations.',                    how:'1. Add elements → 2. Set keyframes → 3. Play & export' },
    icongen:     { tab:'icongen',     icon:'🎨', name:'Icon Generator',        desc:'Generate favicon + icon set (16px→512px) from emoji or text.',                     how:'1. Type emoji/letter → 2. Pick style → 3. Download PNG set' },
    gridbuilder: { tab:'gridbuilder', icon:'📐', name:'Grid/Flexbox Builder',  desc:'Drag-and-drop layout builder → export clean CSS Grid or Flexbox.',                 how:'1. Choose Grid/Flex → 2. Drag items → 3. Copy CSS' },
    colorharmony:{ tab:'colorharmony',icon:'🎨', name:'Color Harmony',         desc:'Pick a base color → generate harmonious palette (complementary, triadic...).',      how:'1. Pick color → 2. Choose harmony type → 3. Copy palette' },
    background:  { tab:'background',  icon:'🖼️', name:'Background Lab',        desc:'Generate animated/static backgrounds: particles, waves, gradients.',                how:'1. Choose style → 2. Customize → 3. Copy CSS/JS' },
    glassmorphism:{ tab:'glassmorphism',icon:'💎',name:'Glassmorphism',        desc:'Generate glass-effect UI components with blur, transparency controls.',             how:'1. Adjust blur/opacity → 2. Preview → 3. Copy CSS' },
    sqlbuilder:  { tab:'sqlbuilder',  icon:'🗃️', name:'SQL Query Builder',     desc:'Build SELECT/JOIN/WHERE queries visually → export SQL + mock data.',               how:'1. Set table → 2. Add columns/WHERE/JOIN → 3. Generate SQL' },
    jsonvis:     { tab:'jsonviz',     icon:'📊', name:'JSON Visualizer',       desc:'Paste JSON → interactive collapsible tree with search & edit.',                     how:'1. Paste JSON → 2. Browse tree → 3. Search/edit/export' },
    dbarch:      { tab:'dbarch',      icon:'🗃️', name:'DB Architect',          desc:'Design database schemas visually → generate backend mock API.',                     how:'1. Create tables → 2. Add fields → 3. Generate backend code' },
    regex:       { tab:'regex',       icon:'🔍', name:'Regex Tester',          desc:'Test regular expressions live with match highlighting and explanations.',            how:'1. Write pattern → 2. Paste test text → 3. See matches' },
    performance: { tab:'performance', icon:'⚡', name:'Performance Profiler',  desc:'Analyze code for performance issues, unused CSS, load time hints.',                 how:'1. Paste code → 2. Run audit → 3. See tips' },
    pwa:         { tab:'pwagen',      icon:'📱', name:'PWA Generator',         desc:'Generate manifest.json + service worker to make your app installable.',             how:'1. Fill app info → 2. Generate → 3. Download PWA files' },
    autodocs:    { tab:'autodocs',    icon:'📚', name:'Auto-Docs',             desc:'Analyze code → generate professional README.md automatically.',                     how:'1. Write code in editor → 2. Generate README → 3. Download' },
    smartrefactor:{ tab:'refactor',   icon:'🔧', name:'Smart Refactor',        desc:'Paste code → AI suggests refactoring improvements and cleaner patterns.',           how:'1. Paste code → 2. Analyze → 3. Apply suggestions' },
    headers:     { tab:'headers',     icon:'🌐', name:'HTTP Headers Inspector',desc:'Analyze security headers of any URL. Score A+ to D + recommendations.',            how:'1. Enter URL → 2. Inspect → 3. See security score' },
    jwt:         { tab:'jwt',         icon:'🔑', name:'JWT Tool',              desc:'Decode, encode, validate JWT tokens. See header/payload/signature.',                how:'1. Paste token → 2. Decode → 3. Edit & re-encode' },
    livapi:      { tab:'apihub',      icon:'🔌', name:'Live API Tester',       desc:'Test REST APIs: GET/POST/PUT/DELETE with headers and body.',                        how:'1. Enter URL → 2. Choose method → 3. Send & see response' },
    sitemap:     { tab:'sitemap',     icon:'🗺️', name:'Sitemap Generator',     desc:'Generate sitemap.xml from your page structure for SEO.',                           how:'1. Enter pages → 2. Set priority → 3. Download sitemap.xml' },
    seo:         { tab:'seo',         icon:'🔍', name:'SEO Meta Studio',       desc:'Generate all meta tags: OG, Twitter Card, SEO. Preview how it looks.',             how:'1. Fill title/desc → 2. Preview social cards → 3. Copy tags' },
    mockdata:    { tab:'mockdata',    icon:'🎲', name:'Mock Data Injector',    desc:'Generate realistic fake data: users, products, orders in JSON/CSV.',               how:'1. Choose data type → 2. Set count → 3. Export JSON/CSV' },
    codehealth:  { tab:'codeaudit',   icon:'💊', name:'Code Health',           desc:'Scan for complexity, duplicates, long functions, naming issues.',                   how:'1. Paste code → 2. Analyze → 3. See health score + tips' },
    codestats:   { tab:'codestats',   icon:'📊', name:'Code Stats',            desc:'Count lines, functions, complexity metrics for your codebase.',                     how:'1. Paste code → 2. See stats → 3. Copy report' },
    audit:       { tab:'audit',       icon:'🛡️', name:'Code Audit',            desc:'Security, SEO, accessibility, performance — full code scan.',                       how:'1. Write code in editor → 2. Run Audit → 3. Auto-Fix issues' },
    deadcss:     { tab:'deadcss',     icon:'🪦', name:'Dead CSS Finder',       desc:'Find unused CSS selectors in your stylesheet.',                                     how:'1. Paste CSS + HTML → 2. Scan → 3. Remove dead rules' },
    social:      { tab:'socialshowcase',icon:'📱',name:'Social Preview',       desc:'Preview your site on Twitter, Facebook, LinkedIn before publishing.',              how:'1. Extract from code → 2. Edit OG tags → 3. Inject to editor' },
    timelapse:   { tab:'timelapse',   icon:'🎬', name:'Timelapse Recorder',    desc:'Record your coding as a timelapse video for social media.',                        how:'1. Start recording → 2. Code → 3. Export MP4' },
    email:       { tab:'emailstudio', icon:'📧', name:'Email Studio',          desc:'Build responsive HTML email templates with preview.',                              how:'1. Choose template → 2. Edit content → 3. Copy HTML' },
    qrcode:      { tab:'qrcode',      icon:'📱', name:'QR Code Generator',     desc:'Generate custom QR codes for URLs, text, WiFi, vCard.',                           how:'1. Enter content → 2. Customize style → 3. Download PNG' },
    webxr:       { tab:'webxr',       icon:'🕶️', name:'WebXR / AR Studio',    desc:'Load 3D models, view in AR on mobile. Generate QR for AR preview.',              how:'1. Load .glb model → 2. Generate AR QR → 3. Scan with phone' },
    draw3d:      { tab:'draw3d',      icon:'✏️', name:'Draw to 3D',            desc:'Draw 2D shapes → extruded into 3D objects in real-time.',                         how:'1. Draw on canvas → 2. Adjust depth → 3. Export 3D scene' },
    dom3d:       { tab:'dom3d',       icon:'🔮', name:'DOM 3D Explorer',       desc:'Visualize your HTML DOM as an interactive 3D structure.',                          how:'1. Paste HTML → 2. Explore 3D tree → 3. Click nodes to inspect' },
    collab:      { tab:'collab',      icon:'👥', name:'Code Collaboration',    desc:'Share your editor session with a link. Real-time collaborative coding.',           how:'1. Click Share → 2. Send link → 3. Code together live' },
    github:      { tab:'githubsync',  icon:'🐙', name:'GitHub Sync',           desc:'Connect to GitHub: push/pull code directly from the studio.',                      how:'1. Enter repo URL + token → 2. Pull/push → 3. Sync changes' },
    timemachine: { tab:'timetravel',  icon:'🕰️', name:'Time Machine',          desc:'Browse history of your code changes. Restore any previous version.',             how:'1. Open Time Machine → 2. Browse snapshots → 3. Restore' },
    pomodoro:    { tab:'pomodoro',    icon:'🍅', name:'Pomodoro Timer',        desc:'Built-in Pomodoro timer to boost productivity while coding.',                      how:'1. Set work/break time → 2. Start → 3. Focus!' },
    export:      { tab:'exporthub',   icon:'📦', name:'Export Hub',            desc:'Export as standalone HTML file or deploy to Netlify/Vercel.',                      how:'Click Export All → download HTML. Or Deploy for a live URL.' },
    password:    { tab:'password',    icon:'🔒', name:'Password Analyzer',     desc:'Test password strength, estimate crack time, generate secure passwords.',          how:'1. Type password → 2. See strength + crack time → 3. Generate secure one' },
    
    // 🧩 5 New Genius Tools
    regexforge:  { tab:'regexforge',  icon:'🧩', name:'Regex Forge',           desc:'Visual regex builder. Type text, and it generates the regex pattern.',             how:'1. Type email/url/number → 2. Click Build Regex → 3. Code injected!' },
    cronstudio:  { tab:'cronstudio',  icon:'⏳', name:'Cron Studio',           desc:'Generate cron job schedules via a simple dropdown list.',                          how:'1. Select schedule ("Every Monday at 4AM") → 2. Code injected!' },
    dataforge:   { tab:'dataforge',   icon:'📦', name:'Data Forge',            desc:'Convert JSON into TypeScript interfaces and Zod validation schemas.',              how:'1. Paste JSON → 2. Click Generate → 3. TS + Zod injected!' },
    webhooklab:  { tab:'webhooklab',  icon:'🪝', name:'Webhook Lab',           desc:'Simulate incoming webhooks (e.g., Stripe payments) to test endpoints.',            how:'1. Choose webhook type → 2. Run simulation → 3. View logs!' },
    bundleradar: { tab:'bundleradar', icon:'🪶', name:'Bundle Radar',          desc:'Analyze your code dependencies and scripts to estimate total size/speed.',         how:'1. Run scan → 2. See KB weight and 3G load time!' },

    // 🎨 5 Crazy Visual Effects
    xrayvision:  { tab:'xrayvision',  icon:'🦴', name:'X-Ray Vision',          desc:'Strips colors/images and shows the raw wireframe bounding boxes of the UI.',       how:'1. Click Activate → 2. Look at the glowing blueprint in the preview.' },
    terminalos:  { tab:'terminalos',  icon:'💻', name:'Terminal OS',           desc:'Transforms your entire site into a Hackerman 1990s Linux Terminal.',               how:'1. Click Inject → 2. See the green-on-black Matrix effect.' },
    pixelforge:  { tab:'pixelforge',  icon:'🕹️', name:'Pixel Forge',           desc:'Demasters your modern UI into an 8-bit retro Nintendo game aesthetic.',            how:'1. Click Demaster → 2. Play with the pixelated preview.' },
    glassbreaker:{ tab:'glassbreaker',icon:'🔨', name:'Smash UI',              desc:'Interactive module that lets you shatter and break any element you click on.',     how:'1. Load Smasher → 2. Click ANY element in preview to shatter it!' },
    vhsrewind:   { tab:'vhsrewind',   icon:'📼', name:'VHS Rewind',            desc:'Applies realistic VHS tape tracking, distortion, and static noise to your app.',   how:'1. Insert VHS → 2. Watch the tracking distortion.' },

    // 📈 Biz & Marketing 
    invoice:     { tab:'invoice',     icon:'📋', name:'Invoice Generator',     desc:'Create professional invoices for your freelance dev work.',                        how:'1. Fill client details → 2. Add line items → 3. Export PDF/HTML.' },
    ratecalc:    { tab:'ratecalc',    icon:'💼', name:'Freelance Rate Calc',   desc:'Calculate your ideal hourly/daily rate based on expenses & target income.',        how:'1. Enter monthly expenses → 2. Set target profit → 3. Get rate.' },
    monetizecalc:{ tab:'monetizecalc',icon:'💰', name:'Monetization Calc',     desc:'Estimate SaaS revenue based on users, churn, and tier pricing.',                   how:'1. Input user base → 2. Set pricing → 3. See MRR.' },
    privacy:     { tab:'privacy',     icon:'📝', name:'Privacy Policy Gen',    desc:'Generate standard Privacy Policy and Terms of Service documents.',                 how:'1. Enter company name → 2. Generate → 3. Copy text.' },
    cookies:     { tab:'cookies',     icon:'🍪', name:'Cookie Banner Gen',     desc:'Generate a GDPR-compliant Cookie Consent banner for your site.',                   how:'1. Choose styling → 2. Generate → 3. Inject banner script.' },
    devscore:    { tab:'devscore',    icon:'🏆', name:'DevScore',              desc:'Analyze your code quality and get a developer ranking score.',                     how:'1. Run scan → 2. View your dev rank.' },
    ai: { tab:'ai', icon:'🧩', name:'AI', desc:'Open the AI module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    aichat: { tab:'aichat', icon:'🧩', name:'AI Chat', desc:'Open the AI Chat module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    dtstudio: { tab:'dtstudio', icon:'🧩', name:'Tokens', desc:'Open the Tokens module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    devsim: { tab:'devsim', icon:'🧩', name:'Simulator', desc:'Open the Simulator module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    hosting: { tab:'hosting', icon:'🧩', name:'Hosting', desc:'Open the Hosting module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    promo: { tab:'promo', icon:'🧩', name:'Promo AI', desc:'Open the Promo AI module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    a11y: { tab:'a11y', icon:'🧩', name:'A11y', desc:'Open the A11y module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    anim: { tab:'anim', icon:'🧩', name:'Animate', desc:'Open the Animate module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    i18n: { tab:'i18n', icon:'🧩', name:'Translate', desc:'Open the Translate module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    forge: { tab:'forge', icon:'🧩', name:'Forge', desc:'Open the Forge module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    record: { tab:'record', icon:'🧩', name:'Record', desc:'Open the Record module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    stack: { tab:'stack', icon:'🧩', name:'Stack', desc:'Open the Stack module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    mock: { tab:'mock', icon:'🧩', name:'Backend', desc:'Open the Backend module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    pm: { tab:'pm', icon:'🧩', name:'Projects', desc:'Open the Projects module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    tm: { tab:'tm', icon:'🧩', name:'History', desc:'Open the History module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    '3d': { tab:'3d', icon:'🧩', name:'3D WebGL', desc:'Open the 3D WebGL module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    arch: { tab:'arch', icon:'🧩', name:'Flowchart', desc:'Open the Flowchart module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    iapro: { tab:'iapro', icon:'🧩', name:'IA PRO', desc:'Open the IA PRO module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    onemin: { tab:'onemin', icon:'🧩', name:'1-Min App', desc:'Open the 1-Min App module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    wizard: { tab:'wizard', icon:'🧩', name:'App Wizard', desc:'Open the App Wizard module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    prompt: { tab:'prompt', icon:'🧩', name:'Prompt-to-App', desc:'Open the Prompt-to-App module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    guide: { tab:'guide', icon:'🧩', name:'Guide', desc:'Open the Guide module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    snippets: { tab:'snippets', icon:'🧩', name:'Snippets', desc:'Open the Snippets module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    templates: { tab:'templates', icon:'🧩', name:'Templates', desc:'Open the Templates module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    tools: { tab:'tools', icon:'🧩', name:'Tools', desc:'Open the Tools module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    tpro: { tab:'tpro', icon:'🧩', name:'Toolbox Pro', desc:'Open the Toolbox Pro module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    appspro: { tab:'appspro', icon:'🧩', name:'Apps Pro', desc:'Open the Apps Pro module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    sites: { tab:'sites', icon:'🧩', name:'Sites', desc:'Open the Sites module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    elite: { tab:'elite', icon:'🧩', name:'Elite', desc:'Open the Elite module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    vision: { tab:'vision', icon:'🧩', name:'Vision', desc:'Open the Vision module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    nodelogic: { tab:'nodelogic', icon:'🧩', name:'Node Logic', desc:'Open the Node Logic module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    svgstudio: { tab:'svgstudio', icon:'🧩', name:'SVG Studio', desc:'Open the SVG Studio module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    colors: { tab:'colors', icon:'🧩', name:'Colors', desc:'Open the Colors module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    present: { tab:'present', icon:'🧩', name:'Present', desc:'Open the Present module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    security: { tab:'security', icon:'🧩', name:'Security', desc:'Open the Security module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    achievements: { tab:'achievements', icon:'🧩', name:'Badges', desc:'Open the Badges module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    widgets: { tab:'widgets', icon:'🧩', name:'Widgets', desc:'Open the Widgets module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    styleclone: { tab:'styleclone', icon:'🧩', name:'Style Clone', desc:'Open the Style Clone module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    grid: { tab:'grid', icon:'🧩', name:'Grid', desc:'Open the Grid module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    comments: { tab:'comments', icon:'🧩', name:'Comments', desc:'Open the Comments module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    screenshot: { tab:'screenshot', icon:'🧩', name:'Screenshot', desc:'Open the Screenshot module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    genius: { tab:'genius', icon:'🧩', name:'Genius', desc:'Open the Genius module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    assets: { tab:'assets', icon:'🧩', name:'Assets', desc:'Open the Assets module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    media: { tab:'media', icon:'🧩', name:'Media', desc:'Open the Media module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    transcode: { tab:'transcode', icon:'🧩', name:'Transcode', desc:'Open the Transcode module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    stylelab: { tab:'stylelab', icon:'🧩', name:'Style Lab', desc:'Open the Style Lab module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    data: { tab:'data', icon:'🧩', name:'Data', desc:'Open the Data module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    settings: { tab:'settings', icon:'🧩', name:'Settings', desc:'Open the Settings module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    codedna: { tab:'codedna', icon:'🧩', name:'Code DNA', desc:'Open the Code DNA module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    microphysics: { tab:'microphysics', icon:'🧩', name:'Micro-Physics', desc:'Open the Micro-Physics module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    skeleton: { tab:'skeleton', icon:'🧩', name:'Skeleton UI', desc:'Open the Skeleton UI module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    holographic: { tab:'holographic', icon:'🧩', name:'Hologram 3D', desc:'Open the Hologram 3D module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    thanos: { tab:'thanos', icon:'🧩', name:'Dematerialize', desc:'Open the Dematerialize module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    cyberneon: { tab:'cyberneon', icon:'🧩', name:'Cyber Neon', desc:'Open the Cyber Neon module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    gravity: { tab:'gravity', icon:'🧩', name:'Gravity', desc:'Open the Gravity module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    audioui: { tab:'audioui', icon:'🧩', name:'Audio UI', desc:'Open the Audio UI module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    bionic: { tab:'bionic', icon:'🧩', name:'Bionic Read', desc:'Open the Bionic Read module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    legobuilder: { tab:'legobuilder', icon:'🧩', name:'Component Forge', desc:'Open the Component Forge module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    cssarchitect: { tab:'cssarchitect', icon:'🧩', name:'CSS Architect', desc:'Open the CSS Architect module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    logicforge: { tab:'logicforge', icon:'🧩', name:'Logic Forge', desc:'Open the Logic Forge module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    appassembler: { tab:'appassembler', icon:'🧩', name:'App Assembler', desc:'Open the App Assembler module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    paywall: { tab:'paywall', icon:'🧩', name:'Monetize', desc:'Open the Monetize module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    svgdraw: { tab:'svgdraw', icon:'🧩', name:'SVG Studio', desc:'Open the SVG Studio module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    animforge: { tab:'animforge', icon:'🧩', name:'Animations', desc:'Open the Animations module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    chartarch: { tab:'chartarch', icon:'🧩', name:'Charts', desc:'Open the Charts module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    bglab: { tab:'bglab', icon:'🧩', name:'Backgrounds', desc:'Open the Backgrounds module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    voicereader: { tab:'voicereader', icon:'🧩', name:'Voice Reader', desc:'Open the Voice Reader module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    spacingaudit: { tab:'spacingaudit', icon:'🧩', name:'Spacing Audit', desc:'Open the Spacing Audit module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    guidedbuilder: { tab:'guidedbuilder', icon:'🧩', name:'Guided Builder', desc:'Open the Guided Builder module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    errordoctor: { tab:'errordoctor', icon:'🧩', name:'Error Doctor', desc:'Open the Error Doctor module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    themepicker: { tab:'themepicker', icon:'🧩', name:'Theme Picker', desc:'Open the Theme Picker module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    launchcheck: { tab:'launchcheck', icon:'🧩', name:'Launch Check', desc:'Open the Launch Check module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    scrollfx: { tab:'scrollfx', icon:'🧩', name:'Scroll FX', desc:'Open the Scroll FX module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    loaderscreen: { tab:'loaderscreen', icon:'🧩', name:'Loading Screen', desc:'Open the Loading Screen module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    gradientforge: { tab:'gradientforge', icon:'🧩', name:'Gradient Forge', desc:'Open the Gradient Forge module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    uishuffler: { tab:'uishuffler', icon:'🧩', name:'UI Shuffler', desc:'Open the UI Shuffler module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    fontexplorer: { tab:'fontexplorer', icon:'🧩', name:'Font Explorer', desc:'Open the Font Explorer module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    breakpoints: { tab:'breakpoints', icon:'🧩', name:'Breakpoints', desc:'Open the Breakpoints module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    tooltipbuilder: { tab:'tooltipbuilder', icon:'🧩', name:'Tooltip Builder', desc:'Open the Tooltip Builder module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    cssshortcuts: { tab:'cssshortcuts', icon:'🧩', name:'CSS Shortcuts', desc:'Open the CSS Shortcuts module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    microfx: { tab:'microfx', icon:'🧩', name:'Micro FX', desc:'Open the Micro FX module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    heatmap: { tab:'heatmap', icon:'🧩', name:'Heatmap', desc:'Open the Heatmap module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    soundfx: { tab:'soundfx', icon:'🧩', name:'Sound FX', desc:'Open the Sound FX module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    uiblocks: { tab:'uiblocks', icon:'🧩', name:'UI Blocks', desc:'Open the UI Blocks module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    motionfx: { tab:'motionfx', icon:'🧩', name:'Motion FX', desc:'Open the Motion FX module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    dataviz: { tab:'dataviz', icon:'🧩', name:'DataViz', desc:'Open the DataViz module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    web3ui: { tab:'web3ui', icon:'🧩', name:'Web3 Crypto', desc:'Open the Web3 Crypto module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    ailab: { tab:'ailab', icon:'🧩', name:'AI Lab', desc:'Open the AI Lab module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    mobileos: { tab:'mobileos', icon:'🧩', name:'Mobile Clones', desc:'Open the Mobile Clones module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    fintech: { tab:'fintech', icon:'🧩', name:'FinTech & Banking', desc:'Open the FinTech & Banking module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    appstore: { tab:'appstore', icon:'🧩', name:'App Store', desc:'Open the App Store module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    games: { tab:'games', icon:'🧩', name:'Games', desc:'Open the Games module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    timeline: { tab:'timeline', icon:'🧩', name:'Timeline FX', desc:'Open the Timeline FX module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    assetvault: { tab:'assetvault', icon:'🧩', name:'Asset Vault', desc:'Open the Asset Vault module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    uiforge: { tab:'uiforge', icon:'🧩', name:'UI Forge', desc:'Open the UI Forge module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    sonic: { tab:'sonic', icon:'🧩', name:'Sonic Forge', desc:'Open the Sonic Forge module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    svgshaper: { tab:'svgshaper', icon:'🧩', name:'SVG Shaper', desc:'Open the SVG Shaper module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    fwconvert: { tab:'fwconvert', icon:'🧩', name:'Convert', desc:'Open the Convert module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    apitester: { tab:'apitester', icon:'🧩', name:'API Tester', desc:'Open the API Tester module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    respmatrix: { tab:'respmatrix', icon:'🧩', name:'Matrix', desc:'Open the Matrix module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    moodboard: { tab:'moodboard', icon:'🧩', name:'Mood Board', desc:'Open the Mood Board module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    aipair: { tab:'aipair', icon:'🧩', name:'AI Pair', desc:'Open the AI Pair module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    userflow: { tab:'userflow', icon:'🧩', name:'User Flow', desc:'Open the User Flow module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    earthmap: { tab:'earthmap', icon:'🧩', name:'Earth Map', desc:'Open the Earth Map module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    appstory: { tab:'appstory', icon:'🧩', name:'App Story', desc:'Open the App Story module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    codepredict: { tab:'codepredict', icon:'🧩', name:'Predictor', desc:'Open the Predictor module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    challenges: { tab:'challenges', icon:'🧩', name:'Challenges', desc:'Open the Challenges module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    aimentor: { tab:'aimentor', icon:'🧩', name:'AI Mentor', desc:'Open the AI Mentor module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    npmexplorer: { tab:'npmexplorer', icon:'🧩', name:'NPM', desc:'Open the NPM module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    codereview: { tab:'codereview', icon:'🧩', name:'Code Review', desc:'Open the Code Review module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    profiler: { tab:'profiler', icon:'🧩', name:'Profiler', desc:'Open the Profiler module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    cssspec: { tab:'cssspec', icon:'🧩', name:'Specificity', desc:'Open the Specificity module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    abtest: { tab:'abtest', icon:'🧩', name:'A/B Test', desc:'Open the A/B Test module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    s2c: { tab:'s2c', icon:'🧩', name:'Img→Code', desc:'Open the Img→Code module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    layout: { tab:'layout', icon:'🧩', name:'Layout', desc:'Open the Layout module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    carbon: { tab:'carbon', icon:'🧩', name:'Carbon', desc:'Open the Carbon module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    bizval: { tab:'bizval', icon:'🧩', name:'Validate', desc:'Open the Validate module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    hooks: { tab:'hooks', icon:'🧩', name:'Hooks', desc:'Open the Hooks module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    commit: { tab:'commit', icon:'🧩', name:'Commit', desc:'Open the Commit module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    tailwind: { tab:'tailwind', icon:'🧩', name:'Tailwind', desc:'Open the Tailwind module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    colorblind: { tab:'colorblind', icon:'🧩', name:'ColorBlind', desc:'Open the ColorBlind module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    fluidtype: { tab:'fluidtype', icon:'🧩', name:'FluidType', desc:'Open the FluidType module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    pricing: { tab:'pricing', icon:'🧩', name:'Pricing', desc:'Open the Pricing module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    pitchdeck: { tab:'pitchdeck', icon:'🧩', name:'Pitch Deck', desc:'Open the Pitch Deck module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    brandkit: { tab:'brandkit', icon:'🧩', name:'Brand Kit', desc:'Open the Brand Kit module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    funnel: { tab:'funnel', icon:'🧩', name:'Funnel', desc:'Open the Funnel module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    outreach: { tab:'outreach', icon:'🧩', name:'Outreach', desc:'Open the Outreach module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    roicalc: { tab:'roicalc', icon:'🧩', name:'ROI Calc', desc:'Open the ROI Calc module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    competitor: { tab:'competitor', icon:'🧩', name:'Competitor', desc:'Open the Competitor module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    testimonial: { tab:'testimonial', icon:'🧩', name:'Testimonials', desc:'Open the Testimonials module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    contentcal: { tab:'contentcal', icon:'🧩', name:'Calendar', desc:'Open the Calendar module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    contract: { tab:'contract', icon:'🧩', name:'Contract', desc:'Open the Contract module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    proposal: { tab:'proposal', icon:'🧩', name:'Proposal', desc:'Open the Proposal module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    promobanner: { tab:'promobanner', icon:'🧩', name:'Promo Banner', desc:'Open the Promo Banner module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    analytics: { tab:'analytics', icon:'🧩', name:'Analytics', desc:'Open the Analytics module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    videoad: { tab:'videoad', icon:'🧩', name:'Video Ad', desc:'Open the Video Ad module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    storiesad: { tab:'storiesad', icon:'🧩', name:'Stories Ad', desc:'Open the Stories Ad module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    gamifiedad: { tab:'gamifiedad', icon:'🧩', name:'Gamified Ad', desc:'Open the Gamified Ad module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    smartpopup: { tab:'smartpopup', icon:'🧩', name:'Smart Popup', desc:'Open the Smart Popup module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    flipcard: { tab:'flipcard', icon:'🧩', name:'3D Flip Card', desc:'Open the 3D Flip Card module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    meshgrad: { tab:'meshgrad', icon:'🧩', name:'Mesh Gradient', desc:'Open the Mesh Gradient module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    herobuilder: { tab:'herobuilder', icon:'🧩', name:'Hero Builder', desc:'Open the Hero Builder module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    textanim: { tab:'textanim', icon:'🧩', name:'Text Anim', desc:'Open the Text Anim module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    pricingpage: { tab:'pricingpage', icon:'🧩', name:'Pricing Page', desc:'Open the Pricing Page module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    newsletter: { tab:'newsletter', icon:'🧩', name:'Newsletter', desc:'Open the Newsletter module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    smartfaq: { tab:'smartfaq', icon:'🧩', name:'Smart FAQ', desc:'Open the Smart FAQ module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    autobio: { tab:'autobio', icon:'🧩', name:'Auto Bio', desc:'Open the Auto Bio module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    predictor: { tab:'predictor', icon:'🧩', name:'Predictor', desc:'Open the Predictor module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    apimock: { tab:'apimock', icon:'🧩', name:'API Mock', desc:'Open the API Mock module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    journey: { tab:'journey', icon:'🧩', name:'Journey Map', desc:'Open the Journey Map module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    speedbudget: { tab:'speedbudget', icon:'🧩', name:'Speed Budget', desc:'Open the Speed Budget module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    oauthflow: { tab:'oauthflow', icon:'🧩', name:'OAuth Flow', desc:'Open the OAuth Flow module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    digicard: { tab:'digicard', icon:'🧩', name:'Digital Card', desc:'Open the Digital Card module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    emailsig: { tab:'emailsig', icon:'🧩', name:'Email Sig', desc:'Open the Email Sig module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    printflyer: { tab:'printflyer', icon:'🧩', name:'Print Flyer', desc:'Open the Print Flyer module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    doohsim: { tab:'doohsim', icon:'🧩', name:'DOOH Sim', desc:'Open the DOOH Sim module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    iabbanner: { tab:'iabbanner', icon:'🧩', name:'IAB Banners', desc:'Open the IAB Banners module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    productad: { tab:'productad', icon:'🧩', name:'Product Ad', desc:'Open the Product Ad module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    adbannerpro: { tab:'adbannerpro', icon:'🧩', name:'Ad Banner Pro', desc:'Open the Ad Banner Pro module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    ythumb: { tab:'ythumb', icon:'🧩', name:'YT Thumb', desc:'Open the YT Thumb module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    socialproof: { tab:'socialproof', icon:'🧩', name:'Social Proof', desc:'Open the Social Proof module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    podcast: { tab:'podcast', icon:'🧩', name:'Podcast Art', desc:'Open the Podcast Art module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    licarousel: { tab:'licarousel', icon:'🧩', name:'LI Carousel', desc:'Open the LI Carousel module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    webticket: { tab:'webticket', icon:'🧩', name:'Event Ticket', desc:'Open the Event Ticket module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    rollup: { tab:'rollup', icon:'🧩', name:'Roll-Up', desc:'Open the Roll-Up module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    billboard: { tab:'billboard', icon:'🧩', name:'Billboard', desc:'Open the Billboard module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    fencebanner: { tab:'fencebanner', icon:'🧩', name:'Fence Banner', desc:'Open the Fence Banner module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    floatingprod: { tab:'floatingprod', icon:'🧩', name:'Floating Prod', desc:'Open the Floating Prod module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    lightbox: { tab:'lightbox', icon:'🧩', name:'Lightbox', desc:'Open the Lightbox module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    pedestal: { tab:'pedestal', icon:'🧩', name:'Pedestal', desc:'Open the Pedestal module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    '404gen': { tab:'404gen', icon:'🧩', name:'404', desc:'Open the 404 module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    units: { tab:'units', icon:'🧩', name:'Units', desc:'Open the Units module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    loader: { tab:'loader', icon:'🧩', name:'Loader', desc:'Open the Loader module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    cursor: { tab:'cursor', icon:'🧩', name:'Cursor', desc:'Open the Cursor module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    eco: { tab:'eco', icon:'🧩', name:'Eco-Tracker', desc:'Open the Eco-Tracker module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    personaswarm: { tab:'personaswarm', icon:'🧩', name:'AI Personas', desc:'Open the AI Personas module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    haptic: { tab:'haptic', icon:'🧩', name:'Haptic Forge', desc:'Open the Haptic Forge module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    cinematic: { tab:'cinematic', icon:'🧩', name:'Cinematic', desc:'Open the Cinematic module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    gamification: { tab:'gamification', icon:'🧩', name:'Gamify UI', desc:'Open the Gamify UI module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    chaos: { tab:'chaos', icon:'🧩', name:'Chaos Sim', desc:'Open the Chaos Sim module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    neuro: { tab:'neuro', icon:'🧩', name:'Neuro UX', desc:'Open the Neuro UX module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    zerog: { tab:'zerog', icon:'🧩', name:'Zero-G UI', desc:'Open the Zero-G UI module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    vortexui: { tab:'vortexui', icon:'🧩', name:'Vortex Hole', desc:'Open the Vortex Hole module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    cyberglitch: { tab:'cyberglitch', icon:'🧩', name:'Cyber Glitch', desc:'Open the Cyber Glitch module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    chaosshake: { tab:'chaosshake', icon:'🧩', name:'Chaos Shake', desc:'Open the Chaos Shake module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    neonpulse: { tab:'neonpulse', icon:'🧩', name:'Neon Pulse', desc:'Open the Neon Pulse module to explore its features.', how:'1. Open module → 2. Use the interface → 3. Apply changes' },
    web3studio: { tab:'web3studio', icon:'🌐', name:'Web3 Studio', desc:'Generate Smart Contracts (Solidity) & Web3 Connect UI.', how:'1. Set Contract Name → 2. Generate Code → 3. Copy or Inject' },
    extgen: { tab:'extgen', icon:'🧩', name:'Browser Ext. Builder', desc:'Generate Chrome Extension Manifest V3 & Background Scripts.', how:'1. Enter Name → 2. Generate Code → 3. Copy or Inject' },
    scraperbot: { tab:'scraperbot', icon:'🤖', name:'Web Scraper Bot', desc:'Generate Node.js Puppeteer scripts for web scraping.', how:'1. Set URL & Selector → 2. Generate Script → 3. Copy or Inject' },
    gameengine: { tab:'gameengine', icon:'🎮', name:'Canvas Game Engine', desc:'Generate HTML5 Mini-Games using JS Canvas.', how:'1. Choose Game Type → 2. Generate Code → 3. Copy or Inject' },
    cloudarch: { tab:'cloudarch', icon:'☁️', name:'Cloud Blueprint', desc:'Generate Docker-Compose / Infrastructure Code.', how:'1. Set Service Name → 2. Generate YAML → 3. Copy or Inject' },
    neuralnet: { tab:'neuralnet', icon:'🧠', name:'AI Model Trainer', desc:'Generate TensorFlow.js / PyTorch training scripts.', how:'1. Set Layers → 2. Generate Code → 3. Copy or Inject' },
    quantum: { tab:'quantum', icon:'🌌', name:'Quantum Circuit', desc:'Generate IBM Qiskit Python Scripts for Quantum Computing.', how:'1. Set Qubits → 2. Generate Code → 3. Copy or Inject' },
    iot: { tab:'iot', icon:'🛸', name:'IoT Firmware Gen', desc:'Generate C++ code for Arduino/ESP32 physical devices.', how:'1. Set WiFi/Sensor → 2. Generate Code → 3. Copy or Inject' },
    webxr: { tab:'webxr', icon:'🕶️', name:'WebXR Metaverse', desc:'Generate A-Frame VR/AR 3D Scenes.', how:'1. Set Environment → 2. Generate Code → 3. Copy or Inject' },
    zk: { tab:'zk', icon:'🔐', name:'Zero-Knowledge Forge', desc:'Generate Circom ZK-SNARKs cryptographic proofs.', how:'1. Set Secret Variable → 2. Generate Code → 3. Copy or Inject' },
    webrtc: { tab:'webrtc', icon:'🌐', name:'WebRTC P2P Engine', desc:'Generate Serverless Video/Data Connection.', how:'1. Choose Connection Type → 2. Generate Code → 3. Copy or Inject' },
    geomap: { tab:'geomap', icon:'🛰️', name:'3D Geo-Mapping', desc:'Generate WebGL 3D Earth Globe with GPS tracking.', how:'1. Enter Lat, Lng → 2. Generate Code → 3. Copy or Inject' },
    aiswarm: { tab:'aiswarm', icon:'🤖', name:'AI Agent Swarm', desc:'Generate Multi-Agent Framework in Node.js.', how:'1. Set Number of Agents → 2. Generate Code → 3. Copy or Inject' },
    biotech: { tab:'biotech', icon:'🧬', name:'DNA Visualizer', desc:'Generate Interactive DNA/Molecule Viewer using Three.js.', how:'1. Input DNA Sequence → 2. Generate Code → 3. Copy or Inject' },
    hud: { tab:'hud', icon:'🕶️', name:'Holographic HUD', desc:'Generate Sci-Fi CSS3D Interfaces.', how:'1. Set Neon Color → 2. Generate Code → 3. Copy or Inject' },

    // ── 💫 PREMIUM STUDIOS (Real client-side functional tools) ──────────────
    assetoptimizer: { tab:'assetoptimizer', icon:'🖼️', name:'Asset Optimizer',
      desc:'Real image compressor using Canvas API. Load any image → compress it → export Base64 ready for <img src> or download.',
      how:'1. Click "Load Image" → choose a file → 2. Adjust quality slider → 3. Click Export to download compressed image or copy Base64.' },

    codeprotector: { tab:'codeprotector', icon:'🛡️', name:'Code Protector',
      desc:'Real HTML/CSS minifier + JavaScript obfuscator. Protects your source code with hex encoding and variable renaming.',
      how:'1. Click "Load from Editor" → 2. Click "Minify & Obfuscate" → 3. Click "Inject to Editor" to replace code with protected version.' },

    indexeddbmgr: { tab:'indexeddbmgr', icon:'🗄️', name:'IndexedDB Manager',
      desc:'Real browser database creator. Define table names → click "Test in Browser" → creates IndexedDB for real → generates full JS code.',
      how:'1. Enter DB name and table names → 2. Click "Test in Browser" → 3. Copy generated JS code or inject to editor.' },

    hardwareapi: { tab:'hardwareapi', icon:'📡', name:'Hardware API Studio',
      desc:'Real device hardware access: GPS coordinates, Live Camera, Battery %, Microphone visualizer. All run directly in the browser.',
      how:'GPS: Click → browser asks permission → shows real coordinates + Google Maps link. Camera: Live stream. Battery: Real %. Mic: Live waveform.' },

    webrtcstreamer: { tab:'webrtcstreamer', icon:'📡', name:'WebRTC Streamer',
      desc:'Real peer-to-peer video/audio streaming using WebRTC API. Generate connection offers, share links, stream live.',
      how:'1. Click "Create Offer" → 2. Share the SDP link → 3. Remote peer clicks "Join" → live P2P stream starts.' },

    aichatbot: { tab:'aichatbot', icon:'🤖', name:'AI Chatbot Studio',
      desc:'Build and test a custom AI chatbot interface. Configure persona, test conversations, export standalone chatbot HTML.',
      how:'1. Set chatbot name and persona → 2. Test the conversation flow → 3. Click "Export Standalone" for ready-to-use chatbot.' },

    svgmorphing: { tab:'svgmorphing', icon:'🎨', name:'SVG Spring Morphing Studio',
      desc:'Real SVG shape morphing with spring physics animation. Draw two SVG paths → animate morphing with spring tension/damping controls.',
      how:'1. Draw or load two SVG shapes → 2. Adjust spring tension/damping → 3. Click Play to animate → 4. Export standalone HTML.' },

    meshgradient: { tab:'meshgradient', icon:'🌈', name:'Mesh Gradient Forge',
      desc:'Create stunning fluid mesh gradients with draggable color nodes. Animated organic movement. Export CSS or standalone HTML.',
      how:'1. Drag color nodes to reposition → 2. Click nodes to change colors → 3. Use presets (Cyberpunk/Ocean/Neural) → 4. Export CSS/HTML.' },

    audiosynth: { tab:'audiosynth', icon:'🎹', name:'Web Audio Synthesizer',
      desc:'Real Web Audio API synthesizer. Neon keyboard with ADSR envelope, oscilloscope visualizer, 4 waveform types. Play real sounds.',
      how:'1. Click piano keys (or press A-K on keyboard) → 2. Adjust ADSR sliders → 3. Choose waveform (Sine/Square/Saw/Triangle) → 4. Watch oscilloscope.' },

    neuralnet: { tab:'neuralnet', icon:'🧠', name:'Neural Network Sandbox',
      desc:'Real backpropagation neural network in the browser. Click to add training data points → watch the decision boundary update live.',
      how:'1. Select Class A or Class B → 2. Click on the plot to add points → 3. Click "Train" → watch decision boundary appear → adjust learning rate.' },

    holographiccard: { tab:'holographiccard', icon:'🎴', name:'Holographic 3D Card Engine',
      desc:'Premium 3D CSS perspective cards with dynamic light glare tracking. Configure text/colors → export self-contained card component.',
      how:'1. Edit card name/number/expiry → 2. Choose gradient preset → 3. Adjust tilt/glare/scale sliders → 4. Move cursor over card → 5. Copy component code.' },

    // ── 🏗️ WEB ARCHITECT ────────────────────────────────────────────────────
    webarchitect: { tab:'webarchitect', icon:'🏗️', name:'Web Architect',
      desc:'Full-stack architecture designer. Plan your web project structure, choose technologies, generate boilerplate code and project setup.',
      how:'1. Choose project type (SPA/SSR/JAMstack) → 2. Select tech stack → 3. Generate architecture diagram → 4. Export boilerplate.' },

    webcontainers: { tab:'webcontainers', icon:'📦', name:'Web Containers',
      desc:'Run full Node.js environments directly in the browser using WebContainers API. Install npm packages, run servers, test live.',
      how:'1. Choose environment template → 2. Edit package.json → 3. Click "Run" → live terminal + preview appears in browser.' },

    nativecompiler: { tab:'nativecompiler', icon:'⚙️', name:'Native Compiler',
      desc:'Compile and run code in multiple languages (Python, Go, Rust, C++) directly in the browser via WASM runtimes.',
      how:'1. Select language → 2. Write or paste code → 3. Click "Compile & Run" → see output in terminal panel.' },

    // ── 🔬 NEXT-GEN LABS ────────────────────────────────────────────────────
    agisentience: { tab:'agisentience', icon:'🧬', name:'AGI Sentience Lab',
      desc:'Experimental AGI consciousness simulator. Multi-model reasoning chains, self-reflection loops, emergent behavior visualization.',
      how:'1. Set reasoning depth → 2. Pose a problem → 3. Watch multi-step AGI reasoning → 4. Export reasoning chain.' },

    deepspace: { tab:'deepspace', icon:'🌌', name:'Deep Space Explorer',
      desc:'WebGL-powered interactive 3D galaxy map. Explore star systems, exoplanets, nebulae. Real NASA data visualization.',
      how:'1. Navigate with mouse → 2. Click a star to zoom in → 3. See planetary data → 4. Export 3D scene.' },

    hyper4d: { tab:'hyper4d', icon:'🔮', name:'Hyper 4D Engine',
      desc:'4-dimensional geometry visualizer. Rotate tesseracts and 4D shapes through 3D space using CSS and WebGL transforms.',
      how:'1. Choose 4D shape (tesseract, 4-sphere...) → 2. Drag to rotate → 3. Adjust rotation speed → 4. Export visualization.' },

    spacenet: { tab:'spacenet', icon:'🛰️', name:'Space Net AI',
      desc:'Satellite mesh network topology designer. Plan constellation orbits, coverage maps, inter-satellite links.',
      how:'1. Set orbit altitude → 2. Add satellites → 3. Generate coverage map → 4. Export network topology.' },

    timewormhole: { tab:'timewormhole', icon:'🌀', name:'Time Wormhole',
      desc:'Temporal data visualization — animate datasets across time dimensions. Compare code evolution, metrics over time.',
      how:'1. Load dataset or code snapshots → 2. Set time range → 3. Play animation → 4. Export timeline video.' },

    quantumdebugger: { tab:'quantumdebugger', icon:'⚛️', name:'Quantum Debugger',
      desc:'Visual quantum circuit debugger. Step through Qiskit circuits, inspect qubit states, Bloch sphere visualizer.',
      how:'1. Paste Qiskit circuit → 2. Step through gates → 3. See qubit states on Bloch sphere → 4. Find errors.' },

    tesseract: { tab:'tesseract', icon:'🔷', name:'Tesseract OCR Studio',
      desc:'Run Tesseract.js OCR in the browser. Upload any image → extract text → clean up → inject to editor.',
      how:'1. Upload image (screenshot/photo) → 2. Click "Extract Text" → 3. Edit extracted text → 4. Inject to editor.' },

    codeevolution: { tab:'codeevolution', icon:'🧬', name:'Code Evolution',
      desc:'Genetic algorithm code optimizer. Evolve code solutions using mutation and selection. Visualize fitness over generations.',
      how:'1. Set target behavior → 2. Define fitness function → 3. Click "Evolve" → 4. Watch code generations improve.' },

    devbiometrics: { tab:'devbiometrics', icon:'💓', name:'Dev Biometrics',
      desc:'Developer productivity metrics visualizer. Track typing speed, error rate, focus sessions, generate productivity reports.',
      how:'1. Start a coding session → 2. Code normally → 3. See real-time biometrics → 4. Export productivity report.' },

    // ── 🎨 DESIGN additions ──────────────────────────────────────────────────
    themebreeder: { tab:'themebreeder', icon:'🧬', name:'Theme Breeder',
      desc:'Breed two design themes together using genetic algorithms. Mix colors, typography, and spacing systems to create new design systems.',
      how:'1. Select Theme A and Theme B → 2. Click "Breed" → 3. Get hybrid design tokens → 4. Export CSS variables.' },

    uidreamer: { tab:'uidreamer', icon:'💭', name:'UI Dreamer',
      desc:'AI-powered UI concept generator. Describe a UI dream in words → generates wireframe + color palette + component suggestions.',
      how:'1. Type UI description (e.g. "A dark futuristic dashboard") → 2. Click "Dream" → 3. See wireframe + palette → 4. Inject to editor.' },

    // ── 📱 MOBILE additions ──────────────────────────────────────────────────
    appstoremockup: { tab:'appstoremockup', icon:'📱', name:'App Store Mockup',
      desc:'Create professional App Store / Play Store screenshots. Add your app screenshots, device frame, background gradient.',
      how:'1. Upload screenshot → 2. Choose device frame (iPhone/Android) → 3. Add title/subtitle → 4. Download PNG.' },

    // ── 🌍 WEB3 additions ────────────────────────────────────────────────────
    web3studio: { tab:'web3studio', icon:'🌐', name:'Web3 Studio',
      desc:'Generate Solidity smart contracts, Web3.js/ethers.js boilerplate, NFT metadata, and DeFi protocol interfaces.',
      how:'1. Choose contract type (Token/NFT/DAO) → 2. Set parameters → 3. Generate Solidity → 4. Copy or inject to editor.' }
  }
};

// ── Extended Categories (includes all new modules) ──────────────────────────
window.GK.categories['premiumstudios'] = {
  label: '💫 Premium Studios',
  color: '#8b5cf6',
  modules: ['assetoptimizer','codeprotector','indexeddbmgr','hardwareapi','webrtcstreamer','aichatbot','svgmorphing','meshgradient','audiosynth','neuralnet','holographiccard']
};
window.GK.categories['webarchitect'] = {
  label: '🏗️ Web Architect',
  color: '#06b6d4',
  modules: ['webarchitect','webcontainers','nativecompiler']
};
window.GK.categories['nextgen'] = {
  label: '🔬 Next-Gen Labs',
  color: '#f59e0b',
  modules: ['agisentience','deepspace','hyper4d','spacenet','timewormhole','quantumdebugger','tesseract','codeevolution','devbiometrics']
};
window.GK.categories['design2'] = {
  label: '🎨 Design & Themes',
  color: '#ec4899',
  modules: ['themebreeder','uidreamer','appstoremockup','web3studio']
};

// ── Also add these to futuretech category ───────────────────────────────────
window.GK.categories['futuretech'].modules.push('web3studio','agisentience','quantumdebugger');

// ── ⚗️ GENIUS LAB — 8 Revolutionary Modules (Nowhere Else) ─────────────────
window.GK.en.musictosite = {
  tab: 'musictosite', icon: '🎵', name: 'Music → Website Generator',
  desc: 'Upload any MP3/WAV → Web Audio API analyzes BPM, energy, frequency spectrum → auto-generates a complete themed website matching the music mood (Energetic/Melancholic/Epic/Chill/Aggressive).',
  how: '1. Click "Upload Audio File" → choose MP3/WAV → 2. Watch real-time oscilloscope + frequency bars → 3. See detected BPM, energy %, mood → 4. Get full themed website → 5. Load to Editor.'
};
window.GK.en.emotionadaptive = {
  tab: 'emotionadaptive', icon: '🫀', name: 'Emotion-Adaptive UI Engine',
  desc: 'Webcam-powered UI adaptation engine. Analyzes motion/brightness variance between frames to detect user state: CALM / FOCUSED / STRESSED / ENERGETIC / FATIGUED. UI auto-adapts colors, animations, density.',
  how: '1. Click "Enable Webcam" → grant permission → 2. See live energy meter → 3. State detected in real-time → 4. Preview shows adapted UI → 5. Export Adaptive CSS variables.'
};
window.GK.en.appdnasplicer = {
  tab: 'appdnasplicer', icon: '🧬', name: 'App DNA Splicer',
  desc: 'Paste CSS/HTML from two different apps → extract their "design DNA" (colors, fonts, spacing, border-radius, animation speed) → splice them together → generate a hybrid design system.',
  how: '1. Paste App A and App B CSS/HTML → 2. Click "Extract DNA" → see gene cards → 3. Adjust mix ratio slider → 4. Click "Splice!" → 5. Generate hybrid CSS :root variables → Load to Editor.'
};
window.GK.en.uxpredictor = {
  tab: 'uxpredictor', icon: '🔮', name: 'Predictive UX Heatmap Studio',
  desc: 'Draw a wireframe by placing elements (Image, Button/CTA, Text, Nav, Form, Card) on a canvas → AI applies UX research rules (F-Pattern, Z-Pattern, Rule of Thirds) → generates attention heatmap without real users.',
  how: '1. Select element type → 2. Click/drag to place on canvas → 3. Click "Predict Attention" → 4. See color heatmap + ranked attention list → 5. Read UX insights → Export HTML report.'
};
window.GK.en.physicscss = {
  tab: 'physicscss', icon: '🌊', name: 'Physics → CSS Exporter',
  desc: 'Real physics simulation (gravity, bounce, spring, pendulum) running in canvas at 60fps → Record 3 seconds of motion → Convert physics trajectory to CSS @keyframes animation ready to paste.',
  how: '1. Add physics objects (Ball/Pendulum/Spring) → 2. Adjust gravity/bounce/friction → 3. Click "Record 3s" → 4. Click "Convert to CSS" → 5. Preview CSS animation → Load to Editor.'
};
window.GK.en.codetutorialgame = {
  tab: 'codetutorialgame', icon: '🕹️', name: 'Code Tutorial Game Engine',
  desc: 'Paste any code snippet → system auto-generates an interactive fill-in-the-blank game. Drag word chips into blanks. Real-time scoring, streak multiplier, timer, star rating. Export as playable standalone HTML game.',
  how: '1. Paste code or choose built-in example → 2. Click "Generate Game" → 3. Drag correct word chips into blanks → 4. Green=correct, Red shake=wrong → 5. Earn stars → Export Game HTML.'
};
window.GK.en.geoadaptive = {
  tab: 'geoadaptive', icon: '🌍', name: 'Geo-Adaptive Component Studio',
  desc: 'Select a UI component (Button/Hero/Nav/Card/Pricing/CTA) and a world region → generates culturally-adapted variants: US bold CTAs, Japanese minimal, Brazilian vibrant, Middle East RTL, GDPR Europe, India value-focused.',
  how: '1. Choose component type → 2. Click a world region → 3. See side-by-side cultural variants → 4. Compare copy, colors, layout → 5. Select preferred → Load to Editor or Export All Variants.'
};
window.GK.en.dreamui = {
  tab: 'dreamui', icon: '🌙', name: 'Dream UI Interpreter',
  desc: 'Type a free-form description of a feeling, vision, or dream → NLP analysis detects: environment, time of day, emotion, temperature, light quality, motion → generates a complete themed UI design system + preview.',
  how: '1. Type your dream/vision (e.g. "submarine at 3am in deep ocean") → 2. See interpretation panel → 3. Adjust detected dimensions with sliders → 4. Live preview updates → 5. Generate Full Page → Load to Editor.'
};

window.GK.categories['geniuslab'] = {
  label: '⚗️ GENIUS LAB',
  color: '#f97316',
  modules: ['musictosite','emotionadaptive','appdnasplicer','uxpredictor','physicscss','codetutorialgame','geoadaptive','dreamui']
};


