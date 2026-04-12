import fs from 'fs';
import { injectTrackingAttributes } from './src/utils/TransformationEngine.js';

const code = `
// -- 3D Embed: Living Alien ------------------
const ExtraterrestreVivantEmbed=()=>{React.useEffect(()=>{var s=document.createElement('style');s.id='u-ali';s.textContent='@keyframes af{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}@keyframes ap{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}@keyframes ae{0%,100%{transform:scaleY(1)}5%{transform:scaleY(.05)}12%{transform:scaleY(1)}}@keyframes at{0%,100%{transform:rotateZ(12deg)}50%{transform:rotateZ(32deg)}}';if(!document.getElementById('u-ali'))document.head.appendChild(s);},[]);return(<div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'100vh',background:'radial-gradient(ellipse,#0d2818,#0f172a)'}}>
<div style={{animation:'af 2s ease-in-out infinite',textAlign:'center'}}>
<div style={{animation:'ap 2s ease-in-out infinite',display:'inline-block'}}>
<div style={{width:90,height:110,background:'radial-gradient(ellipse,#1a3a1a,#0d2015)',border:'2px solid #10b981',borderRadius:'50% 50% 45% 45%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:15,boxShadow:'0 0 30px rgba(16,185,129,.5)'}}>
<div style={{display:'flex',gap:20}}>
<div style={{width:22,height:28,background:'#10b981',borderRadius:'50%',animation:'ae 4s ease-in-out infinite',boxShadow:'0 0 15px #10b981'}}/>
<div style={{width:22,height:28,background:'#10b981',borderRadius:'50%',animation:'ae 4s ease-in-out infinite .8s',boxShadow:'0 0 15px #10b981'}}/></div>
<div style={{width:25,height:4,background:'#10b981',borderRadius:2,opacity:.6}}/></div>
<div style={{display:'flex',justifyContent:'center',gap:10,marginTop:4}}>
{[0,.3,.6,.9].map((d,i)=><div key={i} style={{width:8,height:28+i*4,background:'#059669',borderRadius:'0 0 50% 50%',transformOrigin:'top center',animation:'at 1.2s ease-in-out infinite',animationDelay:d+'s'}}/>)}</div></div>
<p style={{color:'#10b981',fontWeight:700,marginTop:16,letterSpacing:3,fontSize:13}}>👽 EXTRATERESTRU VIU 👽</p>
</div></div>);};
// ------------------------------------------

const App = () => {
    return (
        <>
            <div style={{ background: "#f1f5f9" }}>app</div>
            <ExtraterrestreVivantEmbed />
        </>
    );
};
`;

const trackedCode = injectTrackingAttributes(code);

const html = `
<!DOCTYPE html>
<html>
<head>
    <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
    <div id="preview-root"></div>
    <script type="text/babel">
        ${trackedCode}
        const root = ReactDOM.createRoot(document.getElementById('preview-root'));
        root.render(<App />);
    </script>
</body>
</html>
`;

fs.writeFileSync('public/test_preview.html', html);
console.log('Saved to public/test_preview.html');
