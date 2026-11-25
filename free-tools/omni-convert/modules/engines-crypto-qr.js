// OmniConvert Pro 2.0 — ISO/IEC 18004 QR Engine (v1–v40), Crypto/Hash Vault, JWT Signer/Verifier, PEM ASN.1 Parser, Unbiased Password & ID Generators
(function (global) {
  'use strict';

  const Omni = (global.Omni = global.Omni || {});

  // ===========================================================================
  // 1. Cryptographic Hashes (MD5 + Pure-JS SHA-1/SHA-256 fallback + WebCrypto)
  // ===========================================================================
  const CryptoEngine = (Omni.Crypto = {});

  function toBytes(input) {
    if (input instanceof Uint8Array) return input;
    if (input instanceof ArrayBuffer) return new Uint8Array(input);
    return new TextEncoder().encode(String(input));
  }

  function bytesToHex(bytes) {
    let hex = '';
    for (let i = 0; i < bytes.length; i++) hex += bytes[i].toString(16).padStart(2, '0');
    return hex;
  }

  function bytesToBase64(bytes) {
    let bin = '';
    const chunk = 0x8000;
    for (let i = 0; i < bytes.length; i += chunk) {
      bin += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
    }
    return btoa(bin);
  }

  function base64ToBytes(b64) {
    const clean = b64.replace(/\s+/g, '');
    const bin = atob(clean);
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }

  function bytesToBase64Url(bytes) {
    return bytesToBase64(bytes).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  function base64UrlToBytes(str) {
    let b64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (b64.length % 4) b64 += '=';
    return base64ToBytes(b64);
  }

  CryptoEngine.bytesToHex = bytesToHex;
  CryptoEngine.bytesToBase64 = bytesToBase64;
  CryptoEngine.base64ToBytes = base64ToBytes;
  CryptoEngine.bytesToBase64Url = bytesToBase64Url;
  CryptoEngine.base64UrlToBytes = base64UrlToBytes;

  // RFC 1321 MD5 operating directly on Uint8Array (exact for UTF-8 and binary files)
  CryptoEngine.md5 = function (input) {
    const msg = toBytes(input);
    const len = msg.length;
    const bitLenLo = (len << 3) >>> 0;
    const bitLenHi = (len >>> 29) >>> 0;
    const paddedLen = ((len + 8) >> 6) * 64 + 64;
    const buf = new Uint8Array(paddedLen);
    buf.set(msg);
    buf[len] = 0x80;
    const dv = new DataView(buf.buffer);
    dv.setUint32(paddedLen - 8, bitLenLo, true);
    dv.setUint32(paddedLen - 4, bitLenHi, true);

    const S = [
      7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
      5,  9, 14, 20, 5,  9, 14, 20, 5,  9, 14, 20, 5,  9, 14, 20,
      4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
      6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21,
    ];
    const K = new Uint32Array(64);
    for (let i = 0; i < 64; i++) K[i] = Math.floor(Math.abs(Math.sin(i + 1)) * 0x100000000) >>> 0;

    let a0 = 0x67452301, b0 = 0xefcdab89, c0 = 0x98badcfe, d0 = 0x10325476;
    const M = new Uint32Array(16);

    for (let offset = 0; offset < paddedLen; offset += 64) {
      for (let j = 0; j < 16; j++) M[j] = dv.getUint32(offset + j * 4, true);
      let A = a0, B = b0, C = c0, D = d0;
      for (let i = 0; i < 64; i++) {
        let F, g;
        if (i < 16) { F = (B & C) | ((~B) & D); g = i; }
        else if (i < 32) { F = (D & B) | ((~D) & C); g = (5 * i + 1) & 15; }
        else if (i < 48) { F = B ^ C ^ D; g = (3 * i + 5) & 15; }
        else { F = C ^ (B | (~D)); g = (7 * i) & 15; }
        const tmp = (A + F + K[i] + M[g]) >>> 0;
        A = D;
        D = C;
        C = B;
        B = (B + ((tmp << S[i]) | (tmp >>> (32 - S[i])))) >>> 0;
      }
      a0 = (a0 + A) >>> 0;
      b0 = (b0 + B) >>> 0;
      c0 = (c0 + C) >>> 0;
      d0 = (d0 + D) >>> 0;
    }

    const out = new Uint8Array(16);
    const odv = new DataView(out.buffer);
    odv.setUint32(0, a0, true);
    odv.setUint32(4, b0, true);
    odv.setUint32(8, c0, true);
    odv.setUint32(12, d0, true);
    return bytesToHex(out);
  };

  // Pure-JS SHA-1 (works even over file:// when crypto.subtle is unavailable)
  CryptoEngine.sha1Sync = function (input) {
    const msg = toBytes(input);
    const len = msg.length;
    const paddedLen = ((len + 8) >> 6) * 64 + 64;
    const buf = new Uint8Array(paddedLen);
    buf.set(msg);
    buf[len] = 0x80;
    const dv = new DataView(buf.buffer);
    dv.setUint32(paddedLen - 8, Math.floor(len / 0x20000000), false);
    dv.setUint32(paddedLen - 4, (len << 3) >>> 0, false);

    let h0 = 0x67452301, h1 = 0xEFCDAB89, h2 = 0x98BADCFE, h3 = 0x10325476, h4 = 0xC3D2E1F0;
    const w = new Uint32Array(80);
    const rol = (v, n) => ((v << n) | (v >>> (32 - n))) >>> 0;

    for (let off = 0; off < paddedLen; off += 64) {
      for (let i = 0; i < 16; i++) w[i] = dv.getUint32(off + i * 4, false);
      for (let i = 16; i < 80; i++) w[i] = rol(w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16], 1);
      let a = h0, b = h1, c = h2, d = h3, e = h4;
      for (let i = 0; i < 80; i++) {
        let f, k;
        if (i < 20) { f = (b & c) | ((~b) & d); k = 0x5A827999; }
        else if (i < 40) { f = b ^ c ^ d; k = 0x6ED9EBA1; }
        else if (i < 60) { f = (b & c) | (b & d) | (c & d); k = 0x8F1BBCDC; }
        else { f = b ^ c ^ d; k = 0xCA62C1D6; }
        const tmp = (rol(a, 5) + f + e + k + w[i]) >>> 0;
        e = d; d = c; c = rol(b, 30); b = a; a = tmp;
      }
      h0 = (h0 + a) >>> 0; h1 = (h1 + b) >>> 0; h2 = (h2 + c) >>> 0; h3 = (h3 + d) >>> 0; h4 = (h4 + e) >>> 0;
    }
    const out = new Uint8Array(20);
    const odv = new DataView(out.buffer);
    [h0, h1, h2, h3, h4].forEach((h, i) => odv.setUint32(i * 4, h, false));
    return bytesToHex(out);
  };

  // Pure-JS SHA-256 (FIPS 180-4 exact — works even over file://)
  const SHA256_K = new Uint32Array([
    0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,
    0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,
    0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,
    0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,
    0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,
    0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,
    0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,
    0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2,
  ]);

  function sha256Bytes(input) {
    const msg = toBytes(input);
    const len = msg.length;
    const paddedLen = ((len + 8) >> 6) * 64 + 64;
    const buf = new Uint8Array(paddedLen);
    buf.set(msg);
    buf[len] = 0x80;
    const dv = new DataView(buf.buffer);
    dv.setUint32(paddedLen - 8, Math.floor(len / 0x20000000), false);
    dv.setUint32(paddedLen - 4, (len << 3) >>> 0, false);

    let H0 = 0x6a09e667, H1 = 0xbb67ae85, H2 = 0x3c6ef372, H3 = 0xa54ff53a;
    let H4 = 0x510e527f, H5 = 0x9b05688c, H6 = 0x1f83d9ab, H7 = 0x5be0cd19;
    const W = new Uint32Array(64);
    const rotr = (x, n) => ((x >>> n) | (x << (32 - n))) >>> 0;

    for (let off = 0; off < paddedLen; off += 64) {
      for (let i = 0; i < 16; i++) W[i] = dv.getUint32(off + i * 4, false);
      for (let i = 16; i < 64; i++) {
        const s0 = rotr(W[i - 15], 7) ^ rotr(W[i - 15], 18) ^ (W[i - 15] >>> 3);
        const s1 = rotr(W[i - 2], 17) ^ rotr(W[i - 2], 19) ^ (W[i - 2] >>> 10);
        W[i] = (W[i - 16] + s0 + W[i - 7] + s1) >>> 0;
      }
      let a = H0, b = H1, c = H2, d = H3, e = H4, f = H5, g = H6, h = H7;
      for (let i = 0; i < 64; i++) {
        const S1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
        const ch = (e & f) ^ ((~e) & g);
        const t1 = (h + S1 + ch + SHA256_K[i] + W[i]) >>> 0;
        const S0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
        const maj = (a & b) ^ (a & c) ^ (b & c);
        const t2 = (S0 + maj) >>> 0;
        h = g; g = f; f = e; e = (d + t1) >>> 0; d = c; c = b; b = a; a = (t1 + t2) >>> 0;
      }
      H0 = (H0 + a) >>> 0; H1 = (H1 + b) >>> 0; H2 = (H2 + c) >>> 0; H3 = (H3 + d) >>> 0;
      H4 = (H4 + e) >>> 0; H5 = (H5 + f) >>> 0; H6 = (H6 + g) >>> 0; H7 = (H7 + h) >>> 0;
    }
    const out = new Uint8Array(32);
    const odv = new DataView(out.buffer);
    [H0, H1, H2, H3, H4, H5, H6, H7].forEach((v, i) => odv.setUint32(i * 4, v, false));
    return out;
  }

  CryptoEngine.sha256Sync = function (input) {
    return bytesToHex(sha256Bytes(input));
  };

  // Pure-JS HMAC-SHA256 fallback
  function hmacSha256Bytes(keyInput, msgInput) {
    let key = toBytes(keyInput);
    const msg = toBytes(msgInput);
    if (key.length > 64) key = sha256Bytes(key);
    const ipad = new Uint8Array(64);
    const opad = new Uint8Array(64);
    ipad.fill(0x36);
    opad.fill(0x5c);
    for (let i = 0; i < key.length; i++) { ipad[i] ^= key[i]; opad[i] ^= key[i]; }
    const inner = new Uint8Array(64 + msg.length);
    inner.set(ipad);
    inner.set(msg, 64);
    const innerHash = sha256Bytes(inner);
    const outer = new Uint8Array(64 + 32);
    outer.set(opad);
    outer.set(innerHash, 64);
    return sha256Bytes(outer);
  }

  CryptoEngine.digest = async function (input, algo) {
    const bytes = toBytes(input);
    if (algo === 'MD5') return CryptoEngine.md5(bytes);
    if (global.crypto && global.crypto.subtle) {
      const buf = await global.crypto.subtle.digest(algo, bytes);
      return bytesToHex(new Uint8Array(buf));
    }
    if (algo === 'SHA-1') return CryptoEngine.sha1Sync(bytes);
    if (algo === 'SHA-256') return CryptoEngine.sha256Sync(bytes);
    throw new Error(`${algo} requires HTTPS/localhost (Web Crypto API)`);
  };

  CryptoEngine.hmac = async function (algo, secret, message) {
    const keyBytes = toBytes(secret);
    const msgBytes = toBytes(message);
    if (global.crypto && global.crypto.subtle) {
      const key = await global.crypto.subtle.importKey('raw', keyBytes, { name: 'HMAC', hash: algo }, false, ['sign']);
      const sig = await global.crypto.subtle.sign('HMAC', key, msgBytes);
      return new Uint8Array(sig);
    }
    if (algo === 'SHA-256') return hmacSha256Bytes(keyBytes, msgBytes);
    throw new Error(`HMAC-${algo} requires HTTPS/localhost`);
  };

  // ===========================================================================
  // 2. AES-256-GCM Client-Side Vault (PBKDF2 150k iterations)
  // ===========================================================================
  CryptoEngine.aesEncrypt = async function (plaintext, passphrase) {
    if (!global.crypto || !global.crypto.subtle) throw new Error('AES-256-GCM requires HTTPS, localhost, or Chrome Extension context.');
    if (!passphrase) throw new Error('Passphrase is required.');
    const salt = global.crypto.getRandomValues(new Uint8Array(16));
    const iv = global.crypto.getRandomValues(new Uint8Array(12));
    const baseKey = await global.crypto.subtle.importKey('raw', toBytes(passphrase), 'PBKDF2', false, ['deriveKey']);
    const aesKey = await global.crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt, iterations: 150000, hash: 'SHA-256' },
      baseKey,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt']
    );
    const cipher = new Uint8Array(await global.crypto.subtle.encrypt({ name: 'AES-GCM', iv }, aesKey, toBytes(plaintext)));
    const combined = new Uint8Array(16 + 12 + cipher.length);
    combined.set(salt, 0);
    combined.set(iv, 16);
    combined.set(cipher, 28);
    return 'OCV2:' + bytesToBase64(combined);
  };

  CryptoEngine.aesDecrypt = async function (token, passphrase) {
    if (!global.crypto || !global.crypto.subtle) throw new Error('AES-256-GCM requires HTTPS, localhost, or Chrome Extension context.');
    if (!passphrase) throw new Error('Passphrase is required.');
    const clean = token.trim().replace(/^OCV2:/, '');
    const combined = base64ToBytes(clean);
    if (combined.length < 44) throw new Error('Invalid ciphertext format.');
    const salt = combined.slice(0, 16);
    const iv = combined.slice(16, 28);
    const cipher = combined.slice(28);
    const baseKey = await global.crypto.subtle.importKey('raw', toBytes(passphrase), 'PBKDF2', false, ['deriveKey']);
    const aesKey = await global.crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt, iterations: 150000, hash: 'SHA-256' },
      baseKey,
      { name: 'AES-GCM', length: 256 },
      false,
      ['decrypt']
    );
    const plain = await global.crypto.subtle.decrypt({ name: 'AES-GCM', iv }, aesKey, cipher);
    return new TextDecoder().decode(plain);
  };

  // ===========================================================================
  // 3. Keypair Generator (RSA-OAEP / ECDSA P-256) & X.509 PEM ASN.1 Inspector
  // ===========================================================================
  function wrapPem(label, bytes) {
    const b64 = bytesToBase64(bytes);
    const lines = b64.match(/.{1,64}/g) || [];
    return `-----BEGIN ${label}-----\n${lines.join('\n')}\n-----END ${label}-----`;
  }

  CryptoEngine.generateKeypair = async function (type = 'ECDSA') {
    if (!global.crypto || !global.crypto.subtle) throw new Error('Web Crypto API requires HTTPS or localhost.');
    const alg = type === 'RSA'
      ? { name: 'RSA-OAEP', modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: 'SHA-256' }
      : { name: 'ECDSA', namedCurve: 'P-256' };
    const usages = type === 'RSA' ? ['encrypt', 'decrypt'] : ['sign', 'verify'];
    const pair = await global.crypto.subtle.generateKey(alg, true, usages);
    const pub = new Uint8Array(await global.crypto.subtle.exportKey('spki', pair.publicKey));
    const priv = new Uint8Array(await global.crypto.subtle.exportKey('pkcs8', pair.privateKey));
    return {
      publicKeyPem: wrapPem('PUBLIC KEY', pub),
      privateKeyPem: wrapPem('PRIVATE KEY', priv),
    };
  };

  // Minimal pure-JS ASN.1 DER decoder for X.509 PEM certificates
  const OID_NAMES = {
    '2.5.4.3': 'CN', '2.5.4.6': 'C', '2.5.4.7': 'L', '2.5.4.8': 'ST', '2.5.4.10': 'O', '2.5.4.11': 'OU',
    '1.2.840.113549.1.1.1': 'RSA', '1.2.840.113549.1.1.5': 'SHA1withRSA', '1.2.840.113549.1.1.11': 'SHA256withRSA',
    '1.2.840.113549.1.1.12': 'SHA384withRSA', '1.2.840.113549.1.1.13': 'SHA512withRSA',
    '1.2.840.10045.2.1': 'EC', '1.2.840.10045.4.3.2': 'ECDSAwithSHA256', '1.2.840.10045.4.3.3': 'ECDSAwithSHA384',
    '1.3.101.112': 'Ed25519', '2.5.29.17': 'subjectAltName',
  };

  function decodeDer(bytes, start = 0, limit = bytes.length) {
    let pos = start;
    const tag = bytes[pos++];
    let len = bytes[pos++];
    if (len & 0x80) {
      const n = len & 0x7f;
      len = 0;
      for (let i = 0; i < n; i++) len = (len << 8) | bytes[pos++];
    }
    const contentStart = pos;
    const end = Math.min(limit, contentStart + len);
    const constructed = (tag & 0x20) !== 0;
    const node = { tag, start, contentStart, end, bytes: bytes.subarray(contentStart, end), children: [] };
    if (constructed) {
      let cPos = contentStart;
      while (cPos < end) {
        const child = decodeDer(bytes, cPos, end);
        node.children.push(child);
        cPos = child.end;
      }
    }
    return node;
  }

  function decodeOid(b) {
    if (!b.length) return '';
    const out = [Math.floor(b[0] / 40), b[0] % 40];
    let val = 0;
    for (let i = 1; i < b.length; i++) {
      val = (val << 7) | (b[i] & 0x7f);
      if (!(b[i] & 0x80)) { out.push(val); val = 0; }
    }
    return out.join('.');
  }

  function decodeAsnTime(node) {
    const s = new TextDecoder().decode(node.bytes);
    if (node.tag === 0x17) { // UTCTime YYMMDDHHMMSSZ
      const yy = parseInt(s.slice(0, 2), 10);
      const yyyy = yy >= 50 ? 1900 + yy : 2000 + yy;
      return new Date(`${yyyy}-${s.slice(2, 4)}-${s.slice(4, 6)}T${s.slice(6, 8)}:${s.slice(8, 10)}:${s.slice(10, 12)}Z`);
    }
    // GeneralizedTime YYYYMMDDHHMMSSZ
    return new Date(`${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6, 8)}T${s.slice(8, 10)}:${s.slice(10, 12)}:${s.slice(12, 14)}Z`);
  }

  function decodeName(seqNode) {
    const parts = [];
    for (const rdn of seqNode.children) {
      for (const atv of rdn.children) {
        if (atv.children.length >= 2) {
          const oid = decodeOid(atv.children[0].bytes);
          const key = OID_NAMES[oid] || oid;
          const val = new TextDecoder().decode(atv.children[1].bytes);
          parts.push(`${key}=${val}`);
        }
      }
    }
    return parts.join(', ');
  }

  CryptoEngine.parsePemCertificate = function (pem) {
    const m = pem.match(/-----BEGIN CERTIFICATE-----([\s\S]*?)-----END CERTIFICATE-----/);
    if (!m) throw new Error('No -----BEGIN CERTIFICATE----- block found.');
    const der = base64ToBytes(m[1]);
    const root = decodeDer(der);
    const tbs = root.children[0];
    if (!tbs || tbs.children.length < 6) throw new Error('Malformed X.509 TBSCertificate structure.');

    let idx = 0;
    let version = 1;
    if (tbs.children[0].tag === 0xa0) {
      version = tbs.children[0].children[0].bytes[0] + 1;
      idx = 1;
    }
    const serialHex = bytesToHex(tbs.children[idx].bytes).toUpperCase().match(/.{1,2}/g).join(':');
    const sigOid = decodeOid(tbs.children[idx + 1].children[0].bytes);
    const issuer = decodeName(tbs.children[idx + 2]);
    const validity = tbs.children[idx + 3];
    const notBefore = decodeAsnTime(validity.children[0]);
    const notAfter = decodeAsnTime(validity.children[1]);
    const subject = decodeName(tbs.children[idx + 4]);
    const pubKeyOid = decodeOid(tbs.children[idx + 5].children[0].children[0].bytes);
    const now = Date.now();
    const daysLeft = Math.floor((notAfter.getTime() - now) / 86400000);

    // Optional SAN extension (tag 0xa3 -> SEQUENCE of extensions)
    const sans = [];
    const extWrapper = tbs.children.find((c) => c.tag === 0xa3);
    if (extWrapper && extWrapper.children[0]) {
      for (const ext of extWrapper.children[0].children) {
        if (ext.children.length >= 2 && decodeOid(ext.children[0].bytes) === '2.5.29.17') {
          const oct = ext.children[ext.children.length - 1].bytes;
          try {
            const sanSeq = decodeDer(oct);
            for (const item of sanSeq.children) {
              if (item.tag === 0x82) sans.push('DNS:' + new TextDecoder().decode(item.bytes));
              else if (item.tag === 0x87 && item.bytes.length === 4) sans.push('IP:' + Array.from(item.bytes).join('.'));
            }
          } catch (_) {}
        }
      }
    }

    return {
      version: `v${version}`,
      serialNumber: serialHex,
      signatureAlgorithm: OID_NAMES[sigOid] || sigOid,
      publicKeyAlgorithm: OID_NAMES[pubKeyOid] || pubKeyOid,
      subject,
      issuer,
      validFrom: notBefore.toISOString(),
      validTo: notAfter.toISOString(),
      daysRemaining: daysLeft,
      status: now > notAfter.getTime() ? 'EXPIRED' : (now < notBefore.getTime() ? 'NOT_YET_VALID' : 'VALID'),
      subjectAltNames: sans,
    };
  };

  // ===========================================================================
  // 4. JWT Inspector, Claims Analyzer, Verifier & Signer
  // ===========================================================================
  const JWT_ALG_HASH = { HS256: 'SHA-256', HS384: 'SHA-384', HS512: 'SHA-512' };

  CryptoEngine.jwtDecode = function (raw) {
    const token = String(raw || '').trim().replace(/^Bearer\s+/i, '');
    const parts = token.split('.');
    if (parts.length !== 3) throw new Error('Invalid JWT format (expected 3 dot-separated segments).');
    const header = JSON.parse(new TextDecoder().decode(base64UrlToBytes(parts[0])));
    const payload = JSON.parse(new TextDecoder().decode(base64UrlToBytes(parts[1])));
    const nowSec = Math.floor(Date.now() / 1000);

    const warnings = [];
    if (!header.alg || String(header.alg).toLowerCase() === 'none') {
      warnings.push('CRITICAL: Unsigned token ("alg": "none") — vulnerable to forgery!');
    }
    if (payload.exp === undefined) {
      warnings.push('Warning: Token has no expiration ("exp") claim.');
    }

    let status = 'NO_EXP';
    let expiresAt = null;
    let issuedAt = null;
    let notBefore = null;
    let deltaSeconds = null;

    if (typeof payload.iat === 'number') issuedAt = new Date(payload.iat * 1000).toISOString();
    if (typeof payload.nbf === 'number') notBefore = new Date(payload.nbf * 1000).toISOString();
    if (typeof payload.exp === 'number') {
      expiresAt = new Date(payload.exp * 1000).toISOString();
      deltaSeconds = payload.exp - nowSec;
      if (deltaSeconds <= 0) status = 'EXPIRED';
      else if (typeof payload.nbf === 'number' && payload.nbf > nowSec) status = 'NOT_YET_VALID';
      else status = 'VALID';
    } else if (typeof payload.nbf === 'number' && payload.nbf > nowSec) {
      status = 'NOT_YET_VALID';
    }

    return {
      token,
      header,
      payload,
      signature: parts[2],
      signingInput: `${parts[0]}.${parts[1]}`,
      status,
      issuedAt,
      notBefore,
      expiresAt,
      deltaSeconds,
      warnings,
    };
  };

  CryptoEngine.jwtVerifyHS = async function (rawToken, secret) {
    const decoded = CryptoEngine.jwtDecode(rawToken);
    const hash = JWT_ALG_HASH[decoded.header.alg];
    if (!hash) throw new Error(`Offline HMAC verification supports HS256/HS384/HS512 (token uses ${decoded.header.alg}).`);
    const sigBytes = await CryptoEngine.hmac(hash, secret, decoded.signingInput);
    const expectedSig = bytesToBase64Url(sigBytes);
    return { valid: expectedSig === decoded.signature, expectedSig, actualSig: decoded.signature };
  };

  CryptoEngine.jwtSignHS = async function (headerObj, payloadObj, secret) {
    const alg = headerObj.alg || 'HS256';
    const hash = JWT_ALG_HASH[alg];
    if (!hash) throw new Error(`Unsupported HMAC algorithm: ${alg}`);
    const h = bytesToBase64Url(toBytes(JSON.stringify({ ...headerObj, alg, typ: headerObj.typ || 'JWT' })));
    const p = bytesToBase64Url(toBytes(JSON.stringify(payloadObj)));
    const sigBytes = await CryptoEngine.hmac(hash, secret, `${h}.${p}`);
    return `${h}.${p}.${bytesToBase64Url(sigBytes)}`;
  };

  // ===========================================================================
  // 5. Unbiased Password Generator (Rejection Sampling) & Modern ID Generators
  // ===========================================================================
  function randomIntUnbiased(max) {
    if (max <= 1) return 0;
    const limit = Math.floor(0x100000000 / max) * max;
    const buf = new Uint32Array(1);
    let r;
    do {
      global.crypto.getRandomValues(buf);
      r = buf[0];
    } while (r >= limit);
    return r % max;
  }

  CryptoEngine.generatePassword = function (opts = {}) {
    const {
      length = 16,
      upper = true,
      lower = true,
      numbers = true,
      symbols = true,
      excludeAmbiguous = false,
    } = opts;

    const strip = (s) => excludeAmbiguous ? s.replace(/[0O1lI|`'"]/g, '') : s;
    const pools = [];
    if (upper) pools.push(strip('ABCDEFGHIJKLMNOPQRSTUVWXYZ'));
    if (lower) pools.push(strip('abcdefghijklmnopqrstuvwxyz'));
    if (numbers) pools.push(strip('0123456789'));
    if (symbols) pools.push(strip('!@#$%^&*()-_=+[]{}|;:,.<>?'));

    if (!pools.length) throw new Error('Select at least one character type.');
    const combined = pools.join('');
    const len = Math.max(pools.length, Math.min(128, Number(length) || 16));

    // Guarantee at least one char from EVERY selected pool
    const chars = [];
    for (const pool of pools) {
      chars.push(pool[randomIntUnbiased(pool.length)]);
    }
    while (chars.length < len) {
      chars.push(combined[randomIntUnbiased(combined.length)]);
    }

    // Cryptographically unbiased Fisher-Yates shuffle
    for (let i = chars.length - 1; i > 0; i--) {
      const j = randomIntUnbiased(i + 1);
      const tmp = chars[i];
      chars[i] = chars[j];
      chars[j] = tmp;
    }

    const entropyBits = Math.round(len * Math.log2(combined.length) * 10) / 10;
    const strength = entropyBits < 40 ? 'Weak' : entropyBits < 65 ? 'Fair' : entropyBits < 90 ? 'Strong' : 'Ultra Strong';

    return { password: chars.join(''), entropyBits, poolSize: combined.length, strength };
  };

  CryptoEngine.generateUUIDv4 = function () {
    if (global.crypto && typeof global.crypto.randomUUID === 'function') return global.crypto.randomUUID();
    const b = new Uint8Array(16);
    global.crypto.getRandomValues(b);
    b[6] = (b[6] & 0x0f) | 0x40;
    b[8] = (b[8] & 0x3f) | 0x80;
    const h = bytesToHex(b);
    return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
  };

  // RFC 9562 Timestamp-ordered UUID v7
  CryptoEngine.generateUUIDv7 = function () {
    const b = new Uint8Array(16);
    global.crypto.getRandomValues(b);
    const ms = BigInt(Date.now());
    b[0] = Number((ms >> 40n) & 0xffn);
    b[1] = Number((ms >> 32n) & 0xffn);
    b[2] = Number((ms >> 24n) & 0xffn);
    b[3] = Number((ms >> 16n) & 0xffn);
    b[4] = Number((ms >> 8n) & 0xffn);
    b[5] = Number(ms & 0xffn);
    b[6] = (b[6] & 0x0f) | 0x70;
    b[8] = (b[8] & 0x3f) | 0x80;
    const h = bytesToHex(b);
    return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
  };

  CryptoEngine.generateULID = function () {
    const CROCK = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
    let t = Date.now();
    let timePart = '';
    for (let i = 0; i < 10; i++) {
      timePart = CROCK[t % 32] + timePart;
      t = Math.floor(t / 32);
    }
    let randPart = '';
    for (let i = 0; i < 16; i++) randPart += CROCK[randomIntUnbiased(32)];
    return timePart + randPart;
  };

  CryptoEngine.generateNanoID = function (size = 21) {
    const alpha = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-';
    let out = '';
    for (let i = 0; i < size; i++) out += alpha[randomIntUnbiased(alpha.length)];
    return out;
  };

  // ===========================================================================
  // 6. FULL ISO/IEC 18004 QR CODE ENGINE (Versions 1–40, UTF-8, Exact BCH/RS,
  //    All 8 Mask Patterns + Penalty Selection, 4-Module Quiet Zone, Canvas & SVG)
  // ===========================================================================
  const QREngine = (Omni.QR = {});

  const QR_ECC = { L: 1, M: 0, Q: 3, H: 2 };
  const QR_ECC_IDX = { L: 0, M: 1, Q: 2, H: 3 };

  // Alignment pattern coordinates for ALL 40 ISO QR Versions (index 0 = v1 .. 39 = v40)
  const ALIGNMENT_PATTERNS = [
    [], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34],
    [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62],
    [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90],
    [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118],
    [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146],
    [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170],
  ];

  // ISO/IEC 18004 Table 9 — Complete RS Block Table for Versions 1–40 (L, M, Q, H)
  const RS_TABLE = [
    // v1
    [1,26,19],[1,26,16],[1,26,13],[1,26,9],
    // v2
    [1,44,34],[1,44,28],[1,44,22],[1,44,16],
    // v3
    [1,70,55],[1,70,44],[2,35,17],[2,35,13],
    // v4
    [1,100,80],[2,50,32],[2,50,24],[4,25,9],
    // v5 (FIXED v5-H: [2,33,11,2,34,12] = 134 total, 46 data!)
    [1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],
    // v6
    [2,86,68],[4,43,27],[4,43,19],[4,43,15],
    // v7
    [2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],
    // v8
    [2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],
    // v9
    [2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],
    // v10
    [2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],
    // v11
    [4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],
    // v12
    [2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],
    // v13
    [4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],
    // v14
    [3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],
    // v15
    [5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],
    // v16
    [5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],
    // v17
    [1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],
    // v18
    [5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],
    // v19
    [3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],
    // v20
    [3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],
    // v21
    [4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],
    // v22
    [2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],
    // v23
    [4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],
    // v24
    [6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],
    // v25
    [8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],
    // v26
    [10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],
    // v27
    [8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],
    // v28
    [3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],
    // v29
    [7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],
    // v30
    [5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],
    // v31
    [13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],
    // v32
    [17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],
    // v33
    [17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],
    // v34
    [13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],
    // v35
    [12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],
    // v36
    [6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],
    // v37
    [17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],
    // v38
    [4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],
    // v39
    [20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],
    // v40
    [19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16],
  ];

  const EXP_TABLE = new Uint8Array(256);
  const LOG_TABLE = new Uint8Array(256);
  for (let i = 0; i < 8; i++) EXP_TABLE[i] = 1 << i;
  for (let i = 8; i < 256; i++) EXP_TABLE[i] = EXP_TABLE[i - 4] ^ EXP_TABLE[i - 5] ^ EXP_TABLE[i - 6] ^ EXP_TABLE[i - 8];
  for (let i = 0; i < 255; i++) LOG_TABLE[EXP_TABLE[i]] = i;

  function gexp(n) { while (n < 0) n += 255; while (n >= 255) n -= 255; return EXP_TABLE[n]; }
  function glog(n) { if (n < 1) throw new Error(`glog(${n})`); return LOG_TABLE[n]; }

  class QRPoly {
    constructor(num, shift) {
      let off = 0;
      while (off < num.length && num[off] === 0) off++;
      this.num = new Uint8Array(num.length - off + shift);
      for (let i = 0; i < num.length - off; i++) this.num[i] = num[off + i];
    }
    multiply(e) {
      const out = new Uint8Array(this.num.length + e.num.length - 1);
      for (let i = 0; i < this.num.length; i++) {
        for (let j = 0; j < e.num.length; j++) {
          out[i + j] ^= gexp(glog(this.num[i]) + glog(e.num[j]));
        }
      }
      return new QRPoly(out, 0);
    }
    mod(e) {
      if (this.num.length - e.num.length < 0) return this;
      const ratio = glog(this.num[0]) - glog(e.num[0]);
      const out = this.num.slice();
      for (let i = 0; i < e.num.length; i++) out[i] ^= gexp(glog(e.num[i]) + ratio);
      return new QRPoly(out, 0).mod(e);
    }
  }

  function bchDigit(d) { let n = 0; while (d !== 0) { n++; d >>>= 1; } return n; }

  // EXACT ISO/IEC 18004 BCH(15,5): G15 = 0x537 (1335), G15_MASK = 0x5412 (21522)
  QREngine.getBCHTypeInfo = function (data) {
    let d = data << 10;
    const G15 = 0x537;
    while (bchDigit(d) - bchDigit(G15) >= 0) {
      d ^= G15 << (bchDigit(d) - bchDigit(G15));
    }
    return ((data << 10) | d) ^ 0x5412;
  };

  QREngine.getBCHTypeNumber = function (version) {
    let d = version << 12;
    const G18 = 0x1f25;
    while (bchDigit(d) - bchDigit(G18) >= 0) {
      d ^= G18 << (bchDigit(d) - bchDigit(G18));
    }
    return (version << 12) | d;
  };

  function getRSBlocks(version, ecc) {
    const row = RS_TABLE[(version - 1) * 4 + QR_ECC_IDX[ecc]];
    const list = [];
    for (let i = 0; i < row.length; i += 3) {
      for (let j = 0; j < row[i]; j++) list.push({ totalCount: row[i + 1], dataCount: row[i + 2] });
    }
    return list;
  }

  function getMaskFn(pattern) {
    switch (pattern) {
      case 0: return (r, c) => (r + c) % 2 === 0;
      case 1: return (r) => r % 2 === 0;
      case 2: return (_, c) => c % 3 === 0;
      case 3: return (r, c) => (r + c) % 3 === 0;
      case 4: return (r, c) => (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0;
      case 5: return (r, c) => ((r * c) % 2 + (r * c) % 3) === 0;
      case 6: return (r, c) => (((r * c) % 2 + (r * c) % 3) % 2) === 0;
      case 7: return (r, c) => (((r + c) % 2 + (r * c) % 3) % 2) === 0;
      default: return (r, c) => (r + c) % 2 === 0;
    }
  }

  function computePenalty(modules, n) {
    let lost = 0;
    // Rule 1: runs of 5+ same color
    for (let r = 0; r < n; r++) {
      let run = 1;
      for (let c = 1; c < n; c++) {
        if (modules[r][c] === modules[r][c - 1]) { run++; if (run === 5) lost += 3; else if (run > 5) lost++; }
        else run = 1;
      }
    }
    for (let c = 0; c < n; c++) {
      let run = 1;
      for (let r = 1; r < n; r++) {
        if (modules[r][c] === modules[r - 1][c]) { run++; if (run === 5) lost += 3; else if (run > 5) lost++; }
        else run = 1;
      }
    }
    // Rule 2: 2x2 blocks
    for (let r = 0; r < n - 1; r++) {
      for (let c = 0; c < n - 1; c++) {
        const v = modules[r][c];
        if (v === modules[r][c + 1] && v === modules[r + 1][c] && v === modules[r + 1][c + 1]) lost += 3;
      }
    }
    // Rule 3: finder-like 1:1:3:1:1 patterns
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n - 6; c++) {
        if (modules[r][c] && !modules[r][c + 1] && modules[r][c + 2] && modules[r][c + 3] && modules[r][c + 4] && !modules[r][c + 5] && modules[r][c + 6]) lost += 40;
        if (modules[c][r] && !modules[c + 1][r] && modules[c + 2][r] && modules[c + 3][r] && modules[c + 4][r] && !modules[c + 5][r] && modules[c + 6][r]) lost += 40;
      }
    }
    // Rule 4: dark ratio balance
    let dark = 0;
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (modules[r][c]) dark++;
    const ratio = Math.abs((100 * dark) / (n * n) - 50) / 5;
    lost += Math.floor(ratio) * 10;
    return lost;
  }

  QREngine.generate = function (text, ecc = 'M') {
    const bytes = new TextEncoder().encode(String(text));
    if (!bytes.length) throw new Error('QR content cannot be empty.');
    const level = QR_ECC[ecc] !== undefined ? ecc : 'M';

    // Automatically select minimal ISO version 1..40 that fits UTF-8 bytes at requested ECC
    let version = 0;
    let rsBlocks = null;
    for (let v = 1; v <= 40; v++) {
      const blocks = getRSBlocks(v, level);
      const totalDataBytes = blocks.reduce((s, b) => s + b.dataCount, 0);
      const headerBits = 4 + (v < 10 ? 8 : 16);
      if (headerBits + bytes.length * 8 <= totalDataBytes * 8) {
        version = v;
        rsBlocks = blocks;
        break;
      }
    }
    if (!version) throw new Error(`Text too long (${bytes.length} UTF-8 bytes) for QR ECC ${level}. Try lower ECC or shorter text.`);

    // Build bit stream (Mode 0100 = 8-bit byte, UTF-8 length, UTF-8 bytes, terminator, 0xEC/0x11 padding)
    const totalDataBytes = rsBlocks.reduce((s, b) => s + b.dataCount, 0);
    const totalBits = totalDataBytes * 8;
    const buf = [];
    let bitLen = 0;
    const putBit = (bit) => {
      const bi = Math.floor(bitLen / 8);
      if (buf.length <= bi) buf.push(0);
      if (bit) buf[bi] |= 0x80 >>> (bitLen % 8);
      bitLen++;
    };
    const putNum = (num, length) => {
      for (let i = 0; i < length; i++) putBit(((num >>> (length - i - 1)) & 1) === 1);
    };

    putNum(4, 4); // Byte mode
    putNum(bytes.length, version < 10 ? 8 : 16);
    for (let i = 0; i < bytes.length; i++) putNum(bytes[i], 8);
    if (bitLen + 4 <= totalBits) putNum(0, 4);
    while (bitLen % 8 !== 0) putBit(false);
    // EXACT ISO/IEC 18004 pad bytes: 0xEC (236) and 0x11 (17)
    let padToggle = true;
    while (bitLen < totalBits) {
      putNum(padToggle ? 0xEC : 0x11, 8);
      padToggle = !padToggle;
    }

    // Reed-Solomon interleaving
    let offset = 0;
    let maxDc = 0, maxEc = 0;
    const dcData = [];
    const ecData = [];
    for (const blk of rsBlocks) {
      const dcCount = blk.dataCount;
      const ecCount = blk.totalCount - dcCount;
      maxDc = Math.max(maxDc, dcCount);
      maxEc = Math.max(maxEc, ecCount);
      const dc = new Uint8Array(dcCount);
      for (let i = 0; i < dcCount; i++) dc[i] = buf[offset + i] & 0xff;
      offset += dcCount;
      dcData.push(dc);

      let rsPoly = new QRPoly([1], 0);
      for (let i = 0; i < ecCount; i++) rsPoly = rsPoly.multiply(new QRPoly([1, gexp(i)], 0));
      const rawPoly = new QRPoly(dc, ecCount);
      const modPoly = rawPoly.mod(rsPoly);
      const ec = new Uint8Array(ecCount);
      for (let i = 0; i < ecCount; i++) {
        const mi = i + modPoly.num.length - ecCount;
        ec[i] = mi >= 0 ? modPoly.num[mi] : 0;
      }
      ecData.push(ec);
    }

    const codewords = [];
    for (let i = 0; i < maxDc; i++) for (let r = 0; r < rsBlocks.length; r++) if (i < dcData[r].length) codewords.push(dcData[r][i]);
    for (let i = 0; i < maxEc; i++) for (let r = 0; r < rsBlocks.length; r++) if (i < ecData[r].length) codewords.push(ecData[r][i]);

    const size = version * 4 + 17;

    function buildMatrix(maskPattern) {
      const modules = Array.from({ length: size }, () => new Array(size).fill(null));
      const setProbe = (row, col) => {
        for (let r = -1; r <= 7; r++) {
          if (row + r < 0 || row + r >= size) continue;
          for (let c = -1; c <= 7; c++) {
            if (col + c < 0 || col + c >= size) continue;
            modules[row + r][col + c] =
              (0 <= r && r <= 6 && (c === 0 || c === 6)) ||
              (0 <= c && c <= 6 && (r === 0 || r === 6)) ||
              (2 <= r && r <= 4 && 2 <= c && c <= 4);
          }
        }
      };
      setProbe(0, 0);
      setProbe(size - 7, 0);
      setProbe(0, size - 7);

      // Alignment patterns
      const pos = ALIGNMENT_PATTERNS[version - 1];
      for (let i = 0; i < pos.length; i++) {
        for (let j = 0; j < pos.length; j++) {
          const r0 = pos[i], c0 = pos[j];
          if (modules[r0][c0] !== null) continue;
          for (let r = -2; r <= 2; r++) {
            for (let c = -2; c <= 2; c++) {
              modules[r0 + r][c0 + c] = Math.abs(r) === 2 || Math.abs(c) === 2 || (r === 0 && c === 0);
            }
          }
        }
      }

      // Timing patterns
      for (let i = 8; i < size - 8; i++) {
        if (modules[i][6] === null) modules[i][6] = i % 2 === 0;
        if (modules[6][i] === null) modules[6][i] = i % 2 === 0;
      }

      // Format info (exact ISO BCH)
      const typeBits = QREngine.getBCHTypeInfo((QR_ECC[level] << 3) | maskPattern);
      for (let i = 0; i < 15; i++) {
        const mod = ((typeBits >> i) & 1) === 1;
        if (i < 6) modules[i][8] = mod;
        else if (i < 8) modules[i + 1][8] = mod;
        else modules[size - 15 + i][8] = mod;

        if (i < 8) modules[8][size - i - 1] = mod;
        else if (i < 9) modules[8][15 - i] = mod;
        else modules[8][15 - i - 1] = mod;
      }
      modules[size - 8][8] = true; // Dark module

      // Version info (v7+)
      if (version >= 7) {
        const vBits = QREngine.getBCHTypeNumber(version);
        for (let i = 0; i < 18; i++) {
          const mod = ((vBits >> i) & 1) === 1;
          modules[Math.floor(i / 3)][(i % 3) + size - 11] = mod;
          modules[(i % 3) + size - 11][Math.floor(i / 3)] = mod;
        }
      }

      // Data placement with chosen mask
      const maskFn = getMaskFn(maskPattern);
      let inc = -1;
      let row = size - 1;
      let bitIdx = 7;
      let byteIdx = 0;
      for (let col = size - 1; col > 0; col -= 2) {
        if (col === 6) col--;
        while (true) {
          for (let c = 0; c < 2; c++) {
            const tc = col - c;
            if (modules[row][tc] === null) {
              let dark = byteIdx < codewords.length ? (((codewords[byteIdx] >>> bitIdx) & 1) === 1) : false;
              if (maskFn(row, tc)) dark = !dark;
              modules[row][tc] = dark;
              bitIdx--;
              if (bitIdx === -1) { byteIdx++; bitIdx = 7; }
            }
          }
          row += inc;
          if (row < 0 || row >= size) { row -= inc; inc = -inc; break; }
        }
      }
      return modules;
    }

    // Evaluate all 8 mask patterns and select the lowest-penalty ISO mask!
    let bestMask = 0;
    let bestScore = Infinity;
    let bestModules = null;
    for (let m = 0; m < 8; m++) {
      const mat = buildMatrix(m);
      const score = computePenalty(mat, size);
      if (score < bestScore) { bestScore = score; bestMask = m; bestModules = mat; }
    }

    return {
      version,
      ecc: level,
      mask: bestMask,
      size,
      byteLength: bytes.length,
      modules: bestModules,
      isDark: (r, c) => Boolean(bestModules[r][c]),
    };
  };

  QREngine.RS_TABLE = RS_TABLE;

  // Render QR to Canvas with 4-module Quiet Zone, custom module styles, optional gradient & center logo
  QREngine.drawToCanvas = function (qr, canvas, opts = {}) {
    const sizePx = Math.max(120, Math.min(2048, Number(opts.size) || 280));
    const quiet = opts.quietZone !== undefined ? opts.quietZone : 4;
    const fg = opts.fg || '#000000';
    const fg2 = opts.fg2 || '';
    const bg = opts.bg || '#ffffff';
    const style = opts.style || 'square'; // 'square' | 'rounded' | 'dots'
    const logoImg = opts.logoImg || null;

    const totalMods = qr.size + quiet * 2;
    const cell = sizePx / totalMods;
    canvas.width = sizePx;
    canvas.height = sizePx;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, sizePx, sizePx);

    if (fg2 && fg2 !== fg) {
      const grad = ctx.createLinearGradient(0, 0, sizePx, sizePx);
      grad.addColorStop(0, fg);
      grad.addColorStop(1, fg2);
      ctx.fillStyle = grad;
    } else {
      ctx.fillStyle = fg;
    }

    const isFinder = (r, c) =>
      (r < 7 && c < 7) || (r < 7 && c >= qr.size - 7) || (r >= qr.size - 7 && c < 7);

    for (let r = 0; r < qr.size; r++) {
      for (let c = 0; c < qr.size; c++) {
        if (!qr.isDark(r, c)) continue;
        const x = (c + quiet) * cell;
        const y = (r + quiet) * cell;
        if (style === 'dots' && !isFinder(r, c)) {
          ctx.beginPath();
          ctx.arc(x + cell / 2, y + cell / 2, cell * 0.44, 0, Math.PI * 2);
          ctx.fill();
        } else if (style === 'rounded') {
          const rad = cell * 0.3;
          ctx.beginPath();
          if (ctx.roundRect) ctx.roundRect(x, y, Math.ceil(cell), Math.ceil(cell), rad);
          else ctx.rect(x, y, Math.ceil(cell), Math.ceil(cell));
          ctx.fill();
        } else {
          ctx.fillRect(Math.floor(x), Math.floor(y), Math.ceil(cell), Math.ceil(cell));
        }
      }
    }

    if (logoImg) {
      const box = sizePx * 0.22;
      const lx = (sizePx - box) / 2;
      const ly = (sizePx - box) / 2;
      ctx.fillStyle = bg;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(lx - 6, ly - 6, box + 12, box + 12, 10);
      else ctx.fillRect(lx - 6, ly - 6, box + 12, box + 12);
      ctx.fill();
      ctx.drawImage(logoImg, lx, ly, box, box);
    }
  };

  QREngine.toSvgString = function (qr, opts = {}) {
    const quiet = opts.quietZone !== undefined ? opts.quietZone : 4;
    const fg = opts.fg || '#000000';
    const fg2 = opts.fg2 || '';
    const bg = opts.bg || '#ffffff';
    const style = opts.style || 'square';
    const total = qr.size + quiet * 2;
    const isFinder = (r, c) =>
      (r < 7 && c < 7) || (r < 7 && c >= qr.size - 7) || (r >= qr.size - 7 && c < 7);

    const defs = fg2 && fg2 !== fg
      ? `<defs><linearGradient id="qrg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${fg}"/><stop offset="100%" stop-color="${fg2}"/></linearGradient></defs>`
      : '';
    const fill = fg2 && fg2 !== fg ? 'url(#qrg)' : fg;
    const shapes = [];
    for (let r = 0; r < qr.size; r++) {
      for (let c = 0; c < qr.size; c++) {
        if (!qr.isDark(r, c)) continue;
        const x = c + quiet;
        const y = r + quiet;
        if (style === 'dots' && !isFinder(r, c)) {
          shapes.push(`<circle cx="${x + 0.5}" cy="${y + 0.5}" r="0.44"/>`);
        } else if (style === 'rounded') {
          shapes.push(`<rect x="${x}" y="${y}" width="1" height="1" rx="0.28"/>`);
        } else {
          shapes.push(`<rect x="${x}" y="${y}" width="1.02" height="1.02"/>`);
        }
      }
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${total} ${total}" width="${opts.size || 280}" height="${opts.size || 280}" shape-rendering="crispEdges">${defs}<rect width="100%" height="100%" fill="${bg}"/><g fill="${fill}">${shapes.join('')}</g></svg>`;
  };

  QREngine.buildTemplatePayload = function (mode, data) {
    if (mode === 'wifi') {
      const esc = (s) => String(s || '').replace(/([\\;,:"])/g, '\\$1');
      return `WIFI:T:${data.auth || 'WPA'};S:${esc(data.ssid)};P:${esc(data.password)};H:${data.hidden ? 'true' : 'false'};;`;
    }
    if (mode === 'vcard') {
      return [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${data.lastName || ''};${data.firstName || ''};;;`,
        `FN:${[data.firstName, data.lastName].filter(Boolean).join(' ')}`,
        data.org ? `ORG:${data.org}` : '',
        data.phone ? `TEL;TYPE=CELL:${data.phone}` : '',
        data.email ? `EMAIL:${data.email}` : '',
        data.url ? `URL:${data.url}` : '',
        'END:VCARD',
      ].filter(Boolean).join('\n');
    }
    if (mode === 'email') {
      const q = [];
      if (data.subject) q.push('subject=' + encodeURIComponent(data.subject));
      if (data.body) q.push('body=' + encodeURIComponent(data.body));
      return `mailto:${data.to || ''}${q.length ? '?' + q.join('&') : ''}`;
    }
    if (mode === 'event') {
      const fmt = (iso) => iso ? iso.replace(/[-:]/g, '').replace(/\.\d+/, '') + '00' : '';
      return [
        'BEGIN:VEVENT',
        `SUMMARY:${data.summary || 'Event'}`,
        data.location ? `LOCATION:${data.location}` : '',
        data.start ? `DTSTART:${fmt(data.start)}` : '',
        data.end ? `DTEND:${fmt(data.end)}` : '',
        'END:VEVENT',
      ].filter(Boolean).join('\n');
    }
    return data.text || '';
  };
})(typeof window !== 'undefined' ? window : globalThis);
