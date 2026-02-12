const fs = require('fs');
const path = require('path');

let cleaned = 0;

function removePingendo(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  
  // إزالة تاج pingendo
  content = content.replace(/<pingendo[^>]*>.*?<\/pingendo>/gs, '');
  
  // إزالة أي روابط أو إشارات لـ pingendo
  content = content.replace(/pingendo/gi, '');
  
  // إزالة التعليقات الخاصة بـ pingendo
  content = content.replace(/<!--.*?pingendo.*?-->/gis, '');
  
  // تنظيف الأسطر الفارغة الزائدة
  content = content.replace(/\n{3,}/g, '\n\n');
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    cleaned++;
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
    } else if (stat.isFile() && /\.(html|css|js)$/.test(file)) {
      removePingendo(fullPath);
    }
  });
}

scanDir(path.join(__dirname, '..'));
console.log(`\n✅ تم تنظيف ${cleaned} ملف من pingendo`);
