const core = require('@babel/core');
const fs = require('fs');

const code = `
const AlienViu=()=>{React.useEffect(()=>{var s=document.createElement('style');s.id='u-ali';s.textContent='@keyframes af{}';if(!document.getElementById('u-ali'))document.head.appendChild(s);},[]);return(<div>alien</div>);};

const App = () => {
    return (
        <>
            <div>app</div>
            <AlienViu/>
        </>
    );
};
`;

try {
    const out = core.transform(code, { presets: ['@babel/preset-react'] });
    console.log('SUCCESS');
} catch (e) {
    console.error('ERROR:', e.message);
}
