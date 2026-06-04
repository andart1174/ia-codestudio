/**
 * HTML Formatter — shared utility
 * window.formatHTML(str) → pretty-printed HTML
 */
(function(){
'use strict';

var VOID=['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'];

window.formatHTML = function(html){
  if(!html) return html;

  // Normalize: add newlines around tags
  var normalized = html
    .replace(/\r?\n/g, '')             // remove existing newlines
    .replace(/>\s+</g, '><')           // collapse whitespace between tags
    .replace(/<style([^>]*)>([\s\S]*?)<\/style>/gi, function(m,a,b){
      return '<style'+a+'>'+b.replace(/;/g,';\n  ').replace(/{/g,'{\n  ').replace(/}/g,'\n}')+'\n</style>';
    })
    .replace(/<script([^>]*)>([\s\S]*?)<\/script>/gi, function(m,a,b){
      return '<script'+a+'>'+b+'</script>';
    });

  // Split on tags
  var tokens = normalized.split(/(<[^>]+>)/);
  var indent = 0;
  var TAB = '  ';
  var lines = [];

  tokens.forEach(function(token){
    token = token.trim();
    if(!token) return;

    if(token.startsWith('</')){
      // Closing tag — decrease indent first
      indent = Math.max(0, indent - 1);
      lines.push(TAB.repeat(indent) + token);
    } else if(token.startsWith('<!--')){
      lines.push(TAB.repeat(indent) + token);
    } else if(token.startsWith('<!')){
      lines.push(token);
    } else if(token.startsWith('<')){
      // Opening tag
      var tagName = (token.match(/^<([a-zA-Z][^\s\/>]*)/) || [])[1] || '';
      var isSelfClosing = token.endsWith('/>') || VOID.indexOf(tagName.toLowerCase()) > -1;
      lines.push(TAB.repeat(indent) + token);
      if(!isSelfClosing && tagName){
        indent++;
      }
    } else {
      // Text node
      if(token.length > 0){
        lines.push(TAB.repeat(indent) + token);
      }
    }
  });

  return lines.join('\n');
};

// Also expose a CSS formatter
window.formatCSS = function(css){
  if(!css) return css;
  return css
    .replace(/\s*\{\s*/g,' {\n  ')
    .replace(/;\s*/g,';\n  ')
    .replace(/\s*\}\s*/g,'\n}\n')
    .replace(/  (\})/g,'$1')
    .trim();
};

})();
