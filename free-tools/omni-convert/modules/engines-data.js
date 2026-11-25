// OmniConvert Pro 2.0 — Data, Serialization, Code-Gen, Tokenizer Minifier/Obfuscator, cURL, Markdown & Myers Diff Engines
(function (global) {
  'use strict';

  const Omni = (global.Omni = global.Omni || {});
  const Data = (Omni.Data = {});

  // ===========================================================================
  // 1. XML Escaping, JSON -> XML, XML -> JSON, XML Formatter
  // ===========================================================================
  function escapeXml(str) {
    return String(str).replace(/[<>&'"]/g, (c) => ({
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      "'": '&apos;',
      '"': '&quot;',
    }[c]));
  }

  function sanitizeXmlTag(key) {
    let tag = String(key).replace(/[^a-zA-Z0-9_.-]/g, '_');
    if (!tag || /^[0-9.-]/.test(tag) || /^xml/i.test(tag)) {
      tag = '_' + tag;
    }
    return tag;
  }

  Data.escapeXml = escapeXml;

  Data.jsonToXml = function (obj, rootName = 'root', pretty = true) {
    function build(val, tag, depth) {
      const pad = pretty ? '  '.repeat(depth) : '';
      const nl = pretty ? '\n' : '';
      const safeTag = sanitizeXmlTag(tag);

      if (val === null || val === undefined) {
        return `${pad}<${safeTag}/>${nl}`;
      }
      if (typeof val !== 'object') {
        return `${pad}<${safeTag}>${escapeXml(val)}</${safeTag}>${nl}`;
      }
      if (Array.isArray(val)) {
        if (val.length === 0) return `${pad}<${safeTag}/>${nl}`;
        let inner = '';
        for (const item of val) {
          inner += build(item, 'item', depth + 1);
        }
        return `${pad}<${safeTag}>${nl}${inner}${pad}</${safeTag}>${nl}`;
      }
      const keys = Object.keys(val);
      if (keys.length === 0) return `${pad}<${safeTag}/>${nl}`;
      let inner = '';
      for (const k of keys) {
        const v = val[k];
        if (Array.isArray(v)) {
          if (v.length === 0) {
            inner += `${pretty ? '  '.repeat(depth + 1) : ''}<${sanitizeXmlTag(k)}/>${nl}`;
          } else {
            for (const item of v) {
              inner += build(item, k, depth + 1);
            }
          }
        } else {
          inner += build(v, k, depth + 1);
        }
      }
      return `${pad}<${safeTag}>${nl}${inner}${pad}</${safeTag}>${nl}`;
    }

    const header = '<?xml version="1.0" encoding="UTF-8"?>' + (pretty ? '\n' : '');
    return (header + build(obj, rootName, 0)).trim();
  };

  function convertPrimitive(str) {
    if (str === 'true') return true;
    if (str === 'false') return false;
    if (str === 'null') return null;
    if (/^-?(?:0|[1-9]\d*)(?:\.\d+)?$/.test(str)) return Number(str);
    return str;
  }

  Data.xmlNodeToJson = function (xmlNode, parsePrimitives = false) {
    if (xmlNode.nodeType === 3 || xmlNode.nodeType === 4) {
      return xmlNode.nodeValue;
    }
    const obj = {};
    let hasElements = false;
    let textParts = [];

    if (xmlNode.attributes && xmlNode.attributes.length > 0) {
      for (let i = 0; i < xmlNode.attributes.length; i++) {
        const attr = xmlNode.attributes.item(i);
        obj['@' + attr.nodeName] = parsePrimitives ? convertPrimitive(attr.nodeValue) : attr.nodeValue;
      }
    }

    for (let i = 0; i < xmlNode.childNodes.length; i++) {
      const child = xmlNode.childNodes.item(i);
      if (child.nodeType === 1) {
        hasElements = true;
        const name = child.nodeName;
        const val = Data.xmlNodeToJson(child, parsePrimitives);
        if (obj[name] === undefined) {
          obj[name] = val;
        } else {
          if (!Array.isArray(obj[name])) obj[name] = [obj[name]];
          obj[name].push(val);
        }
      } else if (child.nodeType === 4) {
        // CDATA section preserved verbatim
        textParts.push(child.nodeValue);
      } else if (child.nodeType === 3) {
        const t = child.nodeValue.trim();
        if (t) textParts.push(t);
      }
    }

    const combinedText = textParts.join(' ');
    const hasAttrs = Object.keys(obj).length > 0;

    if (!hasElements && !hasAttrs) {
      if (combinedText === '') return null;
      return parsePrimitives ? convertPrimitive(combinedText) : combinedText;
    }
    if (combinedText) {
      obj['#text'] = parsePrimitives ? convertPrimitive(combinedText) : combinedText;
    }
    return obj;
  };

  Data.xmlStringToJSON = function (xmlStr, parsePrimitives = false) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlStr, 'application/xml');
    const err = xmlDoc.querySelector('parsererror');
    if (err) throw new Error(err.textContent.trim().slice(0, 180));
    const root = xmlDoc.documentElement;
    const out = {};
    out[root.nodeName] = Data.xmlNodeToJson(root, parsePrimitives);
    return JSON.stringify(out, null, 2);
  };

  Data.formatXml = function (xmlStr) {
    // Protect CDATA and comments during whitespace splitting
    const tokens = [];
    const masked = xmlStr
      .replace(/<!\[CDATA\[[\s\S]*?\]\]>/g, (m) => { tokens.push(m); return `__XML_TOK_${tokens.length - 1}__`; })
      .replace(/<!--[\s\S]*?-->/g, (m) => { tokens.push(m); return `__XML_TOK_${tokens.length - 1}__`; })
      .replace(/>\s+</g, '><')
      .trim();

    const lines = masked.replace(/(>)(<)(\/*)/g, '$1\n$2$3').split('\n');
    let pad = 0;
    const out = [];
    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line) continue;
      if (/^<\/[^>]+>$/.test(line)) {
        pad = Math.max(0, pad - 1);
        out.push('  '.repeat(pad) + line);
      } else if (/^<\?[\s\S]*\?>$/.test(line) || /^<!/.test(line) || /^<[^>]+\/>$/.test(line) || /^<([a-zA-Z0-9:_-]+)[^>]*>.*<\/\1>$/.test(line) || /^__XML_TOK_\d+__$/.test(line)) {
        out.push('  '.repeat(pad) + line);
      } else if (/^<[a-zA-Z0-9:_-][^>]*>$/.test(line)) {
        out.push('  '.repeat(pad) + line);
        pad += 1;
      } else {
        out.push('  '.repeat(pad) + line);
      }
    }
    return out.join('\n').replace(/__XML_TOK_(\d+)__/g, (_, i) => tokens[Number(i)]);
  };

  // ===========================================================================
  // 2. Full YAML Serializer & Parser (JSON <-> YAML round-trip accurate!)
  // ===========================================================================
  const YAML_RESERVED = /^(true|false|yes|no|on|off|null|~|nan|\.inf|-\.inf)$/i;
  const YAML_NUMBER = /^[+-]?(?:0x[0-9a-f]+|0o[0-7]+|(?:0|[1-9]\d*)(?:\.\d+)?(?:e[+-]?\d+)?|\.\d+)$/i;

  function formatYamlScalar(val) {
    if (val === null || val === undefined) return 'null';
    if (typeof val === 'boolean' || typeof val === 'number') return String(val);
    const s = String(val);
    const needsQuotes =
      s === '' ||
      /^\s|\s$/.test(s) ||
      YAML_RESERVED.test(s) ||
      YAML_NUMBER.test(s) ||
      /^[-?:,\[\]{}#&*!|>'"%@`]/.test(s) ||
      /:\s|:$|\s#|[\n\r\t\\"]/.test(s) ||
      /^0\d+$/.test(s);
    if (needsQuotes) {
      return '"' + s
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/\t/g, '\\t') + '"';
    }
    return s;
  }

  function formatYamlKey(key) {
    const s = String(key);
    if (/^[a-zA-Z_][a-zA-Z0-9_.-]*$/.test(s) && !YAML_RESERVED.test(s)) return s;
    return formatYamlScalar(s);
  }

  Data.jsonToYaml = function (obj, depth = 0) {
    const indent = '  '.repeat(depth);
    if (obj === null || typeof obj !== 'object') {
      return formatYamlScalar(obj) + (depth === 0 ? '\n' : '');
    }
    if (Array.isArray(obj)) {
      if (obj.length === 0) return '[]' + (depth === 0 ? '\n' : '');
      let out = '';
      for (const item of obj) {
        if (item !== null && typeof item === 'object') {
          if (Array.isArray(item) && item.length === 0) {
            out += `${indent}- []\n`;
          } else if (!Array.isArray(item) && Object.keys(item).length === 0) {
            out += `${indent}- {}\n`;
          } else if (Array.isArray(item)) {
            out += `${indent}-\n${Data.jsonToYaml(item, depth + 1)}`;
          } else {
            const sub = Data.jsonToYaml(item, depth + 1);
            out += `${indent}- ${sub.trimStart()}`;
          }
        } else {
          out += `${indent}- ${formatYamlScalar(item)}\n`;
        }
      }
      return out;
    }
    const keys = Object.keys(obj);
    if (keys.length === 0) return '{}' + (depth === 0 ? '\n' : '');
    let out = '';
    for (const k of keys) {
      const v = obj[k];
      const fk = formatYamlKey(k);
      if (v !== null && typeof v === 'object') {
        if (Array.isArray(v) && v.length === 0) {
          out += `${indent}${fk}: []\n`;
        } else if (!Array.isArray(v) && Object.keys(v).length === 0) {
          out += `${indent}${fk}: {}\n`;
        } else {
          out += `${indent}${fk}:\n${Data.jsonToYaml(v, depth + 1)}`;
        }
      } else {
        out += `${indent}${fk}: ${formatYamlScalar(v)}\n`;
      }
    }
    return out;
  };

  // Strip inline YAML comments outside quotes
  function stripYamlComment(str) {
    let inSingle = false;
    let inDouble = false;
    for (let i = 0; i < str.length; i++) {
      const ch = str[i];
      if (ch === "'" && !inDouble) {
        if (inSingle && str[i + 1] === "'") { i++; continue; }
        inSingle = !inSingle;
      } else if (ch === '"' && !inSingle) {
        if (ch === '"' && str[i - 1] !== '\\') inDouble = !inDouble;
      } else if (ch === '#' && !inSingle && !inDouble && (i === 0 || /\s/.test(str[i - 1]))) {
        return str.slice(0, i).trimEnd();
      }
    }
    return str.trimEnd();
  }

  // Find key-value colon outside quotes and brackets
  function findYamlColon(str) {
    let inSingle = false;
    let inDouble = false;
    let depth = 0;
    for (let i = 0; i < str.length; i++) {
      const ch = str[i];
      if (ch === "'" && !inDouble) {
        if (inSingle && str[i + 1] === "'") { i++; continue; }
        inSingle = !inSingle;
      } else if (ch === '"' && !inSingle) {
        if (str[i - 1] !== '\\') inDouble = !inDouble;
      } else if (!inSingle && !inDouble) {
        if (ch === '[' || ch === '{') depth++;
        else if (ch === ']' || ch === '}') depth = Math.max(0, depth - 1);
        else if (ch === ':' && depth === 0 && (i + 1 === str.length || /\s/.test(str[i + 1]))) {
          return i;
        }
      }
    }
    return -1;
  }

  function splitFlowItems(str) {
    const items = [];
    let cur = '';
    let inSingle = false;
    let inDouble = false;
    let depth = 0;
    for (let i = 0; i < str.length; i++) {
      const ch = str[i];
      if (ch === "'" && !inDouble) { inSingle = !inSingle; cur += ch; }
      else if (ch === '"' && !inSingle) {
        if (str[i - 1] !== '\\') inDouble = !inDouble;
        cur += ch;
      } else if (!inSingle && !inDouble) {
        if (ch === '[' || ch === '{') { depth++; cur += ch; }
        else if (ch === ']' || ch === '}') { depth--; cur += ch; }
        else if (ch === ',' && depth === 0) { items.push(cur.trim()); cur = ''; }
        else cur += ch;
      } else {
        cur += ch;
      }
    }
    if (cur.trim() !== '') items.push(cur.trim());
    return items;
  }

  function parseYamlValue(raw) {
    const val = stripYamlComment(raw).trim();
    if (val === '' || val === 'null' || val === '~') return null;
    if (val === 'true') return true;
    if (val === 'false') return false;
    if (val === '[]') return [];
    if (val === '{}') return {};

    // Double-quoted string with escapes
    if (val.startsWith('"') && val.endsWith('"') && val.length >= 2) {
      try { return JSON.parse(val); } catch (_) { return val.slice(1, -1); }
    }
    // Single-quoted string
    if (val.startsWith("'") && val.endsWith("'") && val.length >= 2) {
      return val.slice(1, -1).replace(/''/g, "'");
    }
    // Inline flow array
    if (val.startsWith('[') && val.endsWith(']')) {
      const inner = val.slice(1, -1).trim();
      if (!inner) return [];
      return splitFlowItems(inner).map(parseYamlValue);
    }
    // Inline flow object
    if (val.startsWith('{') && val.endsWith('}')) {
      const inner = val.slice(1, -1).trim();
      if (!inner) return {};
      const obj = {};
      for (const pair of splitFlowItems(inner)) {
        const ci = findYamlColon(pair);
        if (ci === -1) throw new Error(`Invalid inline mapping entry: ${pair}`);
        const k = parseYamlKey(pair.slice(0, ci));
        obj[k] = parseYamlValue(pair.slice(ci + 1));
      }
      return obj;
    }
    if (/^[+-]?(?:0|[1-9]\d*)(?:\.\d+)?(?:e[+-]?\d+)?$/i.test(val)) {
      return Number(val);
    }
    if (/^0x[0-9a-f]+$/i.test(val)) return parseInt(val, 16);
    return val;
  }

  function parseYamlKey(raw) {
    const k = raw.trim();
    if ((k.startsWith('"') && k.endsWith('"')) || (k.startsWith("'") && k.endsWith("'"))) {
      return String(parseYamlValue(k));
    }
    return k;
  }

  Data.parseYAML = function (yamlStr) {
    const rawLines = yamlStr.replace(/\r\n?/g, '\n').split('\n');
    const lines = [];
    for (let i = 0; i < rawLines.length; i++) {
      const line = rawLines[i];
      if (line.trim() === '' || line.trim().startsWith('#') || line.trim() === '---' || line.trim() === '...') {
        continue;
      }
      const indent = line.search(/\S/);
      lines.push({ indent, raw: line, text: line.trim(), lineNo: i + 1 });
    }
    if (lines.length === 0) throw new Error('Empty YAML document');

    // Handle top-level flow JSON/YAML directly
    if (lines.length === 1 && (lines[0].text.startsWith('[') || lines[0].text.startsWith('{'))) {
      return parseYamlValue(lines[0].text);
    }

    let pos = 0;

    function parseBlockScalar(parentIndent, indicator) {
      const isFolded = indicator.startsWith('>');
      const stripChomp = indicator.endsWith('-');
      const startLineNo = lines[pos - 1].lineNo;
      const blockLines = [];
      let blockIndent = null;

      // Read directly from rawLines so blank lines inside multiline block are preserved
      let rIdx = startLineNo; // 0-based index of next line after indicator
      while (rIdx < rawLines.length) {
        const rLine = rawLines[rIdx];
        if (rLine.trim() === '') {
          blockLines.push('');
          rIdx++;
          continue;
        }
        const ind = rLine.search(/\S/);
        if (ind <= parentIndent) break;
        if (blockIndent === null) blockIndent = ind;
        blockLines.push(rLine.slice(Math.min(blockIndent, ind)));
        rIdx++;
      }
      // Advance `pos` past consumed lines
      while (pos < lines.length && lines[pos].lineNo <= rIdx) pos++;
      while (blockLines.length && blockLines[blockLines.length - 1] === '') blockLines.pop();
      const joined = isFolded
        ? blockLines.join('\n').replace(/([^\n])\n([^\n])/g, '$1 $2')
        : blockLines.join('\n');
      return stripChomp ? joined : joined + (joined ? '\n' : '');
    }

    function parseNode(expectedIndent) {
      if (pos >= lines.length) return null;
      const cur = lines[pos];
      if (cur.text === '-' || cur.text.startsWith('- ')) {
        return parseSequence(cur.indent);
      }
      return parseMapping(cur.indent);
    }

    function parseSequence(seqIndent) {
      const arr = [];
      while (pos < lines.length && lines[pos].indent === seqIndent && (lines[pos].text === '-' || lines[pos].text.startsWith('- '))) {
        const itemLine = lines[pos++];
        const rest = itemLine.text === '-' ? '' : itemLine.text.slice(2).trim();

        if (!rest) {
          if (pos < lines.length && lines[pos].indent > seqIndent) {
            arr.push(parseNode(lines[pos].indent));
          } else {
            arr.push(null);
          }
          continue;
        }

        if (/^[|>][+-]?$/.test(rest)) {
          arr.push(parseBlockScalar(seqIndent, rest));
          continue;
        }

        const colonIdx = findYamlColon(rest);
        if (colonIdx !== -1) {
          // Inline object inside sequence item: `- key: val`
          const obj = {};
          const k = parseYamlKey(rest.slice(0, colonIdx));
          const vRaw = stripYamlComment(rest.slice(colonIdx + 1)).trim();
          const itemIndent = seqIndent + 2;

          if (/^[|>][+-]?$/.test(vRaw)) {
            obj[k] = parseBlockScalar(seqIndent, vRaw);
          } else if (vRaw === '') {
            if (pos < lines.length && lines[pos].indent > itemIndent) {
              obj[k] = parseNode(lines[pos].indent);
            } else if (pos < lines.length && lines[pos].indent === itemIndent && (lines[pos].text === '-' || lines[pos].text.startsWith('- '))) {
              obj[k] = parseSequence(itemIndent);
            } else {
              obj[k] = null;
            }
          } else {
            obj[k] = parseYamlValue(vRaw);
          }

          // Parse sibling properties of this sequence object at indent >= itemIndent
          while (pos < lines.length && lines[pos].indent >= itemIndent && !(lines[pos].indent === seqIndent && lines[pos].text.startsWith('-'))) {
            const subLine = lines[pos++];
            const subColon = findYamlColon(subLine.text);
            if (subColon === -1) throw new Error(`Invalid YAML syntax at line ${subLine.lineNo}: "${subLine.text}"`);
            const sk = parseYamlKey(subLine.text.slice(0, subColon));
            const svRaw = stripYamlComment(subLine.text.slice(subColon + 1)).trim();
            if (/^[|>][+-]?$/.test(svRaw)) {
              obj[sk] = parseBlockScalar(subLine.indent, svRaw);
            } else if (svRaw === '') {
              if (pos < lines.length && lines[pos].indent > subLine.indent) {
                obj[sk] = parseNode(lines[pos].indent);
              } else if (pos < lines.length && lines[pos].indent === subLine.indent && (lines[pos].text === '-' || lines[pos].text.startsWith('- '))) {
                obj[sk] = parseSequence(subLine.indent);
              } else {
                obj[sk] = null;
              }
            } else {
              obj[sk] = parseYamlValue(svRaw);
            }
          }
          arr.push(obj);
        } else {
          arr.push(parseYamlValue(rest));
        }
      }
      return arr;
    }

    function parseMapping(mapIndent) {
      const obj = {};
      while (pos < lines.length && lines[pos].indent === mapIndent) {
        const line = lines[pos];
        if (line.text === '-' || line.text.startsWith('- ')) break;
        const colonIdx = findYamlColon(line.text);
        if (colonIdx === -1) {
          throw new Error(`Invalid YAML mapping at line ${line.lineNo}: expected "key: value", got "${line.text}"`);
        }
        pos++;
        const k = parseYamlKey(line.text.slice(0, colonIdx));
        const vRaw = stripYamlComment(line.text.slice(colonIdx + 1)).trim();

        if (/^[|>][+-]?$/.test(vRaw)) {
          obj[k] = parseBlockScalar(mapIndent, vRaw);
        } else if (vRaw === '') {
          if (pos < lines.length && lines[pos].indent > mapIndent) {
            obj[k] = parseNode(lines[pos].indent);
          } else if (pos < lines.length && lines[pos].indent === mapIndent && (lines[pos].text === '-' || lines[pos].text.startsWith('- '))) {
            obj[k] = parseSequence(mapIndent);
          } else {
            obj[k] = null;
          }
        } else {
          obj[k] = parseYamlValue(vRaw);
        }
      }
      return obj;
    }

    const result = parseNode(lines[0].indent);
    if (pos < lines.length) {
      throw new Error(`Unexpected YAML indentation at line ${lines[pos].lineNo}: "${lines[pos].text}"`);
    }
    return result;
  };

  // ===========================================================================
  // 3. CSV <-> JSON <-> Markdown Table <-> SQL Insert
  // ===========================================================================
  Data.csvToJson = function (csvText, delimiter = ',') {
    const rows = [];
    let row = [];
    let field = '';
    let inQuotes = false;
    const text = csvText.replace(/\r\n?/g, '\n').trim();
    if (!text) return [];

    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (inQuotes) {
        if (ch === '"' && text[i + 1] === '"') { field += '"'; i++; }
        else if (ch === '"') inQuotes = false;
        else field += ch;
      } else {
        if (ch === '"') inQuotes = true;
        else if (ch === delimiter) { row.push(field); field = ''; }
        else if (ch === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
        else field += ch;
      }
    }
    row.push(field);
    rows.push(row);

    if (rows.length < 2) return rows;
    const headers = rows[0].map((h, idx) => h.trim() || `col_${idx + 1}`);
    return rows.slice(1).filter((r) => r.some((c) => c.trim() !== '')).map((r) => {
      const obj = {};
      headers.forEach((h, idx) => {
        const v = (r[idx] ?? '').trim();
        obj[h] = convertPrimitive(v);
      });
      return obj;
    });
  };

  Data.jsonToCsv = function (data, delimiter = ',') {
    const arr = Array.isArray(data) ? data : [data];
    if (arr.length === 0) return '';
    const cols = [...new Set(arr.flatMap((item) => (item && typeof item === 'object' ? Object.keys(item) : ['value'])))];
    const esc = (v) => {
      const s = v === null || v === undefined ? '' : (typeof v === 'object' ? JSON.stringify(v) : String(v));
      return (s.includes(delimiter) || s.includes('"') || s.includes('\n')) ? '"' + s.replace(/"/g, '""') + '"' : s;
    };
    const lines = [cols.map(esc).join(delimiter)];
    for (const item of arr) {
      if (item && typeof item === 'object') {
        lines.push(cols.map((c) => esc(item[c])).join(delimiter));
      } else {
        lines.push(esc(item));
      }
    }
    return lines.join('\n');
  };

  Data.jsonToMarkdownTable = function (data) {
    const arr = Array.isArray(data) ? data : [data];
    if (arr.length === 0) return '';
    const cols = [...new Set(arr.flatMap((item) => (item && typeof item === 'object' ? Object.keys(item) : ['value'])))];
    const esc = (v) => (v === null || v === undefined ? '' : (typeof v === 'object' ? JSON.stringify(v) : String(v))).replace(/\|/g, '\\|').replace(/\n/g, ' ');
    const header = '| ' + cols.join(' | ') + ' |';
    const sep = '| ' + cols.map(() => '---').join(' | ') + ' |';
    const rows = arr.map((item) => '| ' + cols.map((c) => esc(item && typeof item === 'object' ? item[c] : item)).join(' | ') + ' |');
    return [header, sep, ...rows].join('\n');
  };

  Data.jsonToSqlInsert = function (data, tableName = 'records') {
    const arr = Array.isArray(data) ? data : [data];
    if (arr.length === 0) return '';
    const safeTable = tableName.replace(/[^a-zA-Z0-9_]/g, '_') || 'records';
    const cols = [...new Set(arr.flatMap((item) => (item && typeof item === 'object' ? Object.keys(item) : ['value'])))];
    const sqlVal = (v) => {
      if (v === null || v === undefined) return 'NULL';
      if (typeof v === 'number') return String(v);
      if (typeof v === 'boolean') return v ? 'TRUE' : 'FALSE';
      const s = typeof v === 'object' ? JSON.stringify(v) : String(v);
      return "'" + s.replace(/'/g, "''") + "'";
    };
    return arr.map((row) => {
      const vals = cols.map((c) => sqlVal(row && typeof row === 'object' ? row[c] : row)).join(', ');
      return `INSERT INTO ${safeTable} (${cols.join(', ')}) VALUES (${vals});`;
    }).join('\n');
  };

  // ===========================================================================
  // 4. Instant Code & Schema Generator (JSON -> TS / Zod / JSON Schema / SQL / Pydantic / Go)
  // ===========================================================================
  function pascalCase(str) {
    return String(str)
      .replace(/[^a-zA-Z0-9]+/g, ' ')
      .trim()
      .split(/\s+/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join('') || 'Root';
  }

  function snakeCase(str) {
    return String(str)
      .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
      .replace(/[^a-zA-Z0-9]+/g, '_')
      .toLowerCase()
      .replace(/^_+|_+$/g, '') || 'field';
  }

  Data.jsonToCode = function (parsed, target = 'typescript', rootName = 'Root') {
    const root = pascalCase(rootName);

    if (target === 'typescript') {
      const interfaces = [];
      const seen = new Set();
      function inferTs(val, nameHint) {
        if (val === null) return 'null';
        if (Array.isArray(val)) {
          if (val.length === 0) return 'unknown[]';
          const types = [...new Set(val.map((v) => inferTs(v, nameHint.replace(/s$/i, '') || 'Item')))];
          return types.length === 1 ? `${types[0]}[]` : `(${types.join(' | ')})[]`;
        }
        if (typeof val === 'object') {
          const ifaceName = pascalCase(nameHint);
          const uniqueName = seen.has(ifaceName) ? ifaceName + (seen.size + 1) : ifaceName;
          seen.add(uniqueName);
          const lines = Object.entries(val).map(([k, v]) => {
            const safeK = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? k : JSON.stringify(k);
            return `  ${safeK}${v === null ? '?' : ''}: ${inferTs(v, k)};`;
          });
          interfaces.push(`export interface ${uniqueName} {\n${lines.join('\n')}\n}`);
          return uniqueName;
        }
        return typeof val;
      }
      const rootType = inferTs(parsed, root);
      if (!interfaces.length) return `export type ${root} = ${rootType};`;
      if (Array.isArray(parsed)) return interfaces.join('\n\n') + `\n\nexport type ${root}List = ${rootType};`;
      return interfaces.reverse().join('\n\n');
    }

    if (target === 'zod') {
      function inferZod(val, depth = 0) {
        const pad = '  '.repeat(depth);
        if (val === null) return 'z.null()';
        if (typeof val === 'string') {
          if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return 'z.string().email()';
          if (/^https?:\/\//.test(val)) return 'z.string().url()';
          if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(val)) return 'z.string().uuid()';
          return 'z.string()';
        }
        if (typeof val === 'number') return Number.isInteger(val) ? 'z.number().int()' : 'z.number()';
        if (typeof val === 'boolean') return 'z.boolean()';
        if (Array.isArray(val)) {
          if (val.length === 0) return 'z.array(z.unknown())';
          return `z.array(${inferZod(val[0], depth)})`;
        }
        const entries = Object.entries(val).map(([k, v]) => {
          const safeK = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? k : JSON.stringify(k);
          return `${pad}  ${safeK}: ${inferZod(v, depth + 1)},`;
        });
        return `z.object({\n${entries.join('\n')}\n${pad}})`;
      }
      return `import { z } from 'zod';\n\nexport const ${root}Schema = ${inferZod(parsed, 0)};\n\nexport type ${root} = z.infer<typeof ${root}Schema>;`;
    }

    if (target === 'jsonschema') {
      function inferSchema(val) {
        if (val === null) return { type: 'null' };
        if (Array.isArray(val)) {
          return { type: 'array', items: val.length ? inferSchema(val[0]) : {} };
        }
        if (typeof val === 'object') {
          const properties = {};
          const required = [];
          for (const [k, v] of Object.entries(val)) {
            properties[k] = inferSchema(v);
            if (v !== null && v !== undefined) required.push(k);
          }
          return { type: 'object', properties, required, additionalProperties: false };
        }
        if (typeof val === 'number') return { type: Number.isInteger(val) ? 'integer' : 'number' };
        return { type: typeof val };
      }
      return JSON.stringify({
        $schema: 'https://json-schema.org/draft/2020-12/schema',
        title: root,
        ...inferSchema(parsed),
      }, null, 2);
    }

    if (target === 'sql') {
      const sample = Array.isArray(parsed) ? (parsed[0] || {}) : parsed;
      const tbl = snakeCase(root);
      if (!sample || typeof sample !== 'object') {
        return `CREATE TABLE ${tbl} (\n  id SERIAL PRIMARY KEY,\n  value TEXT\n);`;
      }
      const cols = Object.entries(sample).map(([k, v]) => {
        const col = snakeCase(k);
        let sqlType = 'TEXT';
        if (col === 'id' && Number.isInteger(v)) return `  id BIGSERIAL PRIMARY KEY`;
        if (typeof v === 'boolean') sqlType = 'BOOLEAN';
        else if (typeof v === 'number') sqlType = Number.isInteger(v) ? 'INTEGER' : 'DOUBLE PRECISION';
        else if (v !== null && typeof v === 'object') sqlType = 'JSONB';
        else if (typeof v === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(v)) sqlType = 'TIMESTAMPTZ';
        return `  ${col} ${sqlType}${v !== null ? ' NOT NULL' : ''}`;
      });
      const createStmt = `CREATE TABLE ${tbl} (\n${cols.join(',\n')}\n);`;
      const inserts = Array.isArray(parsed) ? '\n\n' + Data.jsonToSqlInsert(parsed.slice(0, 10), tbl) : '';
      return createStmt + inserts;
    }

    if (target === 'pydantic') {
      const models = [];
      function inferPy(val, nameHint) {
        if (val === null) return 'Optional[Any] = None';
        if (typeof val === 'string') return 'str';
        if (typeof val === 'boolean') return 'bool';
        if (typeof val === 'number') return Number.isInteger(val) ? 'int' : 'float';
        if (Array.isArray(val)) return val.length ? `List[${inferPy(val[0], nameHint.replace(/s$/i, '') || 'Item')}]` : 'List[Any]';
        const clsName = pascalCase(nameHint);
        const fields = Object.entries(val).map(([k, v]) => `    ${snakeCase(k)}: ${inferPy(v, k)}`);
        models.push(`class ${clsName}(BaseModel):\n${fields.length ? fields.join('\n') : '    pass'}`);
        return clsName;
      }
      const sample = Array.isArray(parsed) ? (parsed[0] || {}) : parsed;
      inferPy(sample, root);
      return `from typing import Any, List, Optional\nfrom pydantic import BaseModel\n\n\n` + models.join('\n\n\n');
    }

    if (target === 'go') {
      const structs = [];
      function inferGo(val, nameHint) {
        if (val === null) return 'any';
        if (typeof val === 'string') return 'string';
        if (typeof val === 'boolean') return 'bool';
        if (typeof val === 'number') return Number.isInteger(val) ? 'int64' : 'float64';
        if (Array.isArray(val)) return val.length ? `[]${inferGo(val[0], nameHint.replace(/s$/i, '') || 'Item')}` : '[]any';
        const stName = pascalCase(nameHint);
        const fields = Object.entries(val).map(([k, v]) => `    ${pascalCase(k)} ${inferGo(v, k)} \`json:"${k}"\``);
        structs.push(`type ${stName} struct {\n${fields.join('\n')}\n}`);
        return stName;
      }
      const sample = Array.isArray(parsed) ? (parsed[0] || {}) : parsed;
      inferGo(sample, root);
      return `package model\n\n` + structs.join('\n\n');
    }

    throw new Error(`Unsupported target: ${target}`);
  };

  // ===========================================================================
  // 5. Real JS / CSS / HTML / SQL Tokenizer Minifier & Safe JS Obfuscator
  // ===========================================================================
  const REGEX_PRECEDING_KEYWORDS = new Set([
    'return', 'case', 'throw', 'else', 'do', 'in', 'of', 'typeof', 'void', 'delete', 'new', 'await', 'yield',
  ]);

  function tokenizeJS(code) {
    const tokens = [];
    let i = 0;
    const len = code.length;

    const lastSig = () => {
      for (let k = tokens.length - 1; k >= 0; k--) {
        if (tokens[k].type !== 'ws' && tokens[k].type !== 'nl' && tokens[k].type !== 'comment') return tokens[k];
      }
      return null;
    };

    while (i < len) {
      const ch = code[i];

      // Newlines
      if (ch === '\n' || ch === '\r') {
        if (ch === '\r' && code[i + 1] === '\n') i++;
        tokens.push({ type: 'nl', value: '\n' });
        i++;
        continue;
      }

      // Horizontal whitespace
      if (ch === ' ' || ch === '\t' || ch === '\f' || ch === '\v') {
        let j = i + 1;
        while (j < len && (code[j] === ' ' || code[j] === '\t')) j++;
        tokens.push({ type: 'ws', value: code.slice(i, j) });
        i = j;
        continue;
      }

      // Single-line comment
      if (ch === '/' && code[i + 1] === '/') {
        let j = i + 2;
        while (j < len && code[j] !== '\n' && code[j] !== '\r') j++;
        tokens.push({ type: 'comment', value: code.slice(i, j) });
        i = j;
        continue;
      }

      // Multi-line comment
      if (ch === '/' && code[i + 1] === '*') {
        let j = i + 2;
        while (j < len && !(code[j] === '*' && code[j + 1] === '/')) j++;
        j = Math.min(len, j + 2);
        tokens.push({ type: 'comment', value: code.slice(i, j) });
        i = j;
        continue;
      }

      // String literal (' or ")
      if (ch === '"' || ch === "'") {
        let j = i + 1;
        while (j < len && code[j] !== ch) {
          if (code[j] === '\\') j++;
          j++;
        }
        j = Math.min(len, j + 1);
        tokens.push({ type: 'string', value: code.slice(i, j) });
        i = j;
        continue;
      }

      // Template literal (`...`)
      if (ch === '`') {
        let j = i + 1;
        let braceDepth = 0;
        while (j < len) {
          if (code[j] === '\\') { j += 2; continue; }
          if (code[j] === '$' && code[j + 1] === '{') { braceDepth++; j += 2; continue; }
          if (code[j] === '}' && braceDepth > 0) { braceDepth--; j++; continue; }
          if (code[j] === '`' && braceDepth === 0) { j++; break; }
          j++;
        }
        tokens.push({ type: 'template', value: code.slice(i, j) });
        i = j;
        continue;
      }

      // Regex literal heuristic
      if (ch === '/') {
        const prev = lastSig();
        const canBeRegex = !prev ||
          (prev.type === 'punct' && !/^[)\]]$/.test(prev.value) && prev.value !== '++' && prev.value !== '--') ||
          (prev.type === 'ident' && REGEX_PRECEDING_KEYWORDS.has(prev.value));
        if (canBeRegex) {
          let j = i + 1;
          let inClass = false;
          let closed = false;
          while (j < len && code[j] !== '\n' && code[j] !== '\r') {
            if (code[j] === '\\') { j += 2; continue; }
            if (code[j] === '[') inClass = true;
            else if (code[j] === ']') inClass = false;
            else if (code[j] === '/' && !inClass) { closed = true; j++; break; }
            j++;
          }
          if (closed) {
            while (j < len && /[a-z]/i.test(code[j])) j++;
            tokens.push({ type: 'regex', value: code.slice(i, j) });
            i = j;
            continue;
          }
        }
      }

      // Number
      if (/[0-9]/.test(ch) || (ch === '.' && /[0-9]/.test(code[i + 1] || ''))) {
        let j = i + 1;
        while (j < len && /[0-9a-fA-FxXoObBn._eE]/.test(code[j])) {
          if ((code[j] === 'e' || code[j] === 'E') && (code[j + 1] === '+' || code[j + 1] === '-')) j++;
          j++;
        }
        tokens.push({ type: 'number', value: code.slice(i, j) });
        i = j;
        continue;
      }

      // Identifier
      if (/[a-zA-Z_$]/.test(ch)) {
        let j = i + 1;
        while (j < len && /[a-zA-Z0-9_$]/.test(code[j])) j++;
        tokens.push({ type: 'ident', value: code.slice(i, j) });
        i = j;
        continue;
      }

      // Multi-char punctuators
      const three = code.slice(i, i + 3);
      const two = code.slice(i, i + 2);
      if (['===', '!==', '>>>', '**=', '&&=', '||=', '??=', '...'].includes(three)) {
        tokens.push({ type: 'punct', value: three });
        i += 3;
      } else if (['==', '!=', '<=', '>=', '=>', '++', '--', '&&', '||', '??', '?.', '+=', '-=', '*=', '/=', '%=', '<<', '>>', '**'].includes(two)) {
        tokens.push({ type: 'punct', value: two });
        i += 2;
      } else {
        tokens.push({ type: 'punct', value: ch });
        i++;
      }
    }
    return tokens;
  }

  Data.minifyJS = function (js) {
    const tokens = tokenizeJS(js);
    const out = [];
    let prevSig = null;
    let sawNewline = false;

    const isWord = (t) => t && (t.type === 'ident' || t.type === 'number' || t.type === 'regex');

    for (const tok of tokens) {
      if (tok.type === 'comment' || tok.type === 'ws') continue;
      if (tok.type === 'nl') {
        sawNewline = true;
        continue;
      }
      if (prevSig) {
        const pVal = prevSig.value;
        const cVal = tok.value;
        const needNewlineForASI =
          sawNewline &&
          (
            // Restricted productions: return/throw/break/continue followed by value on next line
            ((pVal === 'return' || pVal === 'throw' || pVal === 'break' || pVal === 'continue') && cVal !== ';' && cVal !== '}') ||
            // Statement terminator omitted (e.g. `const a = 5\nconst b = 7`)
            ((isWord(prevSig) || prevSig.type === 'string' || prevSig.type === 'template' || pVal === ')' || pVal === ']' || pVal === '++' || pVal === '--') &&
             (isWord(tok) || tok.type === 'string' || tok.type === 'template' || cVal === '(' || cVal === '[' || cVal === '{' || cVal === '++' || cVal === '--'))
          );

        if (needNewlineForASI) {
          out.push('\n');
        } else if (
          (isWord(prevSig) && isWord(tok)) ||
          (pVal === '+' && (cVal === '+' || cVal === '++')) ||
          (pVal === '-' && (cVal === '-' || cVal === '--')) ||
          (pVal === '/' && cVal === '/') ||
          (prevSig.type === 'ident' && tok.type === 'regex')
        ) {
          out.push(' ');
        }
      }
      out.push(tok.value);
      prevSig = tok;
      sawNewline = false;
    }
    return out.join('').trim();
  };

  Data.minifyCSS = function (css) {
    // Preserve strings and calc(...) spaces while removing comments and redundant spaces
    const strings = [];
    let work = css
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g, (m) => {
        strings.push(m);
        return `__CSS_STR_${strings.length - 1}__`;
      });

    // Protect calc/min/max/clamp math operators
    const calcs = [];
    work = work.replace(/\b(calc|min|max|clamp)\(([^()]+)\)/gi, (m) => {
      calcs.push(m.replace(/\s+/g, ' ').replace(/\(\s+/g, '(').replace(/\s+\)/g, ')'));
      return `__CSS_CALC_${calcs.length - 1}__`;
    });

    work = work
      .replace(/\s+/g, ' ')
      .replace(/\s*([{}:;,>~])\s*/g, '$1')
      .replace(/;}/g, '}')
      .trim();

    work = work
      .replace(/__CSS_CALC_(\d+)__/g, (_, i) => calcs[Number(i)])
      .replace(/__CSS_STR_(\d+)__/g, (_, i) => strings[Number(i)]);
    return work;
  };

  Data.minifyHTML = function (html) {
    const preserved = [];
    let work = html
      .replace(/<(pre|code|textarea|script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, (m) => {
        preserved.push(m);
        return `__HTML_KEEP_${preserved.length - 1}__`;
      })
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/>\s+</g, '><')
      .replace(/\s{2,}/g, ' ')
      .trim();
    return work.replace(/__HTML_KEEP_(\d+)__/g, (_, i) => preserved[Number(i)]);
  };

  Data.minifySQL = function (sql) {
    const strings = [];
    return sql
      .replace(/'(?:''|[^'])*'/g, (m) => { strings.push(m); return `__SQL_S_${strings.length - 1}__`; })
      .replace(/--[^\n]*/g, '')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\s+/g, ' ')
      .replace(/\s*([(),;=<>])\s*/g, '$1')
      .trim()
      .replace(/__SQL_S_(\d+)__/g, (_, i) => strings[Number(i)]);
  };

  Data.detectMinifyLanguage = function (code) {
    const trimmed = code.trim();
    if (/^<!DOCTYPE|^<(?:html|div|section|main|header|body|svg|p|span|ul|table)\b/i.test(trimmed)) return 'html';
    if (/^\s*(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP|WITH)\b/i.test(trimmed)) return 'sql';
    // CSS detection: selector { prop: val; } without JS keywords
    if (!/\b(function|const|let|var|return|class|import|export|=>)\b/.test(trimmed) && /[.#a-zA-Z0-9_:*\[\]-]+\s*\{[^}]*:[^}]*\}/.test(trimmed)) {
      return 'css';
    }
    return 'js';
  };

  function unescapeJsStringToken(rawTok) {
    const quote = rawTok[0];
    const body = rawTok.slice(1, -1);
    if (quote === '"') {
      try { return JSON.parse(rawTok); } catch (_) {}
    }
    // Safely convert single-quoted literal to double-quoted JSON string
    const asDouble = '"' + body.replace(/\\(.)/g, (_, c) => {
      if (c === "'") return "'";
      if (c === '"') return '\\"';
      return '\\' + c;
    }).replace(/"/g, '\\"') + '"';
    try { return JSON.parse(asDouble); } catch (_) { return body; }
  }

  function encodeJsHexUnicode(str) {
    let out = '';
    for (let i = 0; i < str.length; i++) {
      const code = str.charCodeAt(i);
      if (code < 0x100) out += '\\x' + code.toString(16).padStart(2, '0');
      else out += '\\u' + code.toString(16).padStart(4, '0');
    }
    return out;
  }

  Data.obfuscateJS = function (code) {
    const tokens = tokenizeJS(code).filter((t) => t.type !== 'comment');
    const strings = [];
    const suffix = () => Math.random().toString(16).slice(2, 7);
    const arrayName = '_0xA' + suffix();
    const funcName = '_0xF' + suffix();

    const sigTokens = tokens.filter((t) => t.type !== 'ws' && t.type !== 'nl');

    // Collect local variable & function declaration names
    const reserved = new Set([
      'window', 'document', 'console', 'Math', 'JSON', 'Date', 'Array', 'Object', 'String', 'Number', 'Boolean',
      'Promise', 'Set', 'Map', 'RegExp', 'Error', 'Symbol', 'BigInt', 'URL', 'Blob', 'FileReader', 'crypto',
      'fetch', 'setTimeout', 'setInterval', 'clearTimeout', 'clearInterval', 'parseInt', 'parseFloat', 'isNaN',
      'undefined', 'NaN', 'Infinity', 'arguments', 'eval', 'globalThis', 'this', 'super', 'default', 'async', 'await',
    ]);

    const declaredVars = new Set();
    for (let idx = 0; idx < sigTokens.length - 1; idx++) {
      const t = sigTokens[idx];
      const next = sigTokens[idx + 1];
      if (t.type === 'ident' && (t.value === 'var' || t.value === 'let' || t.value === 'const' || t.value === 'function') && next.type === 'ident') {
        if (!reserved.has(next.value)) declaredVars.add(next.value);
      }
    }

    const renameMap = new Map();
    const usedNames = new Set([arrayName, funcName]);
    for (const v of declaredVars) {
      let alias;
      do { alias = '_0x' + suffix(); } while (usedNames.has(alias));
      usedNames.add(alias);
      renameMap.set(v, alias);
    }

    // Rebuild token stream safely (respects object keys, property accesses, import specifiers, and Unicode!)
    const prevSigOf = (idx) => {
      for (let k = idx - 1; k >= 0; k--) {
        if (tokens[k].type !== 'ws' && tokens[k].type !== 'nl') return tokens[k];
      }
      return null;
    };
    const nextSigOf = (idx) => {
      for (let k = idx + 1; k < tokens.length; k++) {
        if (tokens[k].type !== 'ws' && tokens[k].type !== 'nl') return tokens[k];
      }
      return null;
    };

    const transformed = tokens.map((tok, idx) => {
      const prev = prevSigOf(idx);
      const next = nextSigOf(idx);

      if (tok.type === 'string') {
        // Keep object literal property keys (`{ "foo": 1 }`), case/import/export paths untouched
        const isObjKey = next && next.type === 'punct' && next.value === ':' && prev && (prev.value === '{' || prev.value === ',');
        const isImportPath = prev && prev.type === 'ident' && (prev.value === 'from' || prev.value === 'import');
        const isUseStrict = tok.value === "'use strict'" || tok.value === '"use strict"';
        if (isObjKey || isImportPath || isUseStrict) return tok.value;

        const decoded = unescapeJsStringToken(tok.value);
        let poolIdx = strings.indexOf(decoded);
        if (poolIdx === -1) {
          poolIdx = strings.length;
          strings.push(decoded);
        }
        return `${funcName}(${poolIdx})`;
      }

      if (tok.type === 'ident' && renameMap.has(tok.value)) {
        // Do NOT rename property accesses (`obj.prop`) or object literal keys (`{ prop: val }`)
        const isPropAccess = prev && prev.type === 'punct' && (prev.value === '.' || prev.value === '?.');
        const isObjKey = next && next.type === 'punct' && next.value === ':' && prev && (prev.value === '{' || prev.value === ',');
        if (isPropAccess || isObjKey) return tok.value;

        // Handle ES6 shorthand property `{ count }` -> `{ count: _0x... }`
        const isShorthandProp =
          prev && (prev.value === '{' || prev.value === ',') &&
          next && (next.value === '}' || next.value === ',') &&
          // Make sure it's not destructuring `const { count } = obj`
          (() => {
            // Walk forward past closing '}' to see if followed by '='
            let d = 1;
            for (let k = idx + 1; k < tokens.length; k++) {
              if (tokens[k].value === '{') d++;
              else if (tokens[k].value === '}') {
                d--;
                if (d === 0) {
                  const afterBrace = nextSigOf(k);
                  return !(afterBrace && afterBrace.value === '=');
                }
              }
            }
            return true;
          })();
        if (isShorthandProp) return `${tok.value}:${renameMap.get(tok.value)}`;
        return renameMap.get(tok.value);
      }

      return tok.value;
    }).join('');

    if (strings.length === 0) return transformed;
    const pool = strings.map((s) => `'${encodeJsHexUnicode(s)}'`).join(',');
    return `const ${arrayName}=[${pool}];function ${funcName}(i){return ${arrayName}[i];}\n${transformed}`;
  };

  // ===========================================================================
  // 6. cURL Parser & Multi-Language Translator + URL Query Inspector
  // ===========================================================================
  function splitShellArgs(str) {
    const cleaned = str.replace(/\\\r?\n/g, ' ').trim();
    const args = [];
    let cur = '';
    let quote = null;
    for (let i = 0; i < cleaned.length; i++) {
      const ch = cleaned[i];
      if (quote) {
        if (ch === '\\' && quote === '"' && i + 1 < cleaned.length) { cur += cleaned[++i]; }
        else if (ch === quote) { quote = null; }
        else cur += ch;
      } else {
        if (ch === "'" || ch === '"') quote = ch;
        else if (/\s/.test(ch)) {
          if (cur) { args.push(cur); cur = ''; }
        } else cur += ch;
      }
    }
    if (cur) args.push(cur);
    return args;
  }

  Data.parseCurl = function (curlStr) {
    const args = splitShellArgs(curlStr);
    if (!args.length) throw new Error('Empty cURL command');
    let i = args[0].toLowerCase() === 'curl' ? 1 : 0;
    const req = { method: null, url: '', headers: {}, body: null };

    for (; i < args.length; i++) {
      const a = args[i];
      if (a === '-X' || a === '--request') {
        req.method = (args[++i] || 'GET').toUpperCase();
      } else if (a === '-H' || a === '--header') {
        const h = args[++i] || '';
        const ci = h.indexOf(':');
        if (ci !== -1) req.headers[h.slice(0, ci).trim()] = h.slice(ci + 1).trim();
      } else if (a === '-d' || a === '--data' || a === '--data-raw' || a === '--data-binary' || a === '--data-urlencode') {
        const d = args[++i] || '';
        req.body = req.body ? req.body + '&' + d : d;
      } else if (a === '-u' || a === '--user') {
        const creds = args[++i] || '';
        req.headers['Authorization'] = 'Basic ' + btoa(creds);
      } else if (a === '-A' || a === '--user-agent') {
        req.headers['User-Agent'] = args[++i] || '';
      } else if (a === '-b' || a === '--cookie') {
        req.headers['Cookie'] = args[++i] || '';
      } else if (!a.startsWith('-') && !req.url) {
        req.url = a;
      }
    }
    if (!req.url) throw new Error('No URL found in cURL command');
    if (!req.method) req.method = req.body ? 'POST' : 'GET';
    return req;
  };

  Data.curlToCode = function (req, target = 'fetch') {
    const hasHeaders = Object.keys(req.headers).length > 0;
    let isJsonBody = false;
    let parsedBody = null;
    if (req.body) {
      try { parsedBody = JSON.parse(req.body); isJsonBody = true; } catch (_) {}
    }

    if (target === 'fetch') {
      const opts = [`  method: ${JSON.stringify(req.method)}`];
      if (hasHeaders) opts.push(`  headers: ${JSON.stringify(req.headers, null, 2).replace(/\n/g, '\n  ')}`);
      if (req.body) opts.push(`  body: ${isJsonBody ? `JSON.stringify(${JSON.stringify(parsedBody, null, 2).replace(/\n/g, '\n  ')})` : JSON.stringify(req.body)}`);
      return `const response = await fetch(${JSON.stringify(req.url)}, {\n${opts.join(',\n')}\n});\nconst data = await response.json();\nconsole.log(data);`;
    }

    if (target === 'axios') {
      const cfg = { method: req.method.toLowerCase(), url: req.url };
      if (hasHeaders) cfg.headers = req.headers;
      if (req.body) cfg.data = isJsonBody ? parsedBody : req.body;
      return `import axios from 'axios';\n\nconst { data } = await axios(${JSON.stringify(cfg, null, 2)});\nconsole.log(data);`;
    }

    if (target === 'python') {
      const lines = ['import requests', ''];
      if (hasHeaders) lines.push(`headers = ${JSON.stringify(req.headers, null, 2)}`);
      if (req.body) {
        if (isJsonBody) lines.push(`payload = ${JSON.stringify(parsedBody, null, 2).replace(/\btrue\b/g, 'True').replace(/\bfalse\b/g, 'False').replace(/\bnull\b/g, 'None')}`);
        else lines.push(`data = ${JSON.stringify(req.body)}`);
      }
      const callArgs = [JSON.stringify(req.url)];
      if (hasHeaders) callArgs.push('headers=headers');
      if (req.body) callArgs.push(isJsonBody ? 'json=payload' : 'data=data');
      lines.push(`response = requests.${req.method.toLowerCase()}(${callArgs.join(', ')})`);
      lines.push('print(response.status_code, response.text)');
      return lines.join('\n');
    }

    if (target === 'php') {
      const lines = ['<?php', `$ch = curl_init(${JSON.stringify(req.url)});`, 'curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);', `curl_setopt($ch, CURLOPT_CUSTOMREQUEST, ${JSON.stringify(req.method)});`];
      if (hasHeaders) {
        const hdrs = Object.entries(req.headers).map(([k, v]) => `  ${JSON.stringify(`${k}: ${v}`)}`).join(',\n');
        lines.push(`curl_setopt($ch, CURLOPT_HTTPHEADER, [\n${hdrs}\n]);`);
      }
      if (req.body) lines.push(`curl_setopt($ch, CURLOPT_POSTFIELDS, ${JSON.stringify(req.body)});`);
      lines.push('$response = curl_exec($ch);', 'curl_close($ch);', 'echo $response;');
      return lines.join('\n');
    }

    if (target === 'go') {
      const bodyExpr = req.body ? `strings.NewReader(${JSON.stringify(req.body)})` : 'nil';
      const hdrLines = Object.entries(req.headers).map(([k, v]) => `\treq.Header.Set(${JSON.stringify(k)}, ${JSON.stringify(v)})`).join('\n');
      return `package main\n\nimport (\n\t"fmt"\n\t"io"\n\t"net/http"${req.body ? '\n\t"strings"' : ''}\n)\n\nfunc main() {\n\treq, _ := http.NewRequest(${JSON.stringify(req.method)}, ${JSON.stringify(req.url)}, ${bodyExpr})\n${hdrLines ? hdrLines + '\n' : ''}\tresp, err := http.DefaultClient.Do(req)\n\tif err != nil { panic(err) }\n\tdefer resp.Body.Close()\n\tbody, _ := io.ReadAll(resp.Body)\n\tfmt.Println(string(body))\n}`;
    }

    throw new Error(`Unknown target: ${target}`);
  };

  // ===========================================================================
  // 7. Full GFM Markdown Renderer (Clean HTML, Zero Watermark, XSS-Safe URLs)
  // ===========================================================================
  function safeHref(url) {
    const trimmed = url.trim();
    if (/^(https?:|mailto:|\/|#)/i.test(trimmed)) return trimmed.replace(/"/g, '&quot;');
    return '#';
  }

  function parseInlineMd(text) {
    // Protect inline code spans first
    const codeSpans = [];
    let s = text.replace(/`([^`]+)`/g, (_, code) => {
      codeSpans.push(`<code>${Omni.escapeHTML(code)}</code>`);
      return `__MD_CODE_${codeSpans.length - 1}__`;
    });

    s = Omni.escapeHTML(s);
    // Images & Links
    s = s.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, url) => `<img src="${safeHref(url)}" alt="${alt}" loading="lazy">`);
    s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, url) => `<a href="${safeHref(url)}" target="_blank" rel="noopener noreferrer">${label}</a>`);
    // Bold+Italic, Bold, Italic, Strikethrough
    s = s.replace(/\*\*\*([^*]+)\*\*\*/g, '<strong><em>$1</em></strong>');
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/__([^_]+)__/g, '<strong>$1</strong>');
    s = s.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    s = s.replace(/~~([^~]+)~~/g, '<del>$1</del>');

    return s.replace(/__MD_CODE_(\d+)__/g, (_, i) => codeSpans[Number(i)]);
  }

  Data.renderMarkdown = function (md) {
    const lines = md.replace(/\r\n?/g, '\n').split('\n');
    const out = [];
    let inCode = false;
    let codeLang = '';
    let codeBuf = [];
    let listType = null; // 'ul' | 'ol'

    const closeList = () => {
      if (listType) { out.push(`</${listType}>`); listType = null; }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      // Fenced code blocks
      if (trimmed.startsWith('```')) {
        if (inCode) {
          out.push(`<pre><code${codeLang ? ` class="language-${Omni.escapeHTML(codeLang)}"` : ''}>${Omni.escapeHTML(codeBuf.join('\n'))}</code></pre>`);
          inCode = false;
          codeBuf = [];
          codeLang = '';
        } else {
          closeList();
          inCode = true;
          codeLang = trimmed.slice(3).trim();
        }
        continue;
      }
      if (inCode) { codeBuf.push(line); continue; }

      // Horizontal rule
      if (/^(?:---+|\*\*\*+|___+)$/.test(trimmed)) {
        closeList();
        out.push('<hr>');
        continue;
      }

      // GFM Table detection
      if (trimmed.includes('|') && i + 1 < lines.length && /^\|?[\s:-]+\|[\s|:-]+$/.test(lines[i + 1].trim())) {
        closeList();
        const splitRow = (r) => r.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
        const headers = splitRow(line);
        i += 2;
        const bodyRows = [];
        while (i < lines.length && lines[i].trim().includes('|')) {
          bodyRows.push(splitRow(lines[i]));
          i++;
        }
        i--;
        const thead = '<thead><tr>' + headers.map((h) => `<th>${parseInlineMd(h)}</th>`).join('') + '</tr></thead>';
        const tbody = '<tbody>' + bodyRows.map((r) => '<tr>' + headers.map((_, ci) => `<td>${parseInlineMd(r[ci] || '')}</td>`).join('') + '</tr>').join('') + '</tbody>';
        out.push(`<table>${thead}${tbody}</table>`);
        continue;
      }

      // Headings h1-h6
      const hMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
      if (hMatch) {
        closeList();
        const lvl = hMatch[1].length;
        out.push(`<h${lvl}>${parseInlineMd(hMatch[2])}</h${lvl}>`);
        continue;
      }

      // Blockquote
      if (trimmed.startsWith('>')) {
        closeList();
        const qLines = [trimmed.replace(/^>\s?/, '')];
        while (i + 1 < lines.length && lines[i + 1].trim().startsWith('>')) {
          i++;
          qLines.push(lines[i].trim().replace(/^>\s?/, ''));
        }
        out.push(`<blockquote>${qLines.map((q) => `<p>${parseInlineMd(q)}</p>`).join('')}</blockquote>`);
        continue;
      }

      // Task list / Unordered list
      const ulMatch = trimmed.match(/^[-*+]\s+(.+)$/);
      if (ulMatch) {
        if (listType !== 'ul') { closeList(); out.push('<ul>'); listType = 'ul'; }
        let body = ulMatch[1];
        if (/^\[[ xX]\]\s+/.test(body)) {
          const checked = body[1].toLowerCase() === 'x';
          body = `<input type="checkbox" disabled${checked ? ' checked' : ''}> ` + parseInlineMd(body.slice(4));
        } else {
          body = parseInlineMd(body);
        }
        out.push(`  <li>${body}</li>`);
        continue;
      }

      // Ordered list
      const olMatch = trimmed.match(/^\d+\.\s+(.+)$/);
      if (olMatch) {
        if (listType !== 'ol') { closeList(); out.push('<ol>'); listType = 'ol'; }
        out.push(`  <li>${parseInlineMd(olMatch[1])}</li>`);
        continue;
      }

      closeList();
      if (trimmed === '') continue;
      out.push(`<p>${parseInlineMd(trimmed)}</p>`);
    }

    // Flush unclosed code block gracefully!
    if (inCode) {
      out.push(`<pre><code${codeLang ? ` class="language-${Omni.escapeHTML(codeLang)}"` : ''}>${Omni.escapeHTML(codeBuf.join('\n'))}</code></pre>`);
    }
    closeList();
    return out.join('\n');
  };

  // ===========================================================================
  // 8. Myers Diff Engine (CRLF normalized, line numbers, word-level inline diff)
  // ===========================================================================
  function computeWordDiff(oldStr, newStr) {
    const a = oldStr.split(/(\s+)/);
    const b = newStr.split(/(\s+)/);
    const M = a.length, N = b.length;
    if (M * N > 40000) return { oldParts: [{ text: oldStr, changed: true }], newParts: [{ text: newStr, changed: true }] };
    const dp = Array.from({ length: M + 1 }, () => new Uint16Array(N + 1));
    for (let i = M - 1; i >= 0; i--) {
      for (let j = N - 1; j >= 0; j--) {
        dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
      }
    }
    const oldParts = [], newParts = [];
    let i = 0, j = 0;
    while (i < M && j < N) {
      if (a[i] === b[j]) {
        oldParts.push({ text: a[i], changed: false });
        newParts.push({ text: b[j], changed: false });
        i++; j++;
      } else if (dp[i + 1][j] >= dp[i][j + 1]) {
        oldParts.push({ text: a[i++], changed: true });
      } else {
        newParts.push({ text: b[j++], changed: true });
      }
    }
    while (i < M) oldParts.push({ text: a[i++], changed: true });
    while (j < N) newParts.push({ text: b[j++], changed: true });
    return { oldParts, newParts };
  }

  Data.diffTexts = function (origText, modText, options = {}) {
    const norm = (t) => t.replace(/\r\n?/g, '\n');
    const origLines = norm(origText).split('\n');
    const modLines = norm(modText).split('\n');

    const key = (s) => {
      let r = s;
      if (options.ignoreWhitespace) r = r.replace(/\s+/g, ' ').trim();
      if (options.ignoreCase) r = r.toLowerCase();
      return r;
    };

    const a = origLines.map(key);
    const b = modLines.map(key);
    const N = a.length;
    const M = b.length;
    const max = N + M;

    // Fast O((N+M)D) Myers diff
    const offset = max;
    const v = new Int32Array(2 * max + 1);
    const trace = [];

    let foundD = max;
    outer:
    for (let d = 0; d <= max; d++) {
      trace.push(v.slice());
      for (let k = -d; k <= d; k += 2) {
        let x;
        if (k === -d || (k !== d && v[offset + k - 1] < v[offset + k + 1])) {
          x = v[offset + k + 1];
        } else {
          x = v[offset + k - 1] + 1;
        }
        let y = x - k;
        while (x < N && y < M && a[x] === b[y]) { x++; y++; }
        v[offset + k] = x;
        if (x >= N && y >= M) { foundD = d; break outer; }
      }
    }

    const edits = [];
    let x = N, y = M;
    for (let d = foundD; d > 0; d--) {
      const prevV = trace[d];
      const k = x - y;
      let prevK;
      if (k === -d || (k !== d && prevV[offset + k - 1] < prevV[offset + k + 1])) {
        prevK = k + 1;
      } else {
        prevK = k - 1;
      }
      const prevX = prevV[offset + prevK];
      const prevY = prevX - prevK;

      while (x > prevX && y > prevY) {
        edits.push({ type: 'unchanged', oldLine: x, newLine: y, text: origLines[x - 1] });
        x--; y--;
      }
      if (x === prevX) {
        edits.push({ type: 'added', oldLine: null, newLine: y, text: modLines[y - 1] });
        y--;
      } else {
        edits.push({ type: 'removed', oldLine: x, newLine: null, text: origLines[x - 1] });
        x--;
      }
    }
    while (x > 0 && y > 0) {
      edits.push({ type: 'unchanged', oldLine: x, newLine: y, text: origLines[x - 1] });
      x--; y--;
    }
    edits.reverse();

    // Attach inline word-level diff when a removed line is directly followed by an added line
    for (let i = 0; i < edits.length - 1; i++) {
      if (edits[i].type === 'removed' && edits[i + 1].type === 'added') {
        const wd = computeWordDiff(edits[i].text, edits[i + 1].text);
        edits[i].inline = wd.oldParts;
        edits[i + 1].inline = wd.newParts;
        i++;
      }
    }
    return edits;
  };
})(typeof window !== 'undefined' ? window : globalThis);
