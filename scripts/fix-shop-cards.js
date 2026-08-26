const fs = require('fs');
const path = require('path');
const fp = path.join(__dirname, '..', 'shop', 'index.html');
let h = fs.readFileSync(fp, 'utf8');

// 1. إصلاح CSS overlay
h = h.split('.shop-card-overlay{position:absolute;inset:0;z-index:0;}')
     .join('.shop-card-overlay{position:absolute;inset:0;z-index:2;display:block}');

h = h.split('.shop-card-btn,.shop-card-rating{position:relative;z-index:1;}')
     .join('.shop-card-btn,.shop-card-rating{position:relative;z-index:3}');

// 2. إضافة target=_blank لكل overlay links
h = h.replace(
  /<a class="shop-card-overlay" href="([^"]+)"([^>]*)>/g,
  function(match, href, rest) {
    if (rest.includes('target')) return match;
    return '<a class="shop-card-overlay" href="' + href + '" target="_blank" rel="noopener noreferrer"' + rest + '>';
  }
);

fs.writeFileSync(fp, h, 'utf8');

// تحقق
const h2 = fs.readFileSync(fp, 'utf8');
console.log('overlay z-index:2 :', h2.includes('z-index:2;display:block'));
console.log('btn z-index:3     :', h2.includes('z-index:3'));
console.log('target _blank     :', (h2.match(/target="_blank"/g)||[]).length);
const sample = h2.match(/<a class="shop-card-overlay"[^>]+>/);
console.log('sample link       :', sample ? sample[0] : 'NOT FOUND');
