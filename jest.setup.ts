import '@testing-library/jest-dom';
import { TextDecoder, TextEncoder } from 'util';

const script = document.createElement('script');
script.src = '/sba-waffle-menu.js';
script.crossOrigin = 'anonymous';

script.onload = () => {
  console.log('/sba-waffle-menu.js loaded');
};

document.head.appendChild(script);

global.TextEncoder = TextEncoder;
// @ts-ignore
global.TextDecoder = TextDecoder;
