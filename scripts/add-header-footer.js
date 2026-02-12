const fs = require('fs');
const path = require('path');

let updated = 0;

function addHeaderFooter(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // تحقق إذا كان فيه header/footer
  if (content.includes('data-include="shared-header.html"') || content.includes('<div data-include="shared-header.html">')) {
    return;
  }
  
  // إضافة الهيدر بعد <body>
  if (!content.includes('shared-header.html')) {
    content = content.replace(/<body[^>]*>/i, (match) => {
      return match + '\n    <div data-include="shared-header.html"></div>\n';
    });
  }
  
  // إضافة الفوتر قبل </body>
  if (!content.includes('shared-footer.html')) {
    content = content.replace(/<\/body>/i, '    <div data-include="shared-footer.html"></div>\n</body>');
  }
  
  // إضافة السكريبت
  if (!content.includes('universal-header-footer.js')) {
    content = content.replace(/<\/body>/i, '    <script src="/assets/js/universal-header-footer.js"></script>\n</body>');
  }
  
  // إضافة mobile-first.css
  if (!content.includes('mobile-first.css')) {
    content = content.replace(/<\/head>/i, '    <link rel="stylesheet" href="/assets/css/mobile-first.css">\n</head>');
  }
  
  fs.writeFileSync(filePath, content, 'utf8');
  updated++;
  console.log(`✅ ${path.basename(filePath)}`);
}

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !['node_modules', '.git', '.idx', 'scripts'].includes(file)) {
      scanDir(fullPath);
    } else if (stat.isFile() && /\.html$/.test(file)) {
      addHeaderFooter(fullPath);
    }
  });
}

scanDir(path.join(__dirname, '..'));
console.log(`\n✅ تم تحديث ${updated} ملف`);
