const fs = require('fs');
const path = require('path');

const oldDomain = 'https://sherow1982.github.io/arabsad';
const newDomain = 'https://arabsads.storesads.shop';

function replaceInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const updated = content.replace(new RegExp(oldDomain, 'g'), newDomain);
  if (content !== updated) {
    fs.writeFileSync(filePath, updated, 'utf8');
    console.log(`✅ ${path.basename(filePath)}`);
  }
}

function scanDirectory(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !['node_modules', '.git', '.idx', 'scripts'].includes(file)) {
      scanDirectory(fullPath);
    } else if (stat.isFile() && /\.(html|xml|txt|js|json)$/.test(file)) {
      replaceInFile(fullPath);
    }
  });
}

scanDirectory(path.join(__dirname, '..'));
console.log('\n✅ تم تحديث الدومين');
