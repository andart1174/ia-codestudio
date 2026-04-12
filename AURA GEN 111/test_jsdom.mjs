import fs from 'fs';
import { JSDOM } from 'jsdom';

const html = fs.readFileSync('public/test_preview.html', 'utf8');

const dom = new JSDOM(html, {
    runScripts: 'dangerously',
    resources: 'usable',
    url: 'http://localhost/',
    pretendToBeVisual: true
});

dom.virtualConsole.on('error', (err) => {
    console.log('JSDOM VIRTUAL CONSOLE ERROR:', err);
});

dom.virtualConsole.on('log', (log) => {
    console.log('JSDOM LOG:', log);
});

dom.window.addEventListener('error', (event) => {
    console.log('WINDOW ERROR:', event.error);
});

setTimeout(() => {
    console.log('Final HTML length:', dom.window.document.body.innerHTML.length);
    console.log('Final Root HTML:', dom.window.document.getElementById('preview-root').innerHTML);
}, 3000);
