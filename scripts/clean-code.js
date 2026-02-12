const fs = require('fs');
const path = require('path');

let fixed = 0;

function cleanHTML(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  
  // إزالة المسافات الزائدة
  content = content.replace(/\r\n/g, '\n');
  content = content.replace(/\n{3,}/g, '\n\n');
  content = content.replace(/[ \t]+\n/g, '\n');
  
  // إصلاح الروابط المكسورة
  content = content.replace(/href="\/arabsad\//g, 'href="/');
  content = content.replace(/src="\/arabsad\//g, 'src="/');
  
  // إصلاح الـ alt tags الفارغة
  content = content.replace(/<img([^>]*?)alt=""([^>]*?)>/g, '<img$1alt="صورة"$2>');
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    fixed++;
    console.log(`✅ ${path.basename(filePath)}`);
  }
}

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !['node_modules', '.git', '.idx', 'scripts'].includes(file)) {
      scanDir(fullPath);
    } else if (stat.isFile() && /\.html$/.test(file)) {
      cleanHTML(fullPath);
    }
  });
}

scanDir(path.join(__dirname, '..'));
console.log(`\n✅ تم تنظيف ${fixed} ملف`);
