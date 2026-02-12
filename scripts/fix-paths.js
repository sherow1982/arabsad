const fs = require('fs');
const path = require('path');

let fixed = 0;

function fixPath(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  
  content = content.replace(/\/arabsad\//g, '/');
  
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
    } else if (stat.isFile() && /\.(html|js|css)$/.test(file)) {
      fixPath(fullPath);
    }
  });
}

scanDir(path.join(__dirname, '..'));
console.log(`\n✅ تم إصلاح ${fixed} ملف`);
