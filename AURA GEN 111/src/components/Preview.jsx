import React, { useMemo, useEffect } from 'react';
import { injectTrackingAttributes } from '../utils/TransformationEngine';

const Preview = ({ files = [], blueprint, dependencies = [], onPreviewClick, onDropSnippet, onPreviewError, onConsoleLog }) => {
  const mainFile = files.find(f => f.name === 'App.jsx') || files[0] || { content: '' };
  const trackedCode = useMemo(() => injectTrackingAttributes(mainFile.content), [mainFile.content]);

  // Extract CSS files
  const cssContent = useMemo(() => {
    return files.filter(f => f.name.endsWith('.css')).map(f => f.content).join('\n');
  }, [files]);

  // Extract and combine other JSX/JS files (excluding main App.jsx which is handled specially)
  const extraJsContent = useMemo(() => {
    return files
      .filter(f => f.name !== 'App.jsx' && (f.name.endsWith('.jsx') || f.name.endsWith('.js')))
      .map(f => {
        // Simple name-based export simulation: remove 'export default' and 'export'
        return `/* File: ${f.name} */\n${f.content.replace(/export default\s+/g, 'const ' + f.name.replace(/\.[^/.]+$/, "") + ' = ').replace(/export\s+/g, '')}`;
      })
      .join('\n\n');
  }, [files]);

  const srcDoc = useMemo(() => {
    // Safety measures: escape </script> to prevent premature script closing
    const safeExtraJs = extraJsContent.replace(/<\/script>/g, '<\\/script>');
    const safeMainCode = trackedCode.replace(/<\/script>/g, '<\\/script>');

    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { margin: 0; background: #fff; min-height: 100vh; font-family: sans-serif; transition: all 0.3s ease; }
            #preview-root { height: 100%; }
            /* CSS_CONTENT_PLACEHOLDER */
            /* BLUEPRINT_STYLE_PLACEHOLDER */
            [data-loc]:hover { outline: 2px solid #6366f1 !important; cursor: pointer !important; }
          </style>
          <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
          <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
          <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
          /* DEPENDENCIES_PLACEHOLDER */
          <script>
            // Intercept Console Logs
            (function(){
              const oLog = console.log;
              const oErr = console.error;
              const oWarn = console.warn;
              const oInfo = console.info;
              function sendLog(type, args) {
                try {
                  const msgs = Array.from(args).map(a => typeof a === 'object' ? JSON.stringify(a) : String(a));
                  if (msgs.some(m => m.includes('Babel transformer') || m.includes('precompile your scripts'))) return;
                  window.parent.postMessage({ type: 'CONSOLE_LOG', level: type, data: msgs }, '*');
                } catch(e) {}
              }
              console.log = function() { sendLog('log', arguments); oLog.apply(console, arguments); };
              console.error = function() { sendLog('error', arguments); oErr.apply(console, arguments); };
              console.warn = function() { sendLog('warn', arguments); oWarn.apply(console, arguments); };
              console.info = function() { sendLog('info', arguments); oInfo.apply(console, arguments); };
            })();

            // Global error catcher
            window.onerror = function(msg, url, line, col, error) {
              window.parent.postMessage({ type: 'PREVIEW_ERROR', message: msg + (line ? ' (Line: ' + line + ')' : '') }, '*');
            };
          </script>
        </head>
        <body>
          <div id="preview-root"></div>
          <script type="text/babel">
            /* Extra Files */
            /* EXTRA_JS_PLACEHOLDER */

            /* Main App */
            /* MAIN_CODE_PLACEHOLDER */
            
            try {
              if (typeof App !== 'undefined') {
                const root = ReactDOM.createRoot(document.getElementById('preview-root'));
                root.render(<App />);
              }

              document.addEventListener('click', (e) => {
                const target = e.target.closest('[data-loc]');
                if (target) {
                  window.parent.postMessage({ type: 'PREVIEW_CLICK', line: parseInt(target.getAttribute('data-loc')) }, '*');
                }
              }, true);

              document.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'copy';
              });
              document.addEventListener('drop', (e) => {
                e.preventDefault();
                try {
                  const snippet = e.dataTransfer.getData('text/plain');
                  if (snippet) {
                    window.parent.postMessage({ type: 'DROP_COMPONENT', snippet }, '*');
                  }
                } catch(err) {}
              });
            } catch (e) {
              console.error("Preview error:", e);
              window.parent.postMessage({ type: 'PREVIEW_ERROR', message: e.message }, '*');
            }
          </script>
        </body>
      </html>
    `;

    // Process placeholders safely without using template literals for code segments
    let finalHtml = htmlTemplate;
    
    // Simple pieces
    finalHtml = finalHtml.replace('/* CSS_CONTENT_PLACEHOLDER */', cssContent);
    finalHtml = finalHtml.replace('/* BLUEPRINT_STYLE_PLACEHOLDER */', blueprint ? `
      * { background: #f8fafc !important; color: #475569 !important; border: 1px dashed #cbd5e1 !important; border-radius: 0 !important; box-shadow: none !important; padding: 10px !important; margin: 4px !important; display: block !important; width: auto !important; height: auto !important; min-height: 20px !important; position: static !important; transform: none !important; transition: none !important; }
      body { background: #f1f5f9 !important; padding: 20px !important; }
      img, svg { max-width: 40px !important; max-height: 40px !important; background: #e2e8f0 !important; }
    ` : '');
    
    const depScripts = dependencies.map(dep => `<script src="https://unpkg.com/${dep.name}@${dep.version}"></script>`).join('\n');
    finalHtml = finalHtml.replace('/* DEPENDENCIES_PLACEHOLDER */', depScripts);

    // Code blocks - use split/join to avoid $ interpretation in replace()
    finalHtml = finalHtml.split('/* EXTRA_JS_PLACEHOLDER */').join(safeExtraJs);
    finalHtml = finalHtml.split('/* MAIN_CODE_PLACEHOLDER */').join(safeMainCode);

    return finalHtml;
  }, [files, blueprint, extraJsContent, trackedCode, cssContent, dependencies]);


  useEffect(() => {
    const handleMessage = (e) => {
      if (e.data.type === 'PREVIEW_CLICK' && onPreviewClick) {
        onPreviewClick(e.data.line);
      }
      if (e.data.type === 'DROP_COMPONENT' && onDropSnippet) {
        onDropSnippet(e.data.snippet);
      }
      if (e.data.type === 'PREVIEW_ERROR' && onPreviewError) {
        onPreviewError(e.data.message);
      }
      if (e.data.type === 'CONSOLE_LOG' && onConsoleLog) {
        onConsoleLog({ level: e.data.level, args: e.data.data, id: Date.now() + Math.random() });
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onPreviewClick, onDropSnippet, onPreviewError, onConsoleLog]);

  return (
    <div className="preview-frame-wrapper">
      <iframe
        srcDoc={srcDoc}
        title="Live Preview"
        style={{ width: '100%', height: '100%', border: 'none' }}
        sandbox="allow-scripts"
      />
    </div>
  );
};

export default Preview;
