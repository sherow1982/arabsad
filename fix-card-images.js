const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// إضافة width وheight للصور المفقودة
const fixes = [
    { find: 'src="assets/images/بديل خرائط جوجل.jpg"', replace: 'src="assets/images/بديل خرائط جوجل.jpg" width="300" height="200"' },
    { find: 'src="assets/images/التجارة الالكترونية.jpg"', replace: 'src="assets/images/التجارة الالكترونية.jpg" width="300" height="200"' },
    { find: 'src="assets/images/مواقع.jpg"', replace: 'src="assets/images/مواقع.jpg" width="300" height="200"' }
];

fixes.forEach(fix => {
    if (content.includes(fix.find) && !content.includes(fix.replace)) {
        content = content.replace(fix.find, fix.replace);
        console.log(`✅ Fixed: ${fix.find}`);
    }
});

fs.writeFileSync('index.html', content, 'utf8');
console.log('🎉 All service card images fixed!');