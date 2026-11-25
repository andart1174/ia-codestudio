// OmniConvert Pro 2.0 — Lightweight Line-Numbered & Syntax-Highlighted Code Editor
(function (global) {
  'use strict';

  const Omni = (global.Omni = global.Omni || {});

  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // Lightweight deterministic syntax highlighter (0 external deps, fast up to ~80KB)
  function highlightCode(code, lang) {
    if (!code) return '';
    if (code.length > 60000) return escapeHtml(code); // Keep large files ultra-snappy

    const src = escapeHtml(code);
    if (!lang || lang === 'plain') return src;

    if (lang === 'json') {
      return src.replace(
        /(&quot;(?:\\.|[^&]|&(?!quot;))*?&quot;)(\s*:)?|\b(true|false|null)\b|-?\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/g,
        (m, str, colon, kw) => {
          if (str) return colon ? `<span class="hl-key">${str}</span>${colon}` : `<span class="hl-str">${str}</span>`;
          if (kw) return `<span class="hl-kw">${kw}</span>`;
          return `<span class="hl-num">${m}</span>`;
        }
      );
    }

    if (lang === 'html' || lang === 'xml' || lang === 'svg') {
      return src.replace(
        /(&lt;!--[\s\S]*?--&gt;)|(&lt;\/?[a-zA-Z0-9:_-]+)([\s\S]*?)(\/?&gt;)/g,
        (m, comment, open, attrs, close) => {
          if (comment) return `<span class="hl-com">${comment}</span>`;
          const styledAttrs = attrs.replace(
            /([a-zA-Z0-9:_-]+)(=)(&quot;[^&]*?&quot;|&#39;[^&]*?&#39;)/g,
            '<span class="hl-attr">$1</span>$2<span class="hl-str">$3</span>'
          );
          return `<span class="hl-tag">${open}</span>${styledAttrs}<span class="hl-tag">${close}</span>`;
        }
      );
    }

    if (lang === 'css') {
      return src
        .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="hl-com">$1</span>')
        .replace(/([a-z-]+)(\s*:\s*)([^;{}\n]+)/gi, '<span class="hl-attr">$1</span>$2<span class="hl-str">$3</span>')
        .replace(/(#[0-9a-fA-F]{3,8})\b/g, '<span class="hl-num">$1</span>');
    }

    // JS / TS / SQL / YAML generic highlighter
    return src.replace(
      /(\/\*[\s\S]*?\*\/|\/\/[^\n]*|#[^\n]*)|(&quot;(?:\\.|[^&]|&(?!quot;))*?&quot;|&#39;(?:\\.|[^&]|&(?!#39;))*?&#39;|`[^`]*`)|\b(const|let|var|function|return|if|else|for|while|switch|case|break|async|await|import|export|from|default|class|new|try|catch|throw|typeof|true|false|null|undefined|interface|type|SELECT|FROM|WHERE|INSERT|INTO|VALUES|CREATE|TABLE|PRIMARY|KEY|NOT|NULL)\b|\b(\d+(?:\.\d+)?)\b/g,
      (m, com, str, kw, num) => {
        if (com) return `<span class="hl-com">${com}</span>`;
        if (str) return `<span class="hl-str">${str}</span>`;
        if (kw) return `<span class="hl-kw">${kw}</span>`;
        if (num) return `<span class="hl-num">${num}</span>`;
        return m;
      }
    );
  }

  const PAIRS = { '(': ')', '[': ']', '{': '}', '"': '"', "'": "'", '`': '`' };

  /**
   * Upgrades a <textarea> with line numbers, optional syntax highlight overlay,
   * Tab/Shift+Tab indentation, bracket auto-close, and Ctrl+Enter run callback.
   */
  Omni.enhanceCodeEditor = function (textarea, options = {}) {
    if (!textarea || textarea.dataset.omniEnhanced === '1') return null;
    textarea.dataset.omniEnhanced = '1';

    const lang = options.lang || textarea.dataset.lang || 'plain';
    const readonly = textarea.hasAttribute('readonly');

    const shell = document.createElement('div');
    shell.className = 'omni-editor-shell' + (options.compact ? ' compact' : '') + (textarea.classList.contains('hidden') ? ' hidden' : '');
    if (textarea.id) shell.dataset.forEditor = textarea.id;

    const gutter = document.createElement('div');
    gutter.className = 'omni-editor-gutter';
    gutter.setAttribute('aria-hidden', 'true');

    const stage = document.createElement('div');
    stage.className = 'omni-editor-stage';

    const highlightLayer = document.createElement('pre');
    highlightLayer.className = 'omni-editor-highlight';
    highlightLayer.setAttribute('aria-hidden', 'true');

    textarea.parentNode.insertBefore(shell, textarea);
    textarea.classList.remove('hidden');
    textarea.classList.add('omni-editor-input');
    textarea.setAttribute('spellcheck', 'false');
    textarea.setAttribute('autocomplete', 'off');
    textarea.setAttribute('autocorrect', 'off');
    textarea.setAttribute('autocapitalize', 'off');

    stage.appendChild(highlightLayer);
    stage.appendChild(textarea);
    shell.appendChild(gutter);
    shell.appendChild(stage);

    let currentLang = lang;

    function sync() {
      const val = textarea.value || '';
      const lineCount = val ? val.split('\n').length : 1;
      let nums = '';
      for (let i = 1; i <= lineCount; i++) nums += i + '\n';
      gutter.textContent = nums;

      highlightLayer.innerHTML = highlightCode(val, currentLang) + '\n';
      highlightLayer.scrollTop = textarea.scrollTop;
      highlightLayer.scrollLeft = textarea.scrollLeft;
      gutter.scrollTop = textarea.scrollTop;
    }

    textarea.addEventListener('input', sync);
    textarea.addEventListener('scroll', () => {
      highlightLayer.scrollTop = textarea.scrollTop;
      highlightLayer.scrollLeft = textarea.scrollLeft;
      gutter.scrollTop = textarea.scrollTop;
    });

    if (!readonly) {
      textarea.addEventListener('keydown', (e) => {
        // Ctrl+Enter / Cmd+Enter triggers run callback
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && typeof options.onRun === 'function') {
          e.preventDefault();
          options.onRun();
          return;
        }
        // Tab / Shift+Tab indentation
        if (e.key === 'Tab') {
          e.preventDefault();
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          const val = textarea.value;
          if (e.shiftKey) {
            const lineStart = val.lastIndexOf('\n', start - 1) + 1;
            if (val.slice(lineStart, lineStart + 2) === '  ') {
              textarea.value = val.slice(0, lineStart) + val.slice(lineStart + 2);
              textarea.selectionStart = Math.max(lineStart, start - 2);
              textarea.selectionEnd = Math.max(lineStart, end - 2);
              textarea.dispatchEvent(new Event('input'));
            }
          } else {
            textarea.value = val.slice(0, start) + '  ' + val.slice(end);
            textarea.selectionStart = textarea.selectionEnd = start + 2;
            textarea.dispatchEvent(new Event('input'));
          }
          return;
        }
        // Auto-close brackets/quotes when nothing selected
        if (PAIRS[e.key] && textarea.selectionStart === textarea.selectionEnd && !e.ctrlKey && !e.metaKey && !e.altKey) {
          const pos = textarea.selectionStart;
          const nextChar = textarea.value[pos] || '';
          if (nextChar === '' || /\s|[)\]}.,;:]/.test(nextChar)) {
            e.preventDefault();
            const close = PAIRS[e.key];
            textarea.value = textarea.value.slice(0, pos) + e.key + close + textarea.value.slice(pos);
            textarea.selectionStart = textarea.selectionEnd = pos + 1;
            textarea.dispatchEvent(new Event('input'));
          }
        }
      });
    }

    // Intercept programmatic .value updates via helper
    const api = {
      shell,
      sync,
      setLang(newLang) {
        currentLang = newLang;
        sync();
      },
      setValue(val) {
        textarea.value = val;
        sync();
      },
      setVisible(visible) {
        shell.classList.toggle('hidden', !visible);
      },
    };
    textarea._omniEditor = api;
    sync();
    return api;
  };

  Omni.highlightCode = highlightCode;
})(typeof window !== 'undefined' ? window : globalThis);
