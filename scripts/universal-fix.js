const fs = require('fs');
const path = require('path');

class UniversalHeaderFooter {
  constructor() {
    this.rootDir = path.join(__dirname, '..');
    this.stats = { fixed: 0, errors: 0, total: 0 };
  }

  // حساب المسار النسبي للملف
  getRelativePath(filePath) {
    const relativePath = path.relative(this.rootDir, path.dirname(filePath));
    const depth = relativePath ? relativePath.split(path.sep).length : 0;
    return depth > 0 ? '../'.repeat(depth) : './';
  }

  // إصلاح ملف واحد
  fixFile(filePath) {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      let modified = false;
      const relativePath = this.getRelativePath(filePath);
      
      // تحديد المسارات الصحيحة
      const cssPath = `${relativePath}assets/css/universal-header-footer.css`;
      const jsPath = `${relativePath}assets/js/universal-header-footer.js`;
      const headerPath = `${relativePath}shared-header.html`;
      const footerPath = `${relativePath}shared-footer.html`;

      // إضافة CSS إذا لم يكن موجود
      if (!content.includes('universal-header-footer.css')) {
        content = content.replace(
          '</head>',
          `  <link rel="stylesheet" href="${cssPath}">\n</head>`
        );
        modified = true;
      }

      // إضافة الهيدر إذا لم يكن موجود
      if (!content.includes('data-include') || !content.includes('shared-header')) {
        content = content.replace(
          '<body>',
          `<body>\n  <div data-include="${headerPath}"></div>`
        );
        modified = true;
      }

      // إضافة الفوتر إذا لم يكن موجود
      if (!content.includes('shared-footer')) {
        if (content.includes('</main>')) {
          content = content.replace(
            '</main>',
            `</main>\n  <div data-include="${footerPath}"></div>`
          );
        } else {
          content = content.replace(
            '</body>',
            `  <div data-include="${footerPath}"></div>\n</body>`
          );
        }
        modified = true;
      }

      // إضافة JS إذا لم يكن موجود
      if (!content.includes('universal-header-footer.js')) {
        content = content.replace(
          '</body>',
          `  <script src="${jsPath}"></script>\n</body>`
        );
        modified = true;
      }

      if (modified) {
        fs.writeFileSync(filePath, content);
        this.stats.fixed++;
        console.log(`✅ ${path.relative(this.rootDir, filePath)}`);
      }

      this.stats.total++;
    } catch (error) {
      console.error(`❌ ${path.relative(this.rootDir, filePath)}: ${error.message}`);
      this.stats.errors++;
    }
  }

  // جمع جميع ملفات HTML
  getAllHTMLFiles() {
    const files = [];
    
    const scanDir = (dir) => {
      const items = fs.readdirSync(dir);
      
      items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && !['assets', 'scripts', 'react-app', '.git', '.idx', 'node_modules'].includes(item)) {
          scanDir(fullPath);
        } else if (item.endsWith('.html') && !['shared-header.html', 'shared-footer.html'].includes(item)) {
          files.push(fullPath);
        }
      });
    };
    
    scanDir(this.rootDir);
    return files;
  }

  // تشغيل الإصلاح الشامل
  run() {
    console.log('🚀 بدء تعميم الهيدر والفوتر في الموقع كله...\n');
    
    const files = this.getAllHTMLFiles();
    console.log(`📁 تم العثور على ${files.length} ملف HTML\n`);
    
    files.forEach(file => this.fixFile(file));
    
    console.log('\n📊 إحصائيات التعميم:');
    console.log(`📄 إجمالي الملفات: ${this.stats.total}`);
    console.log(`✅ ملفات تم إصلاحها: ${this.stats.fixed}`);
    console.log(`❌ أخطاء: ${this.stats.errors}`);
    console.log(`✨ ملفات سليمة: ${this.stats.total - this.stats.fixed - this.stats.errors}`);
    console.log('\n✅ تم تعميم الهيدر والفوتر في الموقع كله!');
  }
}

// تشغيل التعميم
const fixer = new UniversalHeaderFooter();
fixer.run();