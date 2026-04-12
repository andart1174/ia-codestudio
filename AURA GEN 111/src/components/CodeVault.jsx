import VAULT_EXTRA from './CodeVaultExtra';
import VAULT_EXTRA2 from './CodeVaultExtra2';

const CATEGORIES = [
  { id: 'all', label: 'All', labelFr: 'Tout', emoji: '🧰' },
  { id: 'calc', label: 'Calculators', labelFr: 'Calculatrices', emoji: '🧮' },
  { id: 'anim', label: 'Animations', labelFr: 'Animations', emoji: '🎨' },
  { id: 'data', label: 'Data & Charts', labelFr: 'Données', emoji: '📊' },
  { id: 'util', label: 'Utilities', labelFr: 'Utilitaires', emoji: '🔧' },
  { id: 'game', label: 'Mini-Games', labelFr: 'Mini-Jeux', emoji: '🎮' },
  { id: 'api', label: 'Smart Data', labelFr: 'Données Smart', emoji: '🌐' },
];

const VAULT_ITEMS = [
  // ─── CALCULATOARE ───
  {
    id: 'calculator',
    cat: 'calc',
    name: 'Multifunctional Calculator',
    nameFr: 'Calculatrice Multifonction',
    icon: '🖩',
    tags: ['Functional', 'State'],
    code: `const App = () => {
  const [display, setDisplay] = React.useState('0');
  const [prev, setPrev] = React.useState(null);
  const [op, setOp] = React.useState(null);
  const [reset, setReset] = React.useState(false);
  const [history, setHistory] = React.useState([]);

  const input = (v) => {
    if (reset) { setDisplay(String(v)); setReset(false); return; }
    setDisplay(display === '0' ? String(v) : display + v);
  };
  const setOperator = (o) => {
    setPrev(parseFloat(display)); setOp(o); setReset(true);
  };
  const calculate = () => {
    if (!op || prev === null) return;
    const cur = parseFloat(display);
    let result = op === '+' ? prev + cur : op === '-' ? prev - cur : op === '×' ? prev * cur : cur !== 0 ? prev / cur : 'Error';
    const entry = prev + ' ' + op + ' ' + cur + ' = ' + result;
    setHistory(h => [entry, ...h.slice(0, 4)]);
    setDisplay(String(result)); setPrev(null); setOp(null); setReset(true);
  };
  const clear = () => { setDisplay('0'); setPrev(null); setOp(null); setReset(false); };
  const toggleSign = () => setDisplay(String(parseFloat(display) * -1));
  const percent = () => setDisplay(String(parseFloat(display) / 100));

  const btn = (label, action, bg = '#333', span = 1) => (
    <button key={label} onClick={action} style={{ background: bg, color: '#fff', border: 'none', borderRadius: '50%', width: span > 1 ? '100%' : '64px', height: '64px', fontSize: '20px', fontWeight: '600', cursor: 'pointer', gridColumn: span > 1 ? 'span 2' : 'auto', borderRadius: span > 1 ? '32px' : '50%', textAlign: 'left', paddingLeft: span > 1 ? '24px' : '0' }}>
      {label}
    </button>
  );

  return (
    <div style={{ fontFamily: '-apple-system, sans-serif', background: '#000', borderRadius: '40px', padding: '20px', width: '280px', margin: '0 auto', boxShadow: '0 30px 80px rgba(0,0,0,0.6)' }}>
      {history.length > 0 && (
        <div style={{ marginBottom: '8px', padding: '0 8px' }}>
          {history.slice(0,2).map((h,i) => <div key={i} style={{ color: '#555', fontSize: '11px', textAlign: 'right' }}>{h}</div>)}
        </div>
      )}
      <div style={{ color: '#fff', fontSize: display.length > 9 ? '32px' : '48px', fontWeight: '300', textAlign: 'right', padding: '10px 8px 20px', letterSpacing: '-1px', minHeight: '70px', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
        {op && <span style={{ color: '#ff9f0a', marginRight: '8px', fontSize: '28px' }}>{op}</span>}
        {display}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', alignItems: 'center' }}>
        {btn('AC', clear, '#a5a5a5')}
        {btn('+/-', toggleSign, '#a5a5a5')}
        {btn('%', percent, '#a5a5a5')}
        {btn('÷', () => setOperator('÷'), op === '÷' ? '#fff' : '#ff9f0a')}
        {[7,8,9].map(n => btn(n, () => input(n)))}
        {btn('×', () => setOperator('×'), op === '×' ? '#fff' : '#ff9f0a')}
        {[4,5,6].map(n => btn(n, () => input(n)))}
        {btn('-', () => setOperator('-'), op === '-' ? '#fff' : '#ff9f0a')}
        {[1,2,3].map(n => btn(n, () => input(n)))}
        {btn('+', () => setOperator('+'), op === '+' ? '#fff' : '#ff9f0a')}
        {btn(0, () => input(0), '#333', 2)}
        {btn('.', () => { if (!display.includes('.')) setDisplay(display + '.'); })}
        {btn('=', calculate, '#ff9f0a')}
      </div>
    </div>
  );
};`,
  },
  {
    id: 'currency',
    cat: 'calc',
    name: 'Currency Converter',
    nameFr: 'Convertisseur Devise',
    icon: '💱',
    tags: ['State', 'Functional'],
    code: `const App = () => {
  const rates = { USD: 1, EUR: 0.92, GBP: 0.79, RON: 4.57, JPY: 149.5, CAD: 1.36, CHF: 0.89, AUD: 1.53 };
  const [amount, setAmount] = React.useState('100');
  const [from, setFrom] = React.useState('USD');
  const [to, setTo] = React.useState('EUR');
  const result = (parseFloat(amount) / rates[from] * rates[to]).toFixed(2);
  const currencies = Object.keys(rates);
  const sel = (v, s) => <select value={v} onChange={e => s(e.target.value)} style={{ padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '15px', fontWeight: '700', background: '#f8fafc', cursor: 'pointer', outline: 'none' }}>{currencies.map(c => <option key={c}>{c}</option>)}</select>;
  return (
    <div style={{ fontFamily: 'system-ui', background: '#fff', borderRadius: '24px', padding: '32px', maxWidth: '360px', margin: '0 auto', boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}>
      <h2 style={{ margin: '0 0 24px', fontSize: '22px', fontWeight: '900', color: '#0f172a' }}>💱 Currency Converter</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} style={{ padding: '14px', border: '1.5px solid #e2e8f0', borderRadius: '12px', fontSize: '24px', fontWeight: '700', color: '#0f172a', outline: 'none', textAlign: 'center' }} />
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {sel(from, setFrom)}
          <button onClick={() => { const t = from; setFrom(to); setTo(t); }} style={{ padding: '10px 14px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '18px', cursor: 'pointer' }}>⇄</button>
          {sel(to, setTo)}
        </div>
        <div style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: '16px', padding: '24px', textAlign: 'center', color: '#fff' }}>
          <div style={{ fontSize: '13px', opacity: 0.8, marginBottom: '8px' }}>{amount} {from} =</div>
          <div style={{ fontSize: '40px', fontWeight: '900', letterSpacing: '-1px' }}>{isNaN(result) ? '—' : result}</div>
          <div style={{ fontSize: '18px', fontWeight: '600', opacity: 0.9 }}>{to}</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '8px' }}>
          {currencies.filter(c => c !== from && c !== to).slice(0,4).map(c => (
            <div key={c} style={{ background: '#f8fafc', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '700' }}>{c}</div>
              <div style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>{(parseFloat(amount)/rates[from]*rates[c]).toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};`,
  },
  {
    id: 'bmi',
    cat: 'calc',
    name: 'BMI Calculator',
    nameFr: 'Calculateur IMC',
    icon: '⚖️',
    tags: ['State', 'Functional'],
    code: `const App = () => {
  const [height, setHeight] = React.useState(175);
  const [weight, setWeight] = React.useState(70);
  const bmi = (weight / ((height / 100) ** 2)).toFixed(1);
  const cat = bmi < 18.5 ? { label: 'Underweight', color: '#3b82f6', pct: 15 } : bmi < 25 ? { label: 'Normal', color: '#10b981', pct: 40 } : bmi < 30 ? { label: 'Overweight', color: '#f59e0b', pct: 65 } : { label: 'Obese', color: '#ef4444', pct: 88 };
  const sl = (label, val, set, min, max, unit) => (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span style={{ fontSize: '14px', fontWeight: '600', color: '#64748b' }}>{label}</span>
        <span style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>{val} {unit}</span>
      </div>
      <input type="range" min={min} max={max} value={val} onChange={e => set(+e.target.value)} style={{ width: '100%', accentColor: '#6366f1' }} />
    </div>
  );
  return (
    <div style={{ fontFamily: 'system-ui', background: '#fff', borderRadius: '24px', padding: '32px', maxWidth: '360px', margin: '0 auto', boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}>
      <h2 style={{ margin: '0 0 24px', fontSize: '22px', fontWeight: '900', color: '#0f172a' }}>⚖️ BMI Calculator</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {sl('Height', height, setHeight, 140, 220, 'cm')}
        {sl('Weight', weight, setWeight, 30, 200, 'kg')}
        <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '56px', fontWeight: '900', color: cat.color, letterSpacing: '-2px' }}>{bmi}</div>
          <div style={{ fontSize: '18px', fontWeight: '700', color: cat.color, marginBottom: '16px' }}>{cat.label}</div>
          <div style={{ background: '#e2e8f0', borderRadius: '99px', height: '10px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ width: cat.pct + '%', height: '100%', background: cat.color, borderRadius: '99px', transition: 'width 0.4s' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '11px', color: '#94a3b8', fontWeight: '600' }}>
            <span>Underweight</span><span>Normal</span><span>Overweight</span><span>Obese</span>
          </div>
        </div>
      </div>
    </div>
  );
};`,
  },
  {
    id: 'unitconv',
    cat: 'calc',
    name: 'Unit Converter',
    nameFr: 'Convertisseur Unités',
    icon: '📐',
    tags: ['State', 'Functional'],
    code: `const App = () => {
  const cats = {
    Length: { units: ['km','m','cm','mm','miles','yards','feet','inches'], factors: [1000,1,0.01,0.001,1609.34,0.9144,0.3048,0.0254] },
    Weight: { units: ['kg','g','mg','lbs','oz','stones'], factors: [1,0.001,0.000001,0.453592,0.0283495,6.35029] },
    Temperature: { units: ['°C','°F','K'], factors: null },
  };
  const [cat, setCat] = React.useState('Length');
  const [val, setVal] = React.useState('1');
  const [from, setFrom] = React.useState(0);
  const convert = (toIdx) => {
    const v = parseFloat(val);
    if (isNaN(v)) return '—';
    if (cat === 'Temperature') {
      const c = from === 0 ? v : from === 1 ? (v-32)*5/9 : v-273.15;
      return toIdx === 0 ? c.toFixed(2) : toIdx === 1 ? (c*9/5+32).toFixed(2) : (c+273.15).toFixed(2);
    }
    const { factors } = cats[cat];
    return ((v * factors[from]) / factors[toIdx]).toFixed(4).replace(/\.?0+$/, '');
  };
  const { units } = cats[cat];
  return (
    <div style={{ fontFamily: 'system-ui', background: '#fff', borderRadius: '24px', padding: '28px', maxWidth: '360px', margin: '0 auto', boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}>
      <h2 style={{ margin: '0 0 20px', fontSize: '20px', fontWeight: '900', color: '#0f172a' }}>📐 Unit Converter</h2>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {Object.keys(cats).map(c => <button key={c} onClick={() => { setCat(c); setFrom(0); }} style={{ flex: 1, padding: '8px', borderRadius: '10px', border: 'none', background: cat === c ? '#6366f1' : '#f1f5f9', color: cat === c ? '#fff' : '#64748b', fontWeight: '700', fontSize: '12px', cursor: 'pointer' }}>{c}</button>)}
      </div>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input type="number" value={val} onChange={e => setVal(e.target.value)} style={{ flex: 1, padding: '12px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '20px', fontWeight: '700', outline: 'none' }} />
        <select value={from} onChange={e => setFrom(+e.target.value)} style={{ padding: '12px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontWeight: '700', outline: 'none', cursor: 'pointer' }}>
          {units.map((u,i) => <option key={u} value={i}>{u}</option>)}
        </select>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {units.map((u,i) => i !== from && (
          <div key={u} style={{ display: 'flex', justifyContent: 'space-between', background: '#f8fafc', borderRadius: '10px', padding: '12px 16px' }}>
            <span style={{ color: '#64748b', fontWeight: '600' }}>{u}</span>
            <span style={{ fontWeight: '800', color: '#0f172a' }}>{convert(i)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};`,
  },
  {
    id: 'age',
    cat: 'calc',
    name: 'Age Calculator',
    nameFr: 'Calculateur Âge',
    icon: '🎂',
    tags: ['State', 'Functional'],
    code: `const App = () => {
  const [dob, setDob] = React.useState('1990-06-15');
  const now = new Date();
  const birth = new Date(dob);
  const years = now.getFullYear() - birth.getFullYear() - (now < new Date(now.getFullYear(), birth.getMonth(), birth.getDate()) ? 1 : 0);
  const nextBday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
  if (nextBday < now) nextBday.setFullYear(now.getFullYear() + 1);
  const daysLeft = Math.ceil((nextBday - now) / 86400000);
  const totalDays = Math.floor((now - birth) / 86400000);
  const months = now.getMonth() - birth.getMonth() + 12 * (now.getFullYear() - birth.getFullYear());
  return (
    <div style={{ fontFamily: 'system-ui', background: '#fff', borderRadius: '24px', padding: '32px', maxWidth: '360px', margin: '0 auto', boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}>
      <h2 style={{ margin: '0 0 24px', fontSize: '22px', fontWeight: '900', color: '#0f172a' }}>🎂 Age Calculator</h2>
      <label style={{ fontSize: '13px', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '8px' }}>Date of Birth</label>
      <input type="date" value={dob} onChange={e => setDob(e.target.value)} style={{ width: '100%', boxSizing: 'border-box', padding: '12px', border: '1.5px solid #e2e8f0', borderRadius: '12px', fontSize: '16px', outline: 'none', marginBottom: '24px', color: '#0f172a' }} />
      <div style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', borderRadius: '16px', padding: '24px', color: '#fff', textAlign: 'center', marginBottom: '16px' }}>
        <div style={{ fontSize: '72px', fontWeight: '900', letterSpacing: '-3px', lineHeight: 1 }}>{years}</div>
        <div style={{ fontSize: '18px', opacity: 0.85 }}>years old</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px' }}>
        {[{v: months, l: 'Months'},{v: totalDays.toLocaleString(), l: 'Total Days'},{v: daysLeft, l: 'Days to 🎂'}].map((s,i) => (
          <div key={i} style={{ background: '#f8fafc', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
            <div style={{ fontSize: '22px', fontWeight: '900', color: '#6366f1' }}>{s.v}</div>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600', marginTop: '4px' }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
};`,
  },
  {
    id: 'countdown',
    cat: 'calc',
    name: 'Countdown Timer',
    nameFr: 'Compte à Rebours',
    icon: '⏳',
    tags: ['State', 'Live'],
    code: `const App = () => {
  const [target, setTarget] = React.useState(() => { const d = new Date(); d.setDate(d.getDate()+30); return d.toISOString().slice(0,10); });
  const [now, setNow] = React.useState(new Date());
  React.useEffect(() => { const t = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t); }, []);
  const diff = new Date(target) - now;
  const d = Math.max(0, Math.floor(diff / 86400000));
  const h = Math.max(0, Math.floor((diff % 86400000) / 3600000));
  const m = Math.max(0, Math.floor((diff % 3600000) / 60000));
  const s = Math.max(0, Math.floor((diff % 60000) / 1000));
  const over = diff <= 0;
  const box = (v, l) => (
    <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '16px', padding: '20px 16px', textAlign: 'center', minWidth: '70px' }}>
      <div style={{ fontSize: '42px', fontWeight: '900', letterSpacing: '-2px', lineHeight: 1 }}>{String(v).padStart(2,'0')}</div>
      <div style={{ fontSize: '11px', opacity: 0.7, marginTop: '6px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>{l}</div>
    </div>
  );
  return (
    <div style={{ fontFamily: 'system-ui', background: 'linear-gradient(135deg,#1e1b4b,#312e81)', borderRadius: '24px', padding: '32px', maxWidth: '380px', margin: '0 auto', color: '#fff' }}>
      <h2 style={{ margin: '0 0 8px', fontSize: '22px', fontWeight: '900', textAlign: 'center' }}>⏳ Countdown</h2>
      <p style={{ textAlign: 'center', opacity: 0.7, fontSize: '14px', margin: '0 0 24px' }}>Set your target date</p>
      <input type="date" value={target} onChange={e => setTarget(e.target.value)} style={{ width: '100%', boxSizing: 'border-box', padding: '12px', borderRadius: '12px', border: 'none', background: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: '16px', fontWeight: '700', outline: 'none', marginBottom: '24px', textAlign: 'center', cursor: 'pointer' }} />
      {over ? (
        <div style={{ textAlign: 'center', fontSize: '32px', padding: '20px' }}>🎉 Time's up!</div>
      ) : (
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          {box(d, 'Days')}{box(h, 'Hours')}{box(m, 'Min')}{box(s, 'Sec')}
        </div>
      )}
      <div style={{ marginTop: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '99px', height: '6px', overflow: 'hidden' }}>
        <div style={{ width: over ? '100%' : Math.min(100, 100 - (diff / (30*86400000))*100) + '%', background: over ? '#ef4444' : '#a5b4fc', height: '100%', borderRadius: '99px', transition: 'width 1s' }} />
      </div>
    </div>
  );
};`,
  },

  // ─── ANIMAȚII ───
  {
    id: 'typewriter',
    cat: 'anim',
    name: 'Typewriter Effect',
    nameFr: 'Effet Machine à Écrire',
    icon: '⌨️',
    tags: ['Animated', 'State'],
    code: `const App = () => {
  const phrases = ['Hello, World! 👋','Building the future...','One line at a time.','Code. Create. Inspire. ✨'];
  const [pi, setPi] = React.useState(0);
  const [ci, setCi] = React.useState(0);
  const [del, setDel] = React.useState(false);
  const [blink, setBlink] = React.useState(true);
  const text = phrases[pi].slice(0, ci);
  React.useEffect(() => {
    const t = setTimeout(() => {
      if (!del) { if (ci < phrases[pi].length) setCi(c => c+1); else setTimeout(() => setDel(true), 1200); }
      else { if (ci > 0) setCi(c => c-1); else { setDel(false); setPi(p => (p+1)%phrases.length); } }
    }, del ? 40 : 80);
    return () => clearTimeout(t);
  }, [ci, del, pi]);
  React.useEffect(() => { const t = setInterval(() => setBlink(b => !b), 530); return () => clearInterval(t); }, []);
  return (
    <div style={{ fontFamily: 'system-ui', background: '#0f172a', borderRadius: '20px', padding: '48px 32px', maxWidth: '420px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '24px' }}>Live Preview</div>
      <div style={{ fontSize: '28px', fontWeight: '700', color: '#f8fafc', minHeight: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1.3 }}>
        <span>{text}</span>
        <span style={{ opacity: blink ? 1 : 0, color: '#6366f1', fontWeight: '300', marginLeft: '2px' }}>|</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '32px' }}>
        {phrases.map((_, i) => <div key={i} style={{ width: i === pi ? '24px' : '8px', height: '8px', borderRadius: '4px', background: i === pi ? '#6366f1' : '#334155', transition: 'all 0.3s' }} />)}
      </div>
    </div>
  );
};`,
  },
  {
    id: 'particleburst',
    cat: 'anim',
    name: 'Particle Burst',
    nameFr: 'Explosion Particules',
    icon: '🎆',
    tags: ['Animated', 'Interactive'],
    code: `const App = () => {
  const [particles, setParticles] = React.useState([]);
  const colors = ['#6366f1','#ec4899','#f59e0b','#10b981','#3b82f6','#ef4444','#a855f7'];
  const burst = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left, py = e.clientY - rect.top;
    const newP = Array.from({length: 20}, (_, i) => ({
      id: Date.now() + i, x: px, y: py,
      dx: (Math.random()-0.5)*200, dy: (Math.random()-0.5)*200,
      color: colors[Math.floor(Math.random()*colors.length)],
      size: Math.random()*10+4,
    }));
    setParticles(p => [...p, ...newP]);
    setTimeout(() => setParticles(p => p.filter(x => !newP.find(n => n.id === x.id))), 900);
  };
  return (
    <div onClick={burst} style={{ position: 'relative', background: '#0f172a', borderRadius: '24px', height: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'crosshair', overflow: 'hidden', userSelect: 'none', maxWidth: '420px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', color: '#fff', zIndex: 1, pointerEvents: 'none' }}>
        <div style={{ fontSize: '48px', marginBottom: '12px' }}>🎆</div>
        <div style={{ fontSize: '18px', fontWeight: '700' }}>Click anywhere!</div>
        <div style={{ fontSize: '13px', color: '#64748b', marginTop: '8px' }}>Particle burst effect</div>
      </div>
      {particles.map(p => (
        <div key={p.id} style={{
          position: 'absolute', left: p.x, top: p.y,
          width: p.size, height: p.size, borderRadius: '50%',
          background: p.color, pointerEvents: 'none', zIndex: 2,
          animation: 'particleBurst 0.9s ease-out forwards',
          transform: 'translate(-50%,-50%)',
        }} />
      ))}
      <style>{'.particleBurst{animation:particleBurst 0.9s ease-out forwards}@keyframes particleBurst{0%{opacity:1;transform:translate(-50%,-50%) scale(1)}100%{opacity:0;transform:translate(calc(-50% + var(--dx)),calc(-50% + var(--dy))) scale(0)}}'}</style>
    </div>
  );
};`,
  },
  {
    id: 'gradientorb',
    cat: 'anim',
    name: 'Gradient Orb / Blob',
    nameFr: 'Orbe Dégradé',
    icon: '🫧',
    tags: ['Animated', 'CSS'],
    code: `const App = () => {
  const style = \`
    @keyframes blobMove1 { 0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%} 50%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%} }
    @keyframes blobMove2 { 0%,100%{border-radius:40% 60% 60% 40%/60% 40% 60% 40%} 50%{border-radius:60% 40% 40% 60%/40% 60% 40% 60%} }
    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }
    @keyframes rotate { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  \`;
  return (
    <div style={{ fontFamily: 'system-ui', background: '#0a0a0a', borderRadius: '24px', padding: '40px', maxWidth: '420px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px', minHeight: '300px', justifyContent: 'center' }}>
      <style>{style}</style>
      <div style={{ position: 'relative', width: '200px', height: '200px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,#6366f1,#ec4899,#f59e0b)', animation: 'blobMove1 8s ease-in-out infinite, float 5s ease-in-out infinite', filter: 'blur(0px)' }} />
        <div style={{ position: 'absolute', inset: '20px', background: 'linear-gradient(135deg,#0ea5e9,#10b981)', animation: 'blobMove2 6s ease-in-out infinite reverse', opacity: 0.7 }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>✨</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '20px', fontWeight: '800', color: '#f8fafc', marginBottom: '8px' }}>Gradient Orb</div>
        <div style={{ fontSize: '13px', color: '#64748b' }}>Pure CSS blob animation</div>
      </div>
    </div>
  );
};`,
  },
  {
    id: 'neonglow',
    cat: 'anim',
    name: 'Neon Glow Button',
    nameFr: 'Bouton Néon',
    icon: '💡',
    tags: ['Animated', 'Interactive'],
    code: `const App = () => {
  const [active, setActive] = React.useState(0);
  const btns = [
    { label: 'CYBER', color: '#00f5ff', shadow: '#00f5ff' },
    { label: 'NEON', color: '#ff00ff', shadow: '#ff00ff' },
    { label: 'LASER', color: '#39ff14', shadow: '#39ff14' },
    { label: 'FIRE', color: '#ff6600', shadow: '#ff6600' },
  ];
  const style = \`
    @keyframes neonPulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
    @keyframes scanline { 0%{top:-10%} 100%{top:110%} }
  \`;
  return (
    <div style={{ fontFamily: "'Courier New', monospace", background: '#0d0d0d', borderRadius: '24px', padding: '40px', maxWidth: '420px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px' }}>
      <style>{style}</style>
      <div style={{ fontSize: '13px', color: '#444', letterSpacing: '4px', textTransform: 'uppercase' }}>Select Style</div>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {btns.map((b,i) => (
          <button key={i} onClick={() => setActive(i)} style={{
            padding: '14px 28px', background: 'transparent', fontFamily: 'inherit',
            color: b.color, border: \`2px solid \${b.color}\`, borderRadius: '4px',
            fontSize: '14px', fontWeight: '800', letterSpacing: '3px', cursor: 'pointer',
            boxShadow: active === i ? \`0 0 20px \${b.shadow}, 0 0 40px \${b.shadow}, inset 0 0 20px rgba(255,255,255,0.05)\` : 'none',
            animation: active === i ? 'neonPulse 1.5s ease-in-out infinite' : 'none',
            transition: 'box-shadow 0.3s',
          }}>{b.label}</button>
        ))}
      </div>
      <div style={{ position: 'relative', overflow: 'hidden', padding: '20px 40px', border: \`1px solid \${btns[active].color}44\`, borderRadius: '8px', textAlign: 'center' }}>
        <div style={{ fontSize: '28px', fontWeight: '900', color: btns[active].color, letterSpacing: '6px', textShadow: \`0 0 10px \${btns[active].shadow}, 0 0 20px \${btns[active].shadow}\`, animation: 'neonPulse 2s ease-in-out infinite' }}>NEON UI</div>
        <div style={{ position: 'absolute', left: 0, right: 0, height: '2px', background: \`linear-gradient(90deg, transparent, \${btns[active].color}, transparent)\`, animation: 'scanline 3s linear infinite', boxShadow: \`0 0 10px \${btns[active].color}\` }} />
      </div>
    </div>
  );
};`,
  },
  {
    id: 'confetti',
    cat: 'anim',
    name: 'Confetti Explosion',
    nameFr: 'Explosion Confettis',
    icon: '🎊',
    tags: ['Animated', 'Interactive'],
    code: `const App = () => {
  const [pieces, setPieces] = React.useState([]);
  const colors = ['#6366f1','#ec4899','#f59e0b','#10b981','#ef4444','#3b82f6','#a855f7','#06b6d4'];
  const fire = () => {
    const p = Array.from({length:80}, (_,i) => ({
      id: Date.now()+i,
      x: 45 + Math.random()*10,
      color: colors[i%colors.length],
      delay: Math.random()*0.3,
      duration: 0.8 + Math.random()*0.8,
      rotation: Math.random()*720 - 360,
      dx: (Math.random()-0.5)*400,
      dy: -(Math.random()*300+100),
      w: Math.random()*10+4,
      h: Math.random()*6+3,
    }));
    setPieces(p);
    setTimeout(() => setPieces([]), 2000);
  };
  const s = \`@keyframes fall{0%{opacity:1;transform:translate(0,0) rotate(0deg)}100%{opacity:0;transform:translate(var(--dx),var(--dy)) rotate(var(--r))}}\`;
  return (
    <div style={{ fontFamily:'system-ui', background:'#0f172a', borderRadius:'24px', padding:'40px', maxWidth:'420px', margin:'0 auto', textAlign:'center', position:'relative', overflow:'hidden', minHeight:'280px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'24px' }}>
      <style>{s}</style>
      <div style={{ fontSize:'48px' }}>🎊</div>
      <h3 style={{ color:'#f8fafc', margin:0, fontSize:'22px', fontWeight:'900' }}>Celebrate!</h3>
      <button onClick={fire} style={{ padding:'14px 32px', background:'linear-gradient(135deg,#6366f1,#ec4899)', color:'#fff', border:'none', borderRadius:'14px', fontWeight:'800', fontSize:'16px', cursor:'pointer' }}>🎉 Fire Confetti!</button>
      {pieces.map(p => (
        <div key={p.id} style={{
          position:'absolute', left:p.x+'%', top:'50%',
          width:p.w+'px', height:p.h+'px', background:p.color, borderRadius:'2px',
          pointerEvents:'none', zIndex:10,
          animation:\`fall \${p.duration}s \${p.delay}s ease-out forwards\`,
          ['--dx']: p.dx+'px', ['--dy']: p.dy+'px', ['--r']: p.rotation+'deg',
        }} />
      ))}
    </div>
  );
};`,
  },
  {
    id: 'loadings',
    cat: 'anim',
    name: 'Loading Spinners',
    nameFr: 'Indicateurs Chargement',
    icon: '⏳',
    tags: ['Animated', 'CSS'],
    code: `const App = () => {
  const [sel, setSel] = React.useState(0);
  const style = \`
    @keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
    @keyframes bounce{0%,80%,100%{transform:scale(0)}40%{transform:scale(1)}}
    @keyframes wave{0%,60%,100%{transform:scaleY(0.4)}30%{transform:scaleY(1)}}
    @keyframes pulse{0%,100%{transform:scale(0.8);opacity:0.5}50%{transform:scale(1.2);opacity:1}}
    @keyframes ring{0%{transform:rotate(0) scale(1);opacity:1}100%{transform:rotate(360deg) scale(1.2);opacity:0}}
  \`;
  const spinners = [
    { name:'Spinner', el: <div style={{width:48,height:48,border:'4px solid #e2e8f0',borderTop:'4px solid #6366f1',borderRadius:'50%',animation:'spin 0.8s linear infinite'}} /> },
    { name:'Dots', el: <div style={{display:'flex',gap:'8px',alignItems:'center'}}>{[0,1,2].map(i=><div key={i} style={{width:14,height:14,background:'#6366f1',borderRadius:'50%',animation:'bounce 1.4s ease-in-out '+(i*0.16)+'s infinite'}}/>)}</div> },
    { name:'Wave', el: <div style={{display:'flex',gap:'4px',alignItems:'center',height:'48px'}}>{[0,1,2,3,4].map(i=><div key={i} style={{width:'8px',height:'40px',background:'linear-gradient(#6366f1,#ec4899)',borderRadius:'4px',animation:'wave 1.2s ease-in-out '+(i*0.1)+'s infinite'}}/>)}</div> },
    { name:'Pulse', el: <div style={{width:48,height:48,background:'#6366f1',borderRadius:'50%',animation:'pulse 1.2s ease-in-out infinite'}} /> },
    { name:'Ring', el: <div style={{position:'relative',width:48,height:48}}>{[0,1,2].map(i=><div key={i} style={{position:'absolute',inset:i*8,border:'3px solid',borderColor:['#6366f1','#ec4899','#f59e0b'][i],borderRadius:'50%',animation:\`ring 1.5s \${i*0.15}s linear infinite\`}}/>)}</div> },
  ];
  return (
    <div style={{fontFamily:'system-ui',background:'#fff',borderRadius:'24px',padding:'32px',maxWidth:'360px',margin:'0 auto',boxShadow:'0 10px 40px rgba(0,0,0,0.08)'}}>
      <style>{style}</style>
      <h3 style={{margin:'0 0 20px',fontSize:'18px',fontWeight:'800',color:'#0f172a'}}>⏳ Loading Spinners</h3>
      <div style={{display:'flex',gap:'8px',marginBottom:'28px',flexWrap:'wrap'}}>
        {spinners.map((s,i)=><button key={i} onClick={()=>setSel(i)} style={{padding:'7px 14px',borderRadius:'8px',border:'none',background:sel===i?'#6366f1':'#f1f5f9',color:sel===i?'#fff':'#64748b',fontWeight:'700',fontSize:'12px',cursor:'pointer'}}>{s.name}</button>)}
      </div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100px',background:'#f8fafc',borderRadius:'16px'}}>
        {spinners[sel].el}
      </div>
    </div>
  );
};`,
  },
  {
    id: 'morphshape',
    cat: 'anim',
    name: 'Morphing Shapes',
    nameFr: 'Formes Morphantes',
    icon: '🔷',
    tags: ['Animated', 'CSS'],
    code: `const App = () => {
  const style = \`
    @keyframes morph1{0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%;background:linear-gradient(135deg,#6366f1,#ec4899)}25%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%;background:linear-gradient(135deg,#f59e0b,#ef4444)}50%{border-radius:50% 50% 30% 70%/30% 50% 70% 50%;background:linear-gradient(135deg,#10b981,#0ea5e9)}75%{border-radius:40% 60% 60% 40%/60% 30% 70% 40%;background:linear-gradient(135deg,#a855f7,#6366f1)}}
    @keyframes spin2{from{transform:rotate(0)}to{transform:rotate(360deg)}}
    @keyframes morph2{0%,100%{border-radius:50% 50% 50% 50%}33%{border-radius:20% 80% 80% 20%}66%{border-radius:80% 20% 20% 80%}}
    @keyframes morph3{0%,100%{border-radius:50%}25%{border-radius:20% 80% 50% 50%}50%{border-radius:50% 50% 20% 80%}75%{border-radius:80% 20% 80% 20%}}
  \`;
  return (
    <div style={{fontFamily:'system-ui',background:'#0f172a',borderRadius:'24px',padding:'32px',maxWidth:'420px',margin:'0 auto',display:'flex',flexDirection:'column',alignItems:'center',gap:'32px'}}>
      <style>{style}</style>
      <div style={{fontSize:'16px',fontWeight:'700',color:'#f8fafc',letterSpacing:'2px'}}>MORPHING SHAPES</div>
      <div style={{display:'flex',gap:'28px',alignItems:'center',justifyContent:'center',flexWrap:'wrap'}}>
        <div style={{width:'100px',height:'100px',animation:'morph1 8s ease-in-out infinite'}} />
        <div style={{width:'80px',height:'80px',background:'linear-gradient(135deg,#0ea5e9,#10b981)',animation:'morph2 5s ease-in-out infinite, spin2 20s linear infinite'}} />
        <div style={{width:'70px',height:'70px',background:'linear-gradient(135deg,#f59e0b,#ec4899)',animation:'morph3 6s ease-in-out infinite reverse'}} />
      </div>
      <div style={{fontSize:'13px',color:'#64748b',textAlign:'center'}}>Pure CSS morphing animation<br/>No libraries required</div>
    </div>
  );
};`,
  },
];

const ALL_VAULT_ITEMS = [...VAULT_ITEMS, ...VAULT_EXTRA, ...VAULT_EXTRA2];
export default ALL_VAULT_ITEMS;
