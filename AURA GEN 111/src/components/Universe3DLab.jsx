import React, { useState, useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import { FIGURES } from '../data/figures';

const KF = `@keyframes u-rB{0%,100%{transform:translateY(0) rotateZ(0)}30%{transform:translateY(-9px) rotateZ(-3deg)}70%{transform:translateY(-5px) rotateZ(3deg)}}@keyframes u-rAL{0%,100%{transform:rotateZ(-15deg)}50%{transform:rotateZ(-65deg)}}@keyframes u-rAR{0%,100%{transform:rotateZ(15deg)}50%{transform:rotateZ(65deg)}}@keyframes u-rLL{0%,100%{transform:rotateZ(0)}50%{transform:rotateZ(22deg)}}@keyframes u-rLR{0%,100%{transform:rotateZ(0)}50%{transform:rotateZ(-22deg)}}@keyframes u-rE{0%,100%{opacity:1}48%{opacity:1}52%{opacity:.1}56%{opacity:1}}@keyframes u-rAn{0%,100%{transform:rotateZ(-8deg)}50%{transform:rotateZ(8deg)}}@keyframes u-aFl{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}@keyframes u-aPu{0%,100%{transform:scale(1)}50%{transform:scale(1.07)}}@keyframes u-aTL{0%,100%{transform:rotateZ(12deg)}50%{transform:rotateZ(32deg)}}@keyframes u-aTR{0%,100%{transform:rotateZ(-12deg)}50%{transform:rotateZ(-32deg)}}@keyframes u-aEy{0%,100%{transform:scaleY(1)}5%{transform:scaleY(.05)}12%{transform:scaleY(1)}}@keyframes u-dBo{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-7px) rotate(2deg)}}@keyframes u-dWL{0%,100%{transform:rotateZ(-15deg) scaleY(1)}50%{transform:rotateZ(-48deg) scaleY(.75)}}@keyframes u-dWR{0%,100%{transform:rotateZ(15deg) scaleY(1)}50%{transform:rotateZ(48deg) scaleY(.75)}}@keyframes u-dFi{0%,100%{transform:scaleX(1);opacity:.9}50%{transform:scaleX(1.5);opacity:1}}@keyframes u-asF{0%,100%{transform:translateY(0) rotate(0)}33%{transform:translateY(-11px) rotate(-3deg)}66%{transform:translateY(-5px) rotate(3deg)}}@keyframes u-tO{from{transform:rotateX(0) rotateY(0) rotateZ(0)}to{transform:rotateX(360deg) rotateY(360deg) rotateZ(180deg)}}@keyframes u-tI{from{transform:rotateX(0) rotateY(0) rotateZ(0)}to{transform:rotateX(-360deg) rotateY(-180deg) rotateZ(360deg)}}@keyframes u-cSp{from{transform:rotateY(0) rotateX(22deg)}to{transform:rotateY(360deg) rotateX(22deg)}}@keyframes u-cGl{0%,100%{filter:drop-shadow(0 0 6px rgba(99,102,241,.7))}50%{filter:drop-shadow(0 0 18px rgba(139,92,246,1))}}@keyframes u-sun{0%,100%{box-shadow:0 0 10px #f59e0b,0 0 22px #f97316}50%{box-shadow:0 0 20px #f59e0b,0 0 45px #f97316}}@keyframes u-o1{from{transform:rotateZ(0)}to{transform:rotateZ(360deg)}}@keyframes u-o2{from{transform:rotateZ(0)}to{transform:rotateZ(360deg)}}@keyframes u-o3{from{transform:rotateZ(0)}to{transform:rotateZ(360deg)}}@keyframes u-o4{from{transform:rotateZ(0)}to{transform:rotateZ(360deg)}}@keyframes u-n1{0%,100%{transform:scale(1) rotate(0);opacity:.6}50%{transform:scale(1.2) rotate(8deg);opacity:.9}}@keyframes u-n2{0%,100%{transform:scale(1.1) rotate(180deg);opacity:.4}50%{transform:scale(.85) rotate(210deg);opacity:.75}}@keyframes u-n3{0%,100%{transform:scale(.9) rotate(270deg);opacity:.5}50%{transform:scale(1.1) rotate(295deg);opacity:.8}}@keyframes u-dna{from{transform:rotateY(0)}to{transform:rotateY(360deg)}}@keyframes u-blob{0%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%}25%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%}50%{border-radius:50% 60% 30% 60%/40% 30% 60% 50%}75%{border-radius:60% 40% 60% 40%/70% 60% 30% 40%}100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%}}@keyframes u-bC{0%,100%{background:linear-gradient(135deg,#6366f1,#8b5cf6)}33%{background:linear-gradient(135deg,#10b981,#06b6d4)}66%{background:linear-gradient(135deg,#f59e0b,#ef4444)}}@keyframes u-fF{0%,100%{transform:rotateY(0) translateZ(22px)}50%{transform:rotateY(0) translateZ(55px)}}@keyframes u-fBk{0%,100%{transform:rotateY(180deg) translateZ(22px)}50%{transform:rotateY(180deg) translateZ(52px)}}@keyframes u-fR{0%,100%{transform:rotateY(90deg) translateZ(22px)}50%{transform:rotateY(90deg) translateZ(48px)}}@keyframes u-fL{0%,100%{transform:rotateY(-90deg) translateZ(22px)}50%{transform:rotateY(-90deg) translateZ(50px)}}@keyframes u-fT{0%,100%{transform:rotateX(90deg) translateZ(22px)}50%{transform:rotateX(90deg) translateZ(46px)}}@keyframes u-fBt{0%,100%{transform:rotateX(-90deg) translateZ(22px)}50%{transform:rotateX(-90deg) translateZ(44px)}}@keyframes u-cG{from{transform:rotateX(-20deg) rotateY(0)}to{transform:rotateX(-20deg) rotateY(360deg)}}@keyframes u-p1{from{transform:rotate(0)}to{transform:rotate(360deg)}}@keyframes u-p2{from{transform:rotate(0)}to{transform:rotate(-360deg)}}@keyframes u-pG{0%,100%{opacity:.75;transform:scale(.95)}50%{opacity:1;transform:scale(1.05)}}@keyframes u-tw{0%,100%{opacity:.2}50%{opacity:1}}`;

const CV = ({ draw }) => {
    const ref = useRef(null);
    useEffect(() => {
        const cv = ref.current; if (!cv) return;
        const ctx = cv.getContext('2d'); let id, t = 0;
        const loop = () => { draw(ctx, cv, t++); id = requestAnimationFrame(loop); };
        loop(); return () => cancelAnimationFrame(id);
    }, [draw]);
    return <canvas ref={ref} width={200} height={130} style={{ borderRadius: 8, display: 'block', width: '100%' }} />;
};

const LazyPreview = ({ Component, icon, color }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.1 });

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} style={{ height: 130, background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.4s' }}>
            {isVisible ? (
                <Component />
            ) : (
                <div style={{ fontSize: 40, opacity: 0.3, filter: 'grayscale(1)', color: color }}>
                    {icon}
                </div>
            )}
        </div>
    );
};

