const injectTrackingAttributes = (code) => {
    return code.split('\n').map((line, i) => {
        return line.replace(/<([a-zA-Z][a-zA-Z0-9_.]*)\b(?![^>]*data-loc)/g, (match, tag) => {
            if (tag === 'Fragment' || tag === 'React.Fragment') return match;
            return `<${tag} data-loc="${i + 1}"`;
        });
    }).join('\n');
};

const mainCode = 'const App = () => {\n  return (\n    <div style={{ padding: "40px", textAlign: "center", fontFamily: "sans-serif", background: "#ffffff", minHeight: "100vh" }}>\n      <h1 style={{ color: "#6366f1" }}>Hello AuraGen!</h1>\n      <p style={{ color: "#1e293b" }}>Start building your professional app here.</p>\n    </div>\n  );\n};';

const trackedCode = injectTrackingAttributes(mainCode);
const cssContent = '';
const blueprint = false;
const extraJsContent = '';
const dependencies = [];

const srcDoc = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { margin: 0; background: #fff; min-height: 100vh; font-family: sans-serif; transition: all 0.3s ease; }
            #preview-root { height: 100%; }
            ${cssContent}
            ${blueprint ? `...` : ''}
          </style>
          <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
          <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
          <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
          ${dependencies.map(dep => `<script src="https://unpkg.com/${dep.name}@${dep.version}"></script>`).join('\n          ')}
          <script>
            // Intercept Console Logs
            // ... (shrunk for test)
          </script>
        </head>
        <body>
          <div id="preview-root"></div>
          <script type="text/babel">
            /* Extra Files */
            ${extraJsContent}

            /* Main App */
            ${trackedCode}
            
            try {
              if (typeof App !== 'undefined') {
                const root = ReactDOM.createRoot(document.getElementById('preview-root'));
                root.render(<App />);
              }
            } catch (e) { console.error(e); }
          </script>
        </body>
      </html>
    `;

console.log(srcDoc);
