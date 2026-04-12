import { injectTrackingAttributes } from './src/utils/TransformationEngine.js';
import fs from 'fs';
import core from '@babel/core';

const code = fs.readFileSync('src/App.jsx', 'utf8');
const trackedCode = injectTrackingAttributes(code);

try {
    core.transform(trackedCode, { presets: ['@babel/preset-react'] });
    console.log('SUCCESS');
} catch (e) {
    console.error('ERROR:', e.message);
}
