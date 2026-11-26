/**
 * AD-GENIUS AI PRO — Core Utilities Engine
 * Shared XSS sanitizer, offline ISO-18004 QR generator, UPC-A SVG barcode,
 * safe Blob downloader, WebGL/workspace lifecycle manager, 60fps WebM recorder,
 * WCAG 2.1 contrast auditor, Toast/Confirm UI, and dynamic EN/FR studio translator.
 */
(function (global) {
    'use strict';

    /* ================================================================
       1. HTML / URL SANITIZATION
       ================================================================ */
    function escapeHtml(str) {
        if (str === null || str === undefined) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function escapeAttr(str) {
        return escapeHtml(str).replace(/`/g, '&#96;');
    }

    function sanitizeUrl(url, fallback) {
        var fb = fallback || 'https://ia-codestudio.com';
        if (!url) return fb;
        var s = String(url).trim();
        if (/^(https?:|mailto:|tel:|#|\/)/i.test(s)) return s;
        if (/^[a-z0-9.-]+\.[a-z]{2,}/i.test(s)) return 'https://' + s;
        return fb;
    }

    /* ================================================================
       2. MODERN CLIPBOARD & SAFE BLOB DOWNLOAD (NO BLOB LEAKS)
       ================================================================ */
    function copyText(text) {
        if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
            return navigator.clipboard.writeText(String(text || '')).then(function () {
                return true;
            }).catch(function () {
                return fallbackCopy(text);
            });
        }
        return Promise.resolve(fallbackCopy(text));
    }

    function fallbackCopy(text) {
        try {
            var ta = document.createElement('textarea');
            ta.value = String(text || '');
            ta.setAttribute('readonly', '');
            ta.style.cssText = 'position:fixed;left:-9999px;top:-9999px;opacity:0;';
            document.body.appendChild(ta);
            ta.select();
            ta.setSelectionRange(0, ta.value.length);
            var ok = document.execCommand('copy');
            document.body.removeChild(ta);
            return !!ok;
        } catch (e) {
            return false;
        }
    }

    function safeDownloadBlob(blob, filename) {
        if (!blob) return;
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = filename || 'ad-genius-export.html';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            if (a.parentNode) a.parentNode.removeChild(a);
            try { URL.revokeObjectURL(url); } catch (e) {}
        }, 4000);
    }

    function safeDownloadDataURL(dataUrl, filename) {
        if (!dataUrl) return;
        var a = document.createElement('a');
        a.href = dataUrl;
        a.download = filename || 'ad-genius-capture.png';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            if (a.parentNode) a.parentNode.removeChild(a);
        }, 1000);
    }

    /* ================================================================
       3. GLASSMORPHIC TOAST & NON-BLOCKING CONFIRM MODAL
       ================================================================ */
    function showToast(message, type) {
        if (typeof document === 'undefined' || !document.body) return;
        var container = document.getElementById('global-toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'global-toast-container';
            container.style.cssText = 'position:fixed;bottom:28px;left:50%;transform:translateX(-50%);z-index:1000005;display:flex;flex-direction:column;gap:8px;pointer-events:none;max-width:92vw;';
            document.body.appendChild(container);
        }
        var borderCol = type === 'error' ? 'rgba(239,68,68,0.55)' : type === 'warn' ? 'rgba(245,158,11,0.55)' : type === 'success' ? 'rgba(16,185,129,0.55)' : 'rgba(59,130,246,0.45)';
        var toast = document.createElement('div');
        toast.style.cssText = 'background:rgba(15,23,42,0.95);backdrop-filter:blur(14px);color:#f8fafc;padding:11px 20px;border-radius:12px;font-family:Inter,sans-serif;font-size:13px;font-weight:600;border:1px solid ' + borderCol + ';box-shadow:0 12px 28px rgba(0,0,0,0.45);opacity:0;transform:translateY(16px);transition:all 0.28s cubic-bezier(0.16,1,0.3,1);text-align:center;';
        toast.textContent = String(message || '');
        container.appendChild(toast);
        requestAnimationFrame(function () {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        });
        setTimeout(function () {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(-12px)';
            setTimeout(function () { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 300);
        }, 3200);
    }

    function showConfirm(message, onConfirm, opts) {
        if (typeof document === 'undefined' || !document.body) {
            if (onConfirm) onConfirm();
            return;
        }
        var fr = global.lang === 'fr';
        var o = opts || {};
        var old = document.getElementById('genius-confirm-modal');
        if (old) old.remove();

        var overlay = document.createElement('div');
        overlay.id = 'genius-confirm-modal';
        overlay.style.cssText = 'position:fixed;inset:0;z-index:1000010;background:rgba(2,6,23,0.78);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:16px;';
        overlay.innerHTML =
            '<div style="background:#0f172a;border:1px solid rgba(148,163,184,0.22);border-radius:16px;padding:24px;max-width:420px;width:100%;box-shadow:0 24px 60px rgba(0,0,0,0.65);font-family:Inter,sans-serif;color:#f8fafc;">' +
            '<h3 style="margin:0 0 10px;font-size:16px;font-weight:700;color:#fff;">' + escapeHtml(o.title || (fr ? 'Confirmation' : 'Confirm Action')) + '</h3>' +
            '<p style="margin:0 0 20px;font-size:13.5px;line-height:1.55;color:#cbd5e1;">' + escapeHtml(message) + '</p>' +
            '<div style="display:flex;gap:10px;justify-content:flex-end;">' +
            '<button type="button" id="gcm-cancel" style="padding:9px 16px;border-radius:8px;border:1px solid rgba(255,255,255,0.12);background:rgba(255,255,255,0.06);color:#cbd5e1;font-size:13px;font-weight:600;cursor:pointer;">' + escapeHtml(o.cancelText || (fr ? 'Annuler' : 'Cancel')) + '</button>' +
            '<button type="button" id="gcm-ok" style="padding:9px 18px;border-radius:8px;border:none;background:linear-gradient(135deg,#3b82f6,#8b5cf6);color:#fff;font-size:13px;font-weight:700;cursor:pointer;">' + escapeHtml(o.okText || (fr ? 'Continuer' : 'Continue')) + '</button>' +
            '</div></div>';
        document.body.appendChild(overlay);
        overlay.querySelector('#gcm-cancel').onclick = function () { overlay.remove(); };
        overlay.onclick = function (e) { if (e.target === overlay) overlay.remove(); };
        overlay.querySelector('#gcm-ok').onclick = function () {
            overlay.remove();
            if (typeof onConfirm === 'function') onConfirm();
        };
    }

    /* ================================================================
       4. WORKSPACE LIFECYCLE & WEBGL RESOURCE CLEANUP REGISTRY
       ================================================================ */
    var _cleanups = {};

    function registerCleanup(tabId, fn) {
        if (!tabId || typeof fn !== 'function') return;
        if (!_cleanups[tabId]) _cleanups[tabId] = [];
        _cleanups[tabId].push(fn);
    }

    function runCleanup(tabId) {
        if (!tabId) {
            Object.keys(_cleanups).forEach(function (k) { runCleanup(k); });
            return;
        }
        var fns = _cleanups[tabId];
        if (!fns || !fns.length) return;
        fns.forEach(function (fn) {
            try { fn(); } catch (e) { console.warn('[GeniusUtils] cleanup warn:', tabId, e); }
        });
    }

    function safeThreeDispose(renderer, scene) {
        try {
            if (scene && typeof scene.traverse === 'function') {
                scene.traverse(function (obj) {
                    if (obj.geometry && typeof obj.geometry.dispose === 'function') {
                        obj.geometry.dispose();
                    }
                    if (obj.material) {
                        var mats = Array.isArray(obj.material) ? obj.material : [obj.material];
                        mats.forEach(function (m) {
                            if (!m) return;
                            ['map', 'lightMap', 'bumpMap', 'normalMap', 'specularMap', 'envMap', 'alphaMap', 'emissiveMap', 'roughnessMap', 'metalnessMap'].forEach(function (prop) {
                                if (m[prop] && typeof m[prop].dispose === 'function') m[prop].dispose();
                            });
                            if (typeof m.dispose === 'function') m.dispose();
                        });
                    }
                });
            }
            if (renderer && typeof renderer.dispose === 'function') {
                renderer.dispose();
                if (typeof renderer.forceContextLoss === 'function') {
                    try { renderer.forceContextLoss(); } catch (e) {}
                }
            }
        } catch (e) {
            console.warn('[GeniusUtils] Three dispose warn:', e);
        }
    }

    /* ================================================================
       5. PURE-JS ISO-18004 QR CODE ENGINE (VERSIONS 1-10, ECC LEVEL M)
          100% Offline, Scannable, Zero External API, Zero Tainted Canvas
       ================================================================ */
    var QR = (function () {
        // GF(256) with primitive polynomial 0x11D
        var EXP = new Uint8Array(512);
        var LOG = new Uint8Array(256);
        (function () {
            var x = 1;
            for (var i = 0; i < 255; i++) {
                EXP[i] = x;
                LOG[x] = i;
                x <<= 1;
                if (x & 256) x ^= 0x11d;
            }
            for (var j = 255; j < 512; j++) EXP[j] = EXP[j - 255];
        })();

        function gfMul(a, b) {
            if (a === 0 || b === 0) return 0;
            return EXP[LOG[a] + LOG[b]];
        }

        function rsGenPoly(ecLen) {
            var poly = [1];
            for (var i = 0; i < ecLen; i++) {
                var next = new Array(poly.length + 1).fill(0);
                var factor = EXP[i];
                for (var j = 0; j < poly.length; j++) {
                    next[j] ^= poly[j];
                    next[j + 1] ^= gfMul(poly[j], factor);
                }
                poly = next;
            }
            return poly;
        }

        function rsEncode(data, ecLen) {
            var gen = rsGenPoly(ecLen);
            var rem = new Uint8Array(ecLen);
            for (var i = 0; i < data.length; i++) {
                var factor = data[i] ^ rem[0];
                for (var j = 0; j < ecLen - 1; j++) rem[j] = rem[j + 1];
                rem[ecLen - 1] = 0;
                if (factor !== 0) {
                    for (var k = 0; k < ecLen; k++) {
                        rem[k] ^= gfMul(gen[k + 1], factor);
                    }
                }
            }
            return rem;
        }

        // ISO/IEC 18004 Level M specs for Versions 1..10:
        // [version, size, totalDataCW, ecPerBlock, g1Blocks, g1Data, g2Blocks, g2Data, alignCenters]
        var SPECS = [
            null,
            [1, 21, 16, 10, 1, 16, 0, 0, []],
            [2, 25, 28, 16, 1, 28, 0, 0, [6, 18]],
            [3, 29, 44, 26, 1, 44, 0, 0, [6, 22]],
            [4, 33, 64, 18, 2, 32, 0, 0, [6, 26]],
            [5, 37, 86, 24, 2, 43, 0, 0, [6, 30]],
            [6, 41, 108, 16, 4, 27, 0, 0, [6, 34]],
            [7, 45, 124, 18, 4, 31, 0, 0, [6, 22, 38]],
            [8, 49, 154, 22, 2, 38, 2, 39, [6, 24, 42]],
            [9, 53, 182, 22, 3, 36, 2, 37, [6, 26, 46]],
            [10, 57, 216, 26, 4, 43, 1, 44, [6, 28, 50]]
        ];

        function utf8Bytes(str) {
            var bytes = [];
            for (var i = 0; i < str.length; i++) {
                var c = str.charCodeAt(i);
                if (c < 0x80) bytes.push(c);
                else if (c < 0x800) { bytes.push(0xc0 | (c >> 6), 0x80 | (c & 0x3f)); }
                else if (c >= 0xd800 && c <= 0xdbff && i + 1 < str.length) {
                    var c2 = str.charCodeAt(++i);
                    var cp = 0x10000 + (((c & 0x3ff) << 10) | (c2 & 0x3ff));
                    bytes.push(0xf0 | (cp >> 18), 0x80 | ((cp >> 12) & 0x3f), 0x80 | ((cp >> 6) & 0x3f), 0x80 | (cp & 0x3f));
                } else {
                    bytes.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 0x3f), 0x80 | (c & 0x3f));
                }
            }
            return bytes;
        }

        function bchFormat(ecBits, mask) {
            var data = ((ecBits & 3) << 3) | (mask & 7);
            var rem = data;
            for (var i = 0; i < 10; i++) rem = (rem << 1) ^ (((rem >> 9) & 1) * 0x537);
            return ((data << 10) | rem) ^ 0x5412;
        }

        function bchVersion(ver) {
            var rem = ver;
            for (var i = 0; i < 12; i++) rem = (rem << 1) ^ (((rem >> 11) & 1) * 0x1f25);
            return (ver << 12) | rem;
        }

        function encode(text) {
            var bytes = utf8Bytes(String(text || 'https://ia-codestudio.com'));
            // Cap payload to Version 10 capacity (213 bytes in byte mode)
            if (bytes.length > 213) bytes = bytes.slice(0, 213);

            var ver = 1;
            for (var v = 1; v <= 10; v++) {
                var countBits = v <= 9 ? 8 : 16;
                var maxBytes = Math.floor((SPECS[v][2] * 8 - 4 - countBits) / 8);
                if (bytes.length <= maxBytes) { ver = v; break; }
            }
            var spec = SPECS[ver];
            var size = spec[1], totalDataCW = spec[2], ecPerBlock = spec[3];
            var g1B = spec[4], g1D = spec[5], g2B = spec[6], g2D = spec[7], aligns = spec[8];

            // Build bit buffer: Mode 0100 (Byte), Char count, Data bytes, Terminator, Pad
            var bits = [];
            function pushBits(val, len) {
                for (var i = len - 1; i >= 0; i--) bits.push((val >> i) & 1);
            }
            pushBits(0x4, 4);
            pushBits(bytes.length, ver <= 9 ? 8 : 16);
            for (var i = 0; i < bytes.length; i++) pushBits(bytes[i], 8);
            var totalBits = totalDataCW * 8;
            for (var t = 0; t < 4 && bits.length < totalBits; t++) bits.push(0);
            while (bits.length % 8 !== 0) bits.push(0);
            var padBytes = [0xec, 0x11], pi = 0;
            while (bits.length < totalBits) { pushBits(padBytes[pi++ & 1], 8); }

            var dataCW = new Uint8Array(totalDataCW);
            for (var ci = 0; ci < totalDataCW; ci++) {
                var b = 0;
                for (var bi = 0; bi < 8; bi++) b = (b << 1) | bits[ci * 8 + bi];
                dataCW[ci] = b;
            }

            // Split blocks & compute RS EC codewords
            var dataBlocks = [], ecBlocks = [], offset = 0;
            for (var b1 = 0; b1 < g1B; b1++) {
                var blk1 = dataCW.slice(offset, offset + g1D);
                offset += g1D;
                dataBlocks.push(blk1);
                ecBlocks.push(rsEncode(blk1, ecPerBlock));
            }
            for (var b2 = 0; b2 < g2B; b2++) {
                var blk2 = dataCW.slice(offset, offset + g2D);
                offset += g2D;
                dataBlocks.push(blk2);
                ecBlocks.push(rsEncode(blk2, ecPerBlock));
            }

            // Interleave codewords
            var finalCW = [];
            var maxDataLen = Math.max(g1D, g2D);
            for (var di = 0; di < maxDataLen; di++) {
                for (var db = 0; db < dataBlocks.length; db++) {
                    if (di < dataBlocks[db].length) finalCW.push(dataBlocks[db][di]);
                }
            }
            for (var ei = 0; ei < ecPerBlock; ei++) {
                for (var eb = 0; eb < ecBlocks.length; eb++) {
                    finalCW.push(ecBlocks[eb][ei]);
                }
            }

            // Build function matrix
            var modules = Array.from({ length: size }, function () { return new Uint8Array(size); });
            var isFunc = Array.from({ length: size }, function () { return new Uint8Array(size); });

            function setFn(r, c, dark) {
                if (r < 0 || r >= size || c < 0 || c >= size) return;
                modules[r][c] = dark ? 1 : 0;
                isFunc[r][c] = 1;
            }

            function drawFinder(r, c) {
                for (var dr = -1; dr <= 7; dr++) {
                    for (var dc = -1; dc <= 7; dc++) {
                        var rr = r + dr, cc = c + dc;
                        if (rr < 0 || rr >= size || cc < 0 || cc >= size) continue;
                        var inOuter = dr >= 0 && dr <= 6 && dc >= 0 && dc <= 6;
                        var dark = inOuter && (dr === 0 || dr === 6 || dc === 0 || dc === 6 || (dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4));
                        setFn(rr, cc, dark);
                    }
                }
            }
            drawFinder(0, 0);
            drawFinder(0, size - 7);
            drawFinder(size - 7, 0);

            // Timing patterns
            for (var k = 8; k < size - 8; k++) {
                setFn(6, k, k % 2 === 0);
                setFn(k, 6, k % 2 === 0);
            }

            // Alignment patterns
            for (var ai = 0; ai < aligns.length; ai++) {
                for (var aj = 0; aj < aligns.length; aj++) {
                    var ar = aligns[ai], ac = aligns[aj];
                    if ((ar === 6 && ac === 6) || (ar === 6 && ac === size - 7) || (ar === size - 7 && ac === 6)) continue;
                    for (var dr2 = -2; dr2 <= 2; dr2++) {
                        for (var dc2 = -2; dc2 <= 2; dc2++) {
                            var dist = Math.max(Math.abs(dr2), Math.abs(dc2));
                            setFn(ar + dr2, ac + dc2, dist !== 1);
                        }
                    }
                }
            }

            // Dark module & reserve format info
            setFn(size - 8, 8, true);
            for (var f = 0; f <= 8; f++) {
                if (f !== 6) { setFn(8, f, false); setFn(f, 8, false); }
            }
            for (var f2 = size - 8; f2 < size; f2++) {
                setFn(8, f2, false);
                setFn(f2, 8, false);
            }

            // Version info (V >= 7)
            if (ver >= 7) {
                var vBits = bchVersion(ver);
                for (var vi = 0; vi < 18; vi++) {
                    var bitV = (vBits >> vi) & 1;
                    var a1 = Math.floor(vi / 3), b1v = size - 11 + (vi % 3);
                    setFn(a1, b1v, !!bitV);
                    setFn(b1v, a1, !!bitV);
                }
            }

            // Place data bits in zigzag
            var bitIdx = 0;
            var totalStreamBits = finalCW.length * 8;
            for (var right = size - 1; right >= 1; right -= 2) {
                if (right === 6) right = 5;
                var upward = ((right + 1) & 2) === 0;
                for (var vert = 0; vert < size; vert++) {
                    var row = upward ? size - 1 - vert : vert;
                    for (var dx = 0; dx < 2; dx++) {
                        var col = right - dx;
                        if (isFunc[row][col]) continue;
                        var darkBit = 0;
                        if (bitIdx < totalStreamBits) {
                            darkBit = (finalCW[bitIdx >> 3] >> (7 - (bitIdx & 7))) & 1;
                            bitIdx++;
                        }
                        modules[row][col] = darkBit;
                    }
                }
            }

            // Mask evaluation (0..7)
            function maskCond(m, r, c) {
                switch (m) {
                    case 0: return (r + c) % 2 === 0;
                    case 1: return r % 2 === 0;
                    case 2: return c % 3 === 0;
                    case 3: return (r + c) % 3 === 0;
                    case 4: return (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0;
                    case 5: return ((r * c) % 2) + ((r * c) % 3) === 0;
                    case 6: return (((r * c) % 2) + ((r * c) % 3)) % 2 === 0;
                    case 7: return (((r + c) % 2) + ((r * c) % 3)) % 2 === 0;
                }
                return false;
            }

            function applyFormat(grid, m) {
                var fmt = bchFormat(0, m); // 00 = Level M
                for (var i = 0; i <= 5; i++) grid[8][i] = (fmt >> (14 - i)) & 1;
                grid[8][7] = (fmt >> 8) & 1;
                grid[8][8] = (fmt >> 7) & 1;
                grid[7][8] = (fmt >> 6) & 1;
                for (var j = 9; j < 15; j++) grid[14 - j][8] = (fmt >> (14 - j)) & 1;
                for (var k = 0; k < 8; k++) grid[8][size - 1 - k] = (fmt >> k) & 1;
                for (var l = 8; l < 15; l++) grid[size - 15 + l][8] = (fmt >> l) & 1;
                grid[size - 8][8] = 1;
            }

            function scoreGrid(grid) {
                var penalty = 0, darkCount = 0;
                for (var r = 0; r < size; r++) {
                    var runR = 1, runC = 1;
                    for (var c = 0; c < size; c++) {
                        if (grid[r][c]) darkCount++;
                        if (c > 0) {
                            if (grid[r][c] === grid[r][c - 1]) { runR++; if (runR === 5) penalty += 3; else if (runR > 5) penalty += 1; }
                            else runR = 1;
                            if (grid[c][r] === grid[c - 1][r]) { runC++; if (runC === 5) penalty += 3; else if (runC > 5) penalty += 1; }
                            else runC = 1;
                        }
                        if (r < size - 1 && c < size - 1) {
                            var v0 = grid[r][c];
                            if (v0 === grid[r][c + 1] && v0 === grid[r + 1][c] && v0 === grid[r + 1][c + 1]) penalty += 3;
                        }
                    }
                }
                var k5 = Math.floor(Math.abs(darkCount * 20 - size * size * 10) / (size * size));
                penalty += k5 * 10;
                return penalty;
            }

            var bestGrid = null, bestScore = Infinity;
            for (var m = 0; m < 8; m++) {
                var g = modules.map(function (row, r) {
                    var nr = new Uint8Array(size);
                    for (var c = 0; c < size; c++) {
                        nr[c] = isFunc[r][c] ? row[c] : (row[c] ^ (maskCond(m, r, c) ? 1 : 0));
                    }
                    return nr;
                });
                applyFormat(g, m);
                var sc = scoreGrid(g);
                if (sc < bestScore) { bestScore = sc; bestGrid = g; }
            }
            return bestGrid;
        }

        return { encode: encode };
    })();

    function generateQRSVGDataURI(text, size, opts) {
        var o = opts || {};
        var fg = o.fg || '#000000';
        var bg = o.bg || '#ffffff';
        var px = size || 180;
        var grid = QR.encode(text);
        var n = grid.length;
        var quiet = 3;
        var total = n + quiet * 2;
        var rects = [];
        for (var r = 0; r < n; r++) {
            for (var c = 0; c < n; c++) {
                if (grid[r][c]) {
                    rects.push('<rect x="' + (c + quiet) + '" y="' + (r + quiet) + '" width="1" height="1"/>');
                }
            }
        }
        var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + px + '" height="' + px + '" viewBox="0 0 ' + total + ' ' + total + '" shape-rendering="crispEdges">' +
            '<rect width="100%" height="100%" fill="' + bg + '"/>' +
            '<g fill="' + fg + '">' + rects.join('') + '</g></svg>';
        return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    }

    function generateQRDataURL(text, size, opts) {
        var o = opts || {};
        var fg = o.fg || '#000000';
        var bg = o.bg || '#ffffff';
        var px = size || 200;
        if (typeof document === 'undefined') {
            return generateQRSVGDataURI(text, px, o);
        }
        try {
            var grid = QR.encode(text);
            var n = grid.length;
            var quiet = 3;
            var total = n + quiet * 2;
            var scale = Math.max(2, Math.floor(px / total));
            var dim = total * scale;
            var cvs = document.createElement('canvas');
            cvs.width = dim;
            cvs.height = dim;
            var ctx = cvs.getContext('2d');
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, dim, dim);
            ctx.fillStyle = fg;
            for (var r = 0; r < n; r++) {
                for (var c = 0; c < n; c++) {
                    if (grid[r][c]) {
                        ctx.fillRect((c + quiet) * scale, (r + quiet) * scale, scale, scale);
                    }
                }
            }
            return cvs.toDataURL('image/png');
        } catch (e) {
            return generateQRSVGDataURI(text, px, o);
        }
    }

    /* ================================================================
       6. OFFLINE UPC-A BARCODE & PLACEHOLDER FALLBACK SVGs
       ================================================================ */
    function barcodeSVGDataURI(label) {
        var code = String(label || '0 36000 29145 2');
        var bars = [1,0,1,0,0,0,1,1,0,1,0,1,1,1,1,0,1,0,1,0,1,1,1,1,0,0,0,1,1,0,1,0,0,0,1,1,0,1,0,0,0,1,1,0,1,0,1,0,1,0,1,1,1,0,0,1,0,1,1,0,0,0,1,0,1,1,0,0,1,1,0,0,1,1,0,1,1,0,0,1,0,1,0,1,1,1,0,1,0,0,1,0,1];
        var x = 10, rects = '';
        for (var i = 0; i < bars.length; i++) {
            if (bars[i]) {
                var tall = (i < 3 || (i >= 45 && i < 50) || i >= bars.length - 3) ? 62 : 52;
                rects += '<rect x="' + (x + i * 2) + '" y="6" width="2" height="' + tall + '" fill="#111"/>';
            }
        }
        var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="206" height="80" viewBox="0 0 206 80">' +
            '<rect width="206" height="80" fill="#fff"/>' + rects +
            '<text x="103" y="76" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle" fill="#111">' + escapeHtml(code) + '</text></svg>';
        return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    }

    function placeholderImageSVG(label, c1, c2) {
        var a = c1 || '#1e3a8a';
        var b = c2 || '#7c3aed';
        var txt = escapeHtml(label || 'AD-GENIUS AI');
        var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">' +
            '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="' + a + '"/><stop offset="100%" stop-color="' + b + '"/></linearGradient></defs>' +
            '<rect width="600" height="400" fill="url(#g)"/>' +
            '<circle cx="480" cy="90" r="110" fill="rgba(255,255,255,0.08)"/>' +
            '<circle cx="110" cy="330" r="140" fill="rgba(255,255,255,0.06)"/>' +
            '<text x="300" y="210" font-family="Inter,sans-serif" font-size="30" font-weight="800" fill="#fff" text-anchor="middle" opacity="0.92">' + txt + '</text></svg>';
        return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    }

    /* ================================================================
       7. WCAG 2.1 CONTRAST AUDITOR
       ================================================================ */
    function parseHex(hex) {
        if (!hex || typeof hex !== 'string') return [0, 0, 0];
        var h = hex.trim().replace('#', '');
        if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
        if (h.length !== 6) return [0, 0, 0];
        return [parseInt(h.slice(0, 2), 16) || 0, parseInt(h.slice(2, 4), 16) || 0, parseInt(h.slice(4, 6), 16) || 0];
    }

    function relLuminance(rgb) {
        var c = rgb.map(function (v) {
            var s = v / 255;
            return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
    }

    function contrastRatio(hex1, hex2) {
        var l1 = relLuminance(parseHex(hex1));
        var l2 = relLuminance(parseHex(hex2));
        var lighter = Math.max(l1, l2), darker = Math.min(l1, l2);
        return (lighter + 0.05) / (darker + 0.05);
    }

    function formatContrastBadge(hex1, hex2, lang) {
        var r = contrastRatio(hex1, hex2);
        var ratioStr = r.toFixed(1) + ':1';
        var fr = lang === 'fr';
        if (r >= 7) return { ratio: r, level: 'AAA', ok: true, color: '#10b981', text: '♿ ' + ratioStr + ' ✅ AAA' };
        if (r >= 4.5) return { ratio: r, level: 'AA', ok: true, color: '#38bdf8', text: '♿ ' + ratioStr + ' ✅ AA' };
        if (r >= 3) return { ratio: r, level: 'AA Large', ok: true, color: '#f59e0b', text: '♿ ' + ratioStr + (fr ? ' ⚠️ Grand' : ' ⚠️ Large') };
        return { ratio: r, level: 'FAIL', ok: false, color: '#ef4444', text: '♿ ' + ratioStr + (fr ? ' ❌ Faible' : ' ❌ Low') };
    }

    /* ================================================================
       8. UNIVERSAL 60FPS CANVAS WEBM VIDEO RECORDER
       ================================================================ */
    function recordCanvasWebM(canvas, durationMs, filename, onProgress) {
        return new Promise(function (resolve, reject) {
            var fr = global.lang === 'fr';
            if (!canvas || typeof canvas.captureStream !== 'function' || typeof MediaRecorder === 'undefined') {
                var errMsg = fr ? 'Enregistrement vidéo non supporté sur ce navigateur ou studio sans canvas.' : 'Video capture requires an active Canvas studio & MediaRecorder support.';
                showToast(errMsg, 'warn');
                reject(new Error(errMsg));
                return;
            }
            var dur = durationMs || 5000;
            var mime = ['video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm'].find(function (m) {
                return MediaRecorder.isTypeSupported(m);
            }) || '';
            try {
                var stream = canvas.captureStream(60);
                var rec = mime ? new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 6000000 }) : new MediaRecorder(stream);
                var chunks = [];
                rec.ondataavailable = function (ev) { if (ev.data && ev.data.size > 0) chunks.push(ev.data); };
                rec.onstop = function () {
                    var blob = new Blob(chunks, { type: mime || 'video/webm' });
                    safeDownloadBlob(blob, filename || 'ad-genius-video-60fps.webm');
                    showToast(fr ? '🎬 Vidéo WebM 60fps exportée !' : '🎬 60fps WebM video exported!', 'success');
                    resolve(blob);
                };
                rec.onerror = function (e) { reject(e); };
                rec.start(250);
                var start = Date.now();
                var iv = setInterval(function () {
                    var left = Math.max(0, Math.ceil((dur - (Date.now() - start)) / 1000));
                    if (typeof onProgress === 'function') onProgress(left);
                    if (Date.now() - start >= dur) {
                        clearInterval(iv);
                        if (rec.state !== 'inactive') rec.stop();
                    }
                }, 200);
            } catch (e) {
                showToast(fr ? 'Impossible de capturer le canvas (CORS ou WebGL).' : 'Could not capture canvas stream.', 'error');
                reject(e);
            }
        });
    }

    /* ================================================================
       9. DYNAMIC EN <-> FR STUDIO PANEL TRANSLATOR
          Covers all 17 EN-only studio modules cleanly & reversibly
       ================================================================ */
    var FR_DICT = [
        ['1. 3D Shape & Material', '1. Forme 3D & Matériau'],
        ['2. Dimensions & Scale', '2. Dimensions & Échelle'],
        ['3. Textures (6 Faces)', '3. Textures (6 Faces)'],
        ['4. Environment & Motion', '4. Environnement & Mouvement'],
        ['5. Export Studio', '5. Exporter le Studio'],
        ['WebGL-powered objects & environments', 'Objets & environnements 3D WebGL'],
        ['Interactive Fortune Wheel Ad Studio', 'Studio Publicitaire Roue de la Fortune'],
        ['1. Campaign Title:', '1. Titre de la campagne :'],
        ['2. Edit Wheel Segments:', '2. Modifier les segments (Prix) :'],
        ['3. Brand Center Logo:', '3. Logo central de la marque :'],
        ['4. Main Accent Color:', '4. Couleur d\'accent principale :'],
        ['Pointer & Center Ring', 'Pointeur & Anneau central'],
        ['⚡ Spin the Wheel', '⚡ Lancer la roue'],
        ['🌐 Export Playable Wheel HTML', '🌐 Exporter la roue HTML'],
        ['Weather & Time Adaptive Ad Campaigns', 'Campagnes adaptatives Météo & Heure'],
        ['1. Simulate Weather:', '1. Simuler la météo :'],
        ['2. Simulate Time:', '2. Simuler l\'heure :'],
        ['3. Edit Marketing Rules:', '3. Règles marketing :'],
        ['4. Brand Style & Media:', '4. Style de marque & Média :'],
        ['Brand Color:', 'Couleur de marque :'],
        ['Background Image:', 'Image de fond :'],
        ['Export Dynamic Ad ZIP', 'Exporter Pub Dynamique ZIP'],
        ['Export HTML', 'Exporter HTML'],
        ['Export PNG', 'Exporter PNG'],
        ['Export Video', 'Exporter Vidéo'],
        ['Export ZIP', 'Exporter ZIP'],
        ['Download HTML', 'Télécharger HTML'],
        ['Download PNG', 'Télécharger PNG'],
        ['Download Image (PNG)', 'Télécharger Image (PNG)'],
        ['Background Color:', 'Couleur de fond :'],
        ['Text Color:', 'Couleur du texte :'],
        ['Accent Color:', 'Couleur d\'accent :'],
        ['Primary Color:', 'Couleur principale :'],
        ['Font Family:', 'Police :'],
        ['Font Size:', 'Taille de police :'],
        ['Animation Effect:', 'Effet d\'animation :'],
        ['Animation Style:', 'Style d\'animation :'],
        ['Headline:', 'Titre principal :'],
        ['Subtitle:', 'Sous-titre :'],
        ['Title:', 'Titre :'],
        ['Description:', 'Description :'],
        ['Button Text:', 'Texte du bouton :'],
        ['Website / URL:', 'Site web / URL :'],
        ['Phone:', 'Téléphone :'],
        ['Email:', 'E-mail :'],
        ['Address:', 'Adresse :'],
        ['Company:', 'Entreprise :'],
        ['Job Title:', 'Poste :'],
        ['Full Name:', 'Nom complet :'],
        ['Theme:', 'Thème :'],
        ['Layout:', 'Mise en page :'],
        ['Add Link', 'Ajouter un lien'],
        ['Add Item', 'Ajouter un élément'],
        ['Add Page', 'Ajouter une page'],
        ['Add Plan', 'Ajouter un forfait'],
        ['Reset', 'Réinitialiser'],
        ['Play', 'Lancer'],
        ['Preview', 'Aperçu'],
        ['Settings', 'Paramètres'],
        ['Colors', 'Couleurs'],
        ['Typography', 'Typographie'],
        ['Lighting Mood:', 'Ambiance lumineuse :'],
        ['Device Model:', 'Modèle d\'appareil :'],
        ['Upload Image:', 'Importer une image :'],
        ['Upload Logo:', 'Importer un logo :'],
        ['Upload Photo:', 'Importer une photo :'],
        ['Matter.js Physics Ad', 'Publicité Physique Matter.js'],
        ['Physics Controls', 'Contrôles Physiques'],
        ['Gravity:', 'Gravité :'],
        ['Bounciness:', 'Rebond :'],
        ['Drop Objects', 'Lâcher les objets'],
        ['Clear Canvas', 'Effacer la toile'],
        ['Export Interactive HTML', 'Exporter HTML Interactif'],
        ['Export Playable HTML5', 'Exporter HTML5 Jouable'],
        ['Pricing Table Studio', 'Studio Tableaux de Prix'],
        ['Certificate Studio Pro', 'Studio Certificats Pro'],
        ['Greeting Card Studio', 'Studio Cartes de Vœux'],
        ['Digital Book Studio', 'Studio Livre Numérique 3D'],
        ['Magazine Cover Studio', 'Studio Couverture Magazine'],
        ['Digital Menu Pro', 'Menu Digital Pro'],
        ['Smart vCard 3.0', 'Smart vCard 3.0'],
        ['BioLink Hub Pro', 'BioLink Hub Pro'],
        ['Playable Ad Builder', 'Créateur de Pub Jouable'],
        ['Kinetic Typography', 'Typographie Cinétique'],
        ['Infinite Zoom Portal', 'Portail Zoom Infini'],
        ['Gravity Sandbox Pro', 'Bac à Sable Gravité Pro'],
        ['Gravity Sandbox', 'Bac à Sable Gravité'],
        ['Mockup Master Pro', 'Mockup Master Pro'],
        ['📸 PNG', '📸 PNG'],
        ['🎥 Video 5s', '🎥 Vidéo 5s'],
        ['🌐 HTML5', '🌐 HTML5'],
        ['● Ready', '● Prêt'],
        ['☀️ Sun', '☀️ Soleil'],
        ['🌧️ Rain', '🌧️ Pluie'],
        ['❄️ Snow', '❄️ Neige'],
        ['💨 Wind', '💨 Vent'],
        ['🌅 Morning', '🌅 Matin'],
        ['☀️ Day', '☀️ Jour'],
        ['🌙 Night', '🌙 Nuit']
    ];

    function translateTextString(txt, lang) {
        if (!txt) return txt;
        var out = txt;
        if (lang === 'fr') {
            for (var i = 0; i < FR_DICT.length; i++) {
                if (out.indexOf(FR_DICT[i][0]) !== -1) {
                    out = out.split(FR_DICT[i][0]).join(FR_DICT[i][1]);
                }
            }
        }
        return out;
    }

    function translateStudioTree(rootEl, lang) {
        if (!rootEl) return;
        var targetLang = lang || global.lang || 'en';
        var walker = document.createTreeWalker(rootEl, NodeFilter.SHOW_TEXT, null);
        var node;
        while ((node = walker.nextNode())) {
            var parent = node.parentElement;
            if (!parent || parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE' || parent.tagName === 'TEXTAREA') continue;
            var raw = node.nodeValue;
            if (!raw || !raw.trim()) continue;
            if (node._origEn === undefined) node._origEn = raw;
            if (targetLang === 'fr') {
                var tr = translateTextString(node._origEn, 'fr');
                if (tr !== node.nodeValue) node.nodeValue = tr;
            } else {
                if (node._origEn !== node.nodeValue) node.nodeValue = node._origEn;
            }
        }
    }

    global.GeniusUtils = {
        escapeHtml: escapeHtml,
        escapeAttr: escapeAttr,
        sanitizeUrl: sanitizeUrl,
        copyText: copyText,
        safeDownloadBlob: safeDownloadBlob,
        safeDownloadDataURL: safeDownloadDataURL,
        showToast: showToast,
        showConfirm: showConfirm,
        registerCleanup: registerCleanup,
        runCleanup: runCleanup,
        safeThreeDispose: safeThreeDispose,
        generateQRMatrix: QR.encode,
        generateQRSVGDataURI: generateQRSVGDataURI,
        generateQRDataURL: generateQRDataURL,
        barcodeSVGDataURI: barcodeSVGDataURI,
        placeholderImageSVG: placeholderImageSVG,
        contrastRatio: contrastRatio,
        formatContrastBadge: formatContrastBadge,
        recordCanvasWebM: recordCanvasWebM,
        translateStudioTree: translateStudioTree
    };
})(typeof window !== 'undefined' ? window : globalThis);