// Compact preview components
const RobotP = () => (
    <div style={{ height: 130, background: 'radial-gradient(ellipse,#0f0c29,#0f172a)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ animation: 'u-rB .85s ease-in-out infinite' }}>
            <div style={{ width: 3, height: 14, background: '#4b5563', margin: '0 auto', animation: 'u-rAn .45s ease-in-out infinite', transformOrigin: 'bottom', position: 'relative' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#6366f1', position: 'absolute', top: -3, left: -1.5, boxShadow: '0 0 6px #6366f1' }} />
            </div>
            <div style={{ width: 38, height: 30, background: 'linear-gradient(135deg,#1e293b,#0f172a)', border: '1px solid #6366f1', borderRadius: 6, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                {[0, '.6s'].map((d, i) => <div key={i} style={{ width: 8, height: 5, background: '#06b6d4', borderRadius: 2, animation: 'u-rE 2.5s ease-in-out infinite', animationDelay: d, boxShadow: '0 0 4px #06b6d4' }} />)}
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <div style={{ width: 9, height: 28, background: '#334155', borderRadius: 4, border: '1px solid #475569', transformOrigin: 'top center', animation: 'u-rAL .85s ease-in-out infinite', marginTop: 5 }} />
                <div style={{ width: 34, height: 42, background: 'linear-gradient(135deg,#1e293b,#0f172a)', border: '1px solid #6366f1', borderRadius: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                    <div style={{ width: 18, height: 5, background: 'linear-gradient(90deg,#6366f1,#8b5cf6)', borderRadius: 3, boxShadow: '0 0 5px #6366f1' }} />
                    <div style={{ display: 'flex', gap: 4 }}>{['#10b981', '#f59e0b', '#ef4444'].map((c, i) => <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: c, boxShadow: `0 0 4px ${c}` }} />)}</div>
                </div>
                <div style={{ width: 9, height: 28, background: '#334155', borderRadius: 4, border: '1px solid #475569', transformOrigin: 'top center', animation: 'u-rAR .85s ease-in-out infinite', marginTop: 5 }} />
            </div>
            <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginTop: 2 }}>
                {[['u-rLL', '0s'], ['u-rLR', '.42s']].map(([a, d], i) => <div key={i} style={{ width: 12, height: 22, background: '#334155', borderRadius: 4, border: '1px solid #475569', transformOrigin: 'top center', animation: `${a} .85s ease-in-out infinite`, animationDelay: d }} />)}
            </div>
        </div>
    </div>
);

const AlienP = () => (
    <div style={{ height: 130, background: 'radial-gradient(ellipse,#0d1f0d,#0f172a)', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ animation: 'u-aFl 2s ease-in-out infinite' }}>
            <div style={{ animation: 'u-aPu 2s ease-in-out infinite' }}>
                <div style={{ width: 52, height: 65, background: 'radial-gradient(ellipse,#1a3a1a,#0d2015)', border: '1.5px solid #10b981', borderRadius: '50% 50% 45% 45%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 0 15px rgba(16,185,129,.4)' }}>
                    <div style={{ display: 'flex', gap: 12 }}>{[0, '.7s'].map((d, i) => <div key={i} style={{ width: 13, height: 18, background: '#10b981', borderRadius: '50%', animation: 'u-aEy 4s ease-in-out infinite', animationDelay: d, boxShadow: '0 0 8px #10b981' }} />)}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 6 }}>
                    {[['u-aTL', '0s'], ['u-aTR', '.3s'], ['u-aTL', '.6s']].map(([a, d], i) => <div key={i} style={{ width: 7, height: 22, background: '#059669', borderRadius: '0 0 50% 50%', transformOrigin: 'top center', animation: `${a} 1.2s ease-in-out infinite`, animationDelay: d }} />)}
                </div>
            </div>
        </div>
    </div>
);

const DragonP = () => (
    <div style={{ height: 130, background: 'radial-gradient(ellipse,#1a0000,#0f172a)', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ animation: 'u-dBo 1.5s ease-in-out infinite', display: 'flex', alignItems: 'center' }}>
            <div style={{ width: 32, height: 45, background: 'linear-gradient(-60deg,#7c2d12,#dc2626)', clipPath: 'polygon(100% 0,100% 100%,0 55%)', transformOrigin: 'right center', animation: 'u-dWL 1.5s ease-in-out infinite' }} />
            <div style={{ position: 'relative' }}>
                <div style={{ width: 55, height: 40, background: 'linear-gradient(135deg,#7c2d12,#991b1b)', borderRadius: '40% 60% 55% 45%', border: '1px solid #ef4444', boxShadow: '0 0 15px rgba(239,68,68,.4)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 8 }}>
                    <div style={{ width: 9, height: 7, background: '#fbbf24', borderRadius: '50%', boxShadow: '0 0 6px #fbbf24' }} />
                </div>
                <div style={{ width: 36, height: 14, background: 'linear-gradient(90deg,#ef4444,#f97316,#fbbf24)', borderRadius: '0 50% 50% 0', animation: 'u-dFi .5s ease-in-out infinite', transformOrigin: 'left center', position: 'absolute', top: 13, right: -34, clipPath: 'polygon(0 50%,100% 0,100% 100%)' }} />
            </div>
            <div style={{ width: 32, height: 45, background: 'linear-gradient(60deg,#7c2d12,#dc2626)', clipPath: 'polygon(0 0,0 100%,100% 55%)', transformOrigin: 'left center', animation: 'u-dWR 1.5s ease-in-out infinite' }} />
        </div>
    </div>
);

const AstroP = () => (
    <div style={{ height: 130, background: '#0f172a', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        {[...Array(8)].map((_, i) => <div key={i} style={{ position: 'absolute', width: 2, height: 2, borderRadius: '50%', background: '#fff', top: `${i * 13}%`, left: `${(i * 17) % 90}%`, animation: 'u-tw 2s ease-in-out infinite', animationDelay: `${i * .25}s` }} />)}
        <div style={{ animation: 'u-asF 3s ease-in-out infinite' }}>
            <div style={{ width: 36, height: 44, background: 'linear-gradient(135deg,#e2e8f0,#94a3b8)', borderRadius: '40% 40% 35% 35%', border: '1px solid #cbd5e1', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 22, height: 17, background: 'linear-gradient(135deg,rgba(99,102,241,.8),rgba(139,92,246,.5))', borderRadius: '35%', border: '1px solid #6366f1', boxShadow: 'inset 0 0 8px rgba(99,102,241,.6)' }} />
            </div>
            <div style={{ width: 46, height: 38, background: 'linear-gradient(135deg,#f1f5f9,#cbd5e1)', borderRadius: 6, margin: '0 auto', border: '1px solid #94a3b8', position: 'relative' }}>
                <div style={{ position: 'absolute', right: -10, top: 5, width: 8, height: 20, background: '#94a3b8', borderRadius: '0 4px 4px 0' }} />
                <div style={{ position: 'absolute', left: -10, top: 5, width: 8, height: 20, background: '#94a3b8', borderRadius: '4px 0 0 4px' }} />
            </div>
        </div>
    </div>
);

const TesseractP = () => (
    <div style={{ height: 130, background: '#0f172a', display: 'flex', justifyContent: 'center', alignItems: 'center', perspective: 200 }}>
        <div style={{ width: 55, height: 55, transformStyle: 'preserve-3d', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, transformStyle: 'preserve-3d', animation: 'u-tO 6s linear infinite' }}>
                {[['rotateX(90deg) translateZ(27px)', '#6366f1'], ['rotateX(-90deg) translateZ(27px)', '#8b5cf6'], ['translateZ(27px)', '#a78bfa'], ['rotateY(180deg) translateZ(27px)', '#c4b5fd'], ['rotateY(90deg) translateZ(27px)', '#7c3aed'], ['rotateY(-90deg) translateZ(27px)', '#6d28d9']].map(([tr, bc], i) => (
                    <div key={i} style={{ position: 'absolute', width: 55, height: 55, background: `${bc}18`, border: `1px solid ${bc}88`, transform: tr }} />
                ))}
            </div>
            <div style={{ position: 'absolute', inset: 0, transformStyle: 'preserve-3d', animation: 'u-tI 4s linear infinite' }}>
                {[['rotateX(90deg) translateZ(16px)', '#06b6d4'], ['rotateX(-90deg) translateZ(16px)', '#0ea5e9'], ['translateZ(16px)', '#38bdf8'], ['rotateY(180deg) translateZ(16px)', '#7dd3fc'], ['rotateY(90deg) translateZ(16px)', '#0284c7'], ['rotateY(-90deg) translateZ(16px)', '#0369a1']].map(([tr, bc], i) => (
                    <div key={i} style={{ position: 'absolute', width: 32, height: 32, left: 11, top: 11, background: `${bc}18`, border: `1px solid ${bc}`, transform: tr }} />
                ))}
            </div>
        </div>
    </div>
);

const TorusP = () => <CV draw={(ctx, cv, t) => {
    const [cx, cy, R, r, a] = [cv.width / 2, cv.height / 2, 40, 16, t * .022];
    ctx.fillStyle = '#0f172a'; ctx.fillRect(0, 0, cv.width, cv.height);
    const pts = [];
    for (let th = 0; th < Math.PI * 2; th += .1) for (let ph = 0; ph < Math.PI * 2; ph += .18) {
        const x3 = (R + r * Math.cos(ph)) * Math.cos(th + a), z3 = (R + r * Math.cos(ph)) * Math.sin(th + a), y3 = r * Math.sin(ph), p = 200 / (200 + z3);
        pts.push({ x: cx + x3 * p, y: cy + y3 * p, p, hue: (th / (Math.PI * 2) * 360 + a * 50) % 360 });
    }
    pts.sort((a, b) => a.p - b.p).forEach(({ x, y, p, hue }) => { ctx.beginPath(); ctx.arc(x, y, 2 * p, 0, Math.PI * 2); ctx.fillStyle = `hsla(${hue},80%,65%,.9)`; ctx.fill(); });
}} />;

const KleinP = () => <CV draw={(ctx, cv, t) => {
    const [cx, cy, a] = [cv.width / 2, cv.height / 2, t * .014];
    ctx.fillStyle = '#0f172a'; ctx.fillRect(0, 0, cv.width, cv.height);
    const pts = [];
    for (let u = 0; u < Math.PI * 2; u += .12) for (let v = 0; v < Math.PI * 2; v += .22) {
        let x, y, z;
        if (u < Math.PI) { x = 3 * Math.cos(u) * (1 + Math.sin(u)) + 2 * (1 - Math.cos(u) / 2) * Math.cos(u + a) * Math.cos(v); y = 4 * Math.sin(u) + 2 * (1 - Math.cos(u) / 2) * Math.sin(u + a) * Math.cos(v); }
        else { x = 3 * Math.cos(u) * (1 + Math.sin(u)) + 2 * (1 - Math.cos(u) / 2) * Math.cos(v + Math.PI); y = 4 * Math.sin(u); }
        z = 2 * (1 - Math.cos(u) / 2) * Math.sin(v);
        const sc = 9, p = 200 / (200 + z * sc);
        pts.push({ x: cx + x * sc * p * .55, y: cy + y * sc * p * .55, hue: (u / (Math.PI * 2) * 280 + 180) % 360 });
    }
    pts.forEach(p => { ctx.beginPath(); ctx.arc(p.x, p.y, 1.3, 0, Math.PI * 2); ctx.fillStyle = `hsla(${p.hue},70%,65%,.85)`; ctx.fill(); });
}} />;

const CrystalP = () => (
    <div style={{ height: 130, background: 'radial-gradient(ellipse,#0a0a1a,#0f172a)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ animation: 'u-cSp 4s linear infinite, u-cGl 2s ease-in-out infinite' }}>
            <svg viewBox="0 0 60 85" width="60" height="85">
                <polygon points="30,0 55,22 47,65 13,65 5,22" fill="rgba(99,102,241,.12)" stroke="#818cf8" strokeWidth="1.5" />
                <polygon points="30,0 55,22 30,14" fill="rgba(139,92,246,.35)" stroke="#a78bfa" strokeWidth="1" />
                <polygon points="30,0 5,22 30,14" fill="rgba(99,102,241,.28)" stroke="#818cf8" strokeWidth="1" />
                <polygon points="30,65 47,65 30,85" fill="rgba(139,92,246,.4)" stroke="#a78bfa" strokeWidth="1" />
                <polygon points="30,65 13,65 30,85" fill="rgba(99,102,241,.35)" stroke="#818cf8" strokeWidth="1" />
            </svg>
        </div>
    </div>
);

const SolarP = () => (
    <div style={{ height: 130, background: '#0f172a', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', width: 120, height: 120 }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 12, height: 12, borderRadius: '50%', background: '#f59e0b', animation: 'u-sun 1.5s ease-in-out infinite' }} />
            {[{ s: 28, c: '#60a5fa', d: '3.5s', sz: 4 }, { s: 42, c: '#fc8181', d: '6s', sz: 5 }, { s: 58, c: '#10b981', d: '10s', sz: 4 }, { s: 74, c: '#c084fc', d: '16s', sz: 5 }].map(({ s, c, d, sz }, i) => (
                <div key={i} style={{ position: 'absolute', top: '50%', left: '50%', width: s, height: s, marginLeft: -s / 2, marginTop: -s / 2, border: '1px dashed rgba(255,255,255,.12)', borderRadius: '50%', animation: `u-o${i + 1} ${d} linear infinite` }}>
                    <div style={{ position: 'absolute', top: -sz / 2, left: '50%', marginLeft: -sz / 2, width: sz, height: sz, borderRadius: '50%', background: c, boxShadow: `0 0 5px ${c}` }} />
                </div>
            ))}
        </div>
    </div>
);

const GalaxyP = () => {
    const stars = useRef(Array.from({ length: 100 }, (_, i) => {
        const arm = i % 3, dist = Math.random() * 50 + 5;
        return { dist, angle: (arm * Math.PI * 2 / 3) + dist * .09 + (Math.random() - .5) * .5, size: Math.random() * 1.4 + .4, hue: 180 + Math.random() * 120, ph: Math.random() * Math.PI * 2 };
    }));
    return <CV draw={(ctx, cv, t) => {
        const [cx, cy] = [cv.width / 2, cv.height / 2];
        ctx.fillStyle = 'rgba(15,23,42,.25)'; ctx.fillRect(0, 0, cv.width, cv.height);
        stars.current.forEach(s => {
            const a = s.angle + t * .006, x = cx + s.dist * Math.cos(a), y = cy + s.dist * Math.sin(a) * .38;
            ctx.beginPath(); ctx.arc(x, y, s.size, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${s.hue},80%,75%,${.5 + .5 * Math.sin(t * .05 + s.ph)})`; ctx.fill();
        });
    }} />;
};

const NebulaP = () => (
    <div style={{ height: 130, background: '#030712', position: 'relative', overflow: 'hidden', borderRadius: 0 }}>
        {[{ a: 'u-n1', c: 'radial-gradient(ellipse,rgba(99,102,241,.6),rgba(139,92,246,.3),transparent)', d: '3.5s' }, { a: 'u-n2', c: 'radial-gradient(ellipse,rgba(16,185,129,.5),rgba(6,182,212,.25),transparent)', d: '5s' }, { a: 'u-n3', c: 'radial-gradient(ellipse,rgba(249,115,22,.45),rgba(239,68,68,.25),transparent)', d: '4s' }].map(({ a, c, d }, i) => (
            <div key={i} style={{ position: 'absolute', width: '100%', height: '100%', background: c, backgroundSize: '70% 70%', backgroundRepeat: 'no-repeat', backgroundPosition: '50% 50%', animation: `${a} ${d} ease-in-out infinite`, filter: 'blur(5px)' }} />
        ))}
        {[...Array(10)].map((_, i) => <div key={i} style={{ position: 'absolute', width: 1.5, height: 1.5, borderRadius: '50%', background: '#fff', top: `${8 + i * 9}%`, left: `${(i * 11) % 95}%`, animation: 'u-tw 2s ease-in-out infinite', animationDelay: `${i * .2}s` }} />)}
    </div>
);

const DNAP = () => (
    <div style={{ height: 130, background: '#0f172a', display: 'flex', justifyContent: 'center', alignItems: 'center', perspective: 250, overflow: 'hidden' }}>
        <div style={{ transformStyle: 'preserve-3d', animation: 'u-dna 4s linear infinite', display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[['#6366f1', '#ef4444'], ['#8b5cf6', '#f59e0b'], ['#06b6d4', '#10b981'], ['#a78bfa', '#fb923c'], ['#818cf8', '#f87171']].map(([c1, c2], i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', transform: `rotateY(${i * 36}deg)` }}>
                    <div style={{ width: 9, height: 9, borderRadius: '50%', background: c1, boxShadow: `0 0 5px ${c1}` }} />
                    <div style={{ width: 32, height: 2, background: `linear-gradient(90deg,${c1},${c2})`, opacity: .8 }} />
                    <div style={{ width: 9, height: 9, borderRadius: '50%', background: c2, boxShadow: `0 0 5px ${c2}` }} />
                </div>
            ))}
        </div>
    </div>
);

const BlobP = () => (
    <div style={{ height: 130, background: '#0f172a', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: 72, height: 72, animation: 'u-blob 4s ease-in-out infinite, u-bC 6s ease-in-out infinite', boxShadow: '0 0 20px rgba(99,102,241,.5)' }} />
    </div>
);

const MatriceP = () => {
    const pts = useRef([...Array(5)].flatMap((_, i) => [...Array(5)].map((_, j) => ({ gx: i - 2, gy: j - 2 }))));
    return <CV draw={(ctx, cv, t) => {
        const [cx, cy] = [cv.width / 2, cv.height / 2];
        ctx.fillStyle = '#0f172a'; ctx.fillRect(0, 0, cv.width, cv.height);
        const rY = t * .016, rX = Math.sin(t * .009) * .38;
        pts.current.forEach(({ gx, gy }) => {
            const gz = Math.sin(gx * .8 + t * .05) * Math.cos(gy * .8 + t * .04) * 1.5;
            const x1 = gx * Math.cos(rY) - gz * Math.sin(rY), z1 = gx * Math.sin(rY) + gz * Math.cos(rY);
            const y1 = gy * Math.cos(rX) - z1 * Math.sin(rX), z2 = gy * Math.sin(rX) + z1 * Math.cos(rX);
            const sc = 14, p = 300 / (300 + z2 * sc);
            ctx.beginPath(); ctx.arc(cx + x1 * sc * p, cy + y1 * sc * p, 2.5 * p, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(74,222,128,${.3 + Math.max(0, (gz + 1.5) / 3) * .7})`; ctx.fill();
        });
    }} />;
};

const CubeExP = () => (
    <div style={{ height: 130, background: '#0f172a', display: 'flex', justifyContent: 'center', alignItems: 'center', perspective: 200 }}>
        <div style={{ width: 44, height: 44, transformStyle: 'preserve-3d', animation: 'u-cG 5s linear infinite', position: 'relative' }}>
            {[['u-fF', 'rotateY(0) translateZ(22px)', '#6366f1'], ['u-fBk', 'rotateY(180deg) translateZ(22px)', '#8b5cf6'], ['u-fR', 'rotateY(90deg) translateZ(22px)', '#06b6d4'], ['u-fL', 'rotateY(-90deg) translateZ(22px)', '#10b981'], ['u-fT', 'rotateX(90deg) translateZ(22px)', '#f97316'], ['u-fBt', 'rotateX(-90deg) translateZ(22px)', '#ef4444']].map(([a, tr, c], i) => (
                <div key={i} style={{ position: 'absolute', width: 44, height: 44, background: `${c}22`, border: `1px solid ${c}88`, transform: tr, animation: `${a} 3s ease-in-out infinite`, animationDelay: `${i * .1}s` }} />
            ))}
        </div>
    </div>
);

const PortalP = () => (
    <div style={{ height: 130, background: '#030712', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'relative', width: 100, height: 100, animation: 'u-pG 2s ease-in-out infinite' }}>
            {[{ s: 100, a: 'u-p1', d: '4s', c: 'conic-gradient(from 0deg,#6366f1,#8b5cf6,#06b6d4,#10b981,#6366f1)' }, { s: 74, a: 'u-p2', d: '3s', c: 'conic-gradient(from 0deg,#f59e0b,#ef4444,#8b5cf6,#6366f1,#f59e0b)' }, { s: 50, a: 'u-p1', d: '2s', c: 'conic-gradient(from 0deg,#06b6d4,#8b5cf6,#f97316,#06b6d4)' }].map(({ s, a, d, c }, i) => (
                <div key={i} style={{ position: 'absolute', top: '50%', left: '50%', width: s, height: s, marginLeft: -s / 2, marginTop: -s / 2, borderRadius: '50%', background: c, animation: `${a} ${d} linear infinite`, filter: `blur(${i}px)`, opacity: .9 }} />
            ))}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 18, height: 18, borderRadius: '50%', background: 'radial-gradient(#fff,#a78bfa,transparent)', boxShadow: '0 0 12px #a78bfa' }} />
        </div>
    </div>
);


const DroneP = () => (
    <div style={{ height: 130, background: '#020617', display: 'flex', justifyContent: 'center', alignItems: 'center', perspective: 400 }}>
        <div style={{ position: 'relative', width: 40, height: 40, background: 'rgba(56,189,248,.1)', border: '1px solid #38bdf8', animation: 'u-rAn 2s ease-in-out infinite' }}>
            {[...Array(4)].map((_,i)=><div key={i} style={{ position:'absolute', width:15, height:2, background:'#38bdf8', left:i%2?40:-15, top:i<2?-5:45 }} />)}
        </div>
    </div>
);
const WeaverP = () => <CV draw={(ctx, cv, t) => {
    ctx.fillStyle = '#030712'; ctx.fillRect(0,0,cv.width,cv.height);
    const cx=cv.width/2, cy=cv.height/2;
    for(let i=0; i<30; i++) {
        const a=t*.02+i*.4, r=20+Math.sin(t*.05+i)*20;
        ctx.fillStyle = i%2?'#a78bfa':'#6366f1';
        ctx.beginPath(); ctx.arc(cx+Math.cos(a)*r, cy+Math.sin(a)*r, 1.5, 0, Math.PI*2); ctx.fill();
    }
}} />;
const BlackHoleP = () => <CV draw={(ctx, cv, t) => {
    ctx.fillStyle = '#000'; ctx.fillRect(0,0,cv.width,cv.height);
    const cx=cv.width/2, cy=cv.height/2;
    ctx.fillStyle='#fff'; ctx.beginPath(); ctx.arc(cx,cy,20,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#000'; ctx.beginPath(); ctx.arc(cx,cy,18,0,Math.PI*2); ctx.fill();
    for(let i=0; i<40; i++) {
        const a=t*.01+i*.5, r=22+i*0.8;
        ctx.fillStyle='rgba(255,255,255,'+(1-i/40)+')';
        ctx.fillRect(cx+Math.cos(a)*r, cy+Math.sin(a)*r*.4, 1.5, 1.5);
    }
}} />;
const JellyP = () => (
    <div style={{ height: 130, background: '#020617', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: 40, height: 25, background: 'rgba(192,132,252,.4)', borderRadius: '20px 20px 5px 5px', animation: 'u-asF 2s infinite' }} />
    </div>
);
const GearsP = () => (
    <div style={{ height: 130, background: '#1c1917', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: 50, height: 50, borderRadius:'50%', border:'4px dashed #fbbf24', animation: 'u-o1 3s linear infinite' }} />
    </div>
);
const PrismP = () => (
    <div style={{ height: 130, background: '#050505', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: 0, height: 0, borderLeft:'25px solid transparent', borderRight:'25px solid transparent', borderBottom:'45px solid rgba(255,255,255,.3)', animation: 'u-o1 4s linear infinite' }} />
    </div>
);
const MoleculeP = () => (
    <div style={{ height: 130, background: '#064e3b', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: 30, height: 30, borderRadius:'50%', background: '#ef4444', animation: 'u-aPu 1.5s infinite' }} />
    </div>
);
const VortexP = () => <CV draw={(ctx, cv, t) => {
    ctx.fillStyle = '#000'; ctx.fillRect(0,0,cv.width,cv.height);
    const cx=cv.width/2, cy=cv.height/2;
    for(let i=0; i<15; i++) {
        const r= (i*8 + t)%100;
        ctx.strokeStyle = `rgba(99,102,241,${1-r/100})`;
        ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.stroke();
    }
}} />;
const HeartP = () => (
    <div style={{ height: 130, background: '#111', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ fontSize: 40, animation: 'u-aPu .6s infinite' }}>🫀</div>
    </div>
);
const HyperP = () => <CV draw={(ctx, cv, t) => {
    ctx.fillStyle = '#000'; ctx.fillRect(0,0,cv.width,cv.height);
    for(let i=0; i<50; i++) {
        const x= (Math.sin(i)*1000 + t*20)%cv.width, y = (Math.cos(i)*1000)%cv.height;
        ctx.fillStyle='#60a5fa'; ctx.fillRect(x,y,2,1);
    }
}} />;
const CaveP = () => (
    <div style={{ height: 130, background: '#083344', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: 60, height: 20, background: '#22d3ee', transform:'rotateX(45deg)' }} />
    </div>
);
const PlasmaP = () => <CV draw={(ctx, cv, t) => {
    ctx.fillStyle = '#111'; ctx.fillRect(0,0,cv.width,cv.height);
    const cx=cv.width/2, cy=cv.height/2;
    ctx.strokeStyle = '#e879f9'; ctx.beginPath(); ctx.arc(cx,cy,40,0,Math.PI*2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx+Math.cos(t*.1)*40, cy+Math.sin(t*.1)*40); ctx.stroke();
}} />;
const Galaxy2P = () => <CV draw={(ctx, cv, t) => {
    ctx.fillStyle = '#020617'; ctx.fillRect(0,0,cv.width,cv.height);
    const cx=cv.width/2, cy=cv.height/2;
    const g=ctx.createRadialGradient(cx,cy,0,cx,cy,30); g.addColorStop(0,'#fff'); g.addColorStop(1,'transparent');
    ctx.fillStyle=g; ctx.beginPath(); ctx.arc(cx,cy,30,0,Math.PI*2); ctx.fill();
}} />;
const StatueP = () => (
    <div style={{ height: 130, background: '#0f172a', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: 30, height: 50, background: '#94a3b8', borderRadius: '40% 40% 5% 5%', animation: 'u-tw 2s infinite' }} />
    </div>
);
const NeuralP = () => <CV draw={(ctx, cv, t) => {
    ctx.fillStyle = '#0f172a'; ctx.fillRect(0,0,cv.width,cv.height);
    for(let i=0; i<10; i++) {
        const x= (Math.sin(i*2)*100+100), y = (Math.cos(i*3)*60+65);
        ctx.fillStyle='#06b6d4'; ctx.beginPath(); ctx.arc(x,y,2,0,Math.PI*2); ctx.fill();
    }
}} />;

const PREVIEWS_MAP = { 
    robot: RobotP, alien: AlienP, dragon: DragonP, astro: AstroP, 
    cyberdrone: DroneP, jellyfish: JellyP, cyberheart: HeartP, statue: StatueP,
    tesseract: TesseractP, crystal: CrystalP, weaver: WeaverP, prism: PrismP, molecule: MoleculeP,
    solar: SolarP, galaxy: GalaxyP, nebula: NebulaP, blackhole: BlackHoleP, vortex: VortexP, galaxy2: Galaxy2P, dna: DNAP, 
    blob: BlobP, matrix3d: MatriceP, cube: CubeExP, portal: PortalP, 
    gears: GearsP, hyperspace: HyperP, cave: CaveP, plasma: PlasmaP, neuralweb: NeuralP
};


const CATS = [
    { id: 'all', en: 'All', fr: 'Tous' },
    { id: 'chars', en: '🤖 Characters', fr: '🤖 Personnages' },
    { id: 'geo4d', en: '💎 Geometry 4D', fr: '💎 Géométrie 4D' },
    { id: 'space', en: '🌌 Space', fr: '🌌 Espace' },
    { id: 'interact', en: '⚡ Interactive', fr: '⚡ Interactif' }
];


// ── Injectable codes are loaded at runtime from figure_data.json ──
const CODES = {};
let _codesLoaded = false;
const loadCodes = () => {
    if (_codesLoaded) return;
    _codesLoaded = true;
    fetch('./figure_data.json').then(r => r.json()).then(data => {
        // figure_data.json is an array of { id, code, ... }
        if (Array.isArray(data)) {
            data.forEach(f => { if (f.id && f.code) CODES[f.id] = f.code; });
        } else {
            // fallback: object map
            Object.assign(CODES, data);
        }
    }).catch(() => {});
};

const Universe3DLab = ({ onSelect, onInject, currentCode, editorRef, isFr }) => {
    const [cat, setCat] = useState('all');
    const [injected, setInjected] = useState(null);
    const [injectedEmbed, setInjectedEmbed] = useState(null);

    useEffect(() => {
        loadCodes();
        let s = document.getElementById('u3d-kf');
        if (!s) {
            s = document.createElement('style');
            s.id = 'u3d-kf';
            s.textContent = KF;
            document.head.appendChild(s);
        }
    }, []);

    const filtered = cat === 'all' ? FIGURES : FIGURES.filter(f => f.cat === cat);

    const inject = (fig) => {
        let code = CODES[fig.id];
        if (!code) {
            code = `const App = () => <div style={{color:'#fff',padding:40,fontSize:40}}>${fig.icon} ${fig.en}</div>;`;
        } else {
            const match = code.match(/const ([A-Z][A-Za-z0-9]+)\s*=\s*\(/);
            const compName = match ? match[1] : null;
            if (compName && compName !== 'App') {
                code = code + `\nconst App = ${compName};`;
            }
        }
        onSelect(code);
        setInjected(fig.id);
        setTimeout(() => setInjected(null), 2000);
    };

    const embedInApp = (fig) => {
        if (!onInject) return;
        let code = CODES[fig.id];
        if (!code) {
            code = `const App = () => <div style={{color:'#fff',padding:40,fontSize:40}}>${fig.icon} ${fig.en}</div>;`;
        }
        onInject(fig, code);
        setInjectedEmbed(fig.id);
        setTimeout(() => setInjectedEmbed(null), 2000);
    };

    return (
        <div style={{ padding: 12, background: '#0f172a', color: '#f8fafc', minHeight: '100%' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, padding: '8px 0', borderBottom: '1px solid rgba(99,102,241,.2)' }}>
                <span style={{ fontSize: 16 }}>🌌</span>
                <span style={{ fontWeight: 800, fontSize: 13, color: '#818cf8', letterSpacing: 1 }}>
                    {isFr ? 'UNIVERS 3D/4D' : '3D/4D UNIVERSE'}
                </span>
                <span style={{ marginLeft: 'auto', fontSize: 10, color: '#475569', background: '#1e293b', padding: '2px 7px', borderRadius: 10 }}>
                    {FIGURES.length} {isFr ? 'Modèles 3D' : '3D Models'}
                </span>
            </div>

            {/* Category filter */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 12 }}>
                {CATS.map(c => (
                    <button key={c.id} onClick={() => setCat(c.id)} style={{
                        padding: '4px 10px', borderRadius: 20, border: '1px solid',
                        borderColor: cat === c.id ? '#6366f1' : '#1e293b',
                        background: cat === c.id ? 'rgba(99,102,241,.2)' : 'transparent',
                        color: cat === c.id ? '#818cf8' : '#64748b',
                        cursor: 'pointer', fontSize: 10, fontWeight: 700, transition: 'all .2s'
                    }}>{isFr ? c.fr : c.en}</button>
                ))}
            </div>

            {/* Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {filtered.map(fig => {
                    const PreviewComp = PREVIEWS_MAP[fig.id];
                    const isInj = injected === fig.id;
                    const isEmb = injectedEmbed === fig.id;
                    return (
                        <div key={fig.id} style={{
                            background: '#1e293b', borderRadius: 10, overflow: 'hidden',
                            border: `1px solid ${isInj ? '#10b981' : 'rgba(255,255,255,.06)'}`,
                            transition: 'border-color .3s, box-shadow .3s',
                            boxShadow: isInj ? '0 0 12px rgba(16,185,129,.3)' : 'none'
                        }}>
                            {/* Live Preview */}
                            <div style={{ overflow: 'hidden' }}>
                                {PreviewComp
                                    ? <LazyPreview Component={PreviewComp} icon={fig.icon} color={fig.tc} />
                                    : <div style={{ height: 130, background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40 }}>{fig.icon}</div>
                                }
                            </div>
                            {/* Card footer */}
                            <div style={{ padding: '8px 10px 10px' }}>
                                <div style={{ fontSize: 11, fontWeight: 700, color: '#f1f5f9', marginBottom: 2 }}>
                                    {fig.icon} {isFr ? fig.fr : fig.en}
                                </div>
                                <div style={{ fontSize: 10, color: fig.tc, fontWeight: 600, marginBottom: 8 }}>
                                    {fig.tech}
                                </div>
                                {/* Two action buttons: Load + Inject */}
                                <div style={{ display: 'flex', gap: 6 }}>
                                    {/* LOAD button – replaces editor content */}
                                    <button
                                        onClick={() => inject(fig)}
                                        title={isFr ? 'Charger le modèle (remplace le code)' : 'Load model (replaces code)'}
                                        style={{
                                            flex: 1,
                                            padding: '7px 0',
                                            borderRadius: 6,
                                            border: 'none',
                                            background: isInj
                                                ? '#10b981'
                                                : 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                                            color: '#fff',
                                            fontWeight: 700,
                                            fontSize: 10,
                                            cursor: 'pointer',
                                            transition: 'all .25s',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: 4
                                        }}
                                    >
                                        {isInj ? '✓' : '📂'} {isFr ? 'Load' : 'Load'}
                                    </button>

                                    {/* INJECT button – embeds into existing app */}
                                    <button
                                        onClick={() => embedInApp(fig)}
                                        title={isFr ? 'Injecter dans l\'app existante (ajout automatique)' : 'Inject into existing app (auto-append)'}
                                        style={{
                                            flex: 1,
                                            padding: '7px 0',
                                            borderRadius: 6,
                                            border: isEmb ? 'none' : '1px solid rgba(16,185,129,0.5)',
                                            background: isEmb
                                                ? '#10b981'
                                                : 'linear-gradient(135deg,rgba(16,185,129,0.15),rgba(5,150,105,0.15))',
                                            color: isEmb ? '#fff' : '#10b981',
                                            fontWeight: 700,
                                            fontSize: 10,
                                            cursor: 'pointer',
                                            transition: 'all .25s',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: 4
                                        }}
                                    >
                                        {isEmb ? '✓' : '➕'} {isFr ? 'Inject' : 'Inject'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Universe3DLab;