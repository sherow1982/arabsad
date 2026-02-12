const fs = require('fs');
const path = require('path');

class ArticlesFixer {
  constructor() {
    this.rootDir = path.join(__dirname, '..');
    this.stats = { fixed: 0, errors: 0, total: 0 };
  }

  // إصلاح ملف مقال واحد
  fixArticle(filePath) {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      let modified = false;
      
      // حساب المسار النسبي
      const relativePath = path.relative(this.rootDir, path.dirname(filePath));
      const depth = relativePath.split(path.sep).length;
      const prefix = '../'.repeat(depth);

      // إزالة الهيدر والفوتر المكررين
      content = content.replace(/<div data-include="[^"]*shared-header\.html"><\/div>/g, '');
      content = content.replace(/<div data-include="[^"]*shared-footer\.html"><\/div>/g, '');
      
      // إضافة الهيدر في المكان الصحيح
      if (!content.includes('data-include') || !content.includes('shared-header')) {
        content = content.replace(
          '<body>',
          `<body>\n<div data-include="${prefix}shared-header.html"></div>`
        );
        modified = true;
      }

      // إضافة الفوتر قبل نهاية body
      content = content.replace(
        '</body>',
        `<div data-include="${prefix}shared-footer.html"></div>\n</body>`
      );
      modified = true;

      // إضافة CSS إذا لم يكن موجود
      if (!content.includes('universal-header-footer.css')) {
        content = content.replace(
          '</head>',
          `<link rel="stylesheet" href="${prefix}assets/css/universal-header-footer.css">\n</head>`
        );
        modified = true;
      }

      // إضافة JS إذا لم يكن موجود
      if (!content.includes('universal-header-footer.js')) {
        content = content.replace(
          '<div data-include=',
          `<script src="${prefix}assets/js/universal-header-footer.js"></script>\n<div data-include=`
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

  // إصلاح جميع المقالات
  fixAllArticles() {
    console.log('📚 إصلاح جميع المقالات...\n');
    
    // مقالات في blog/articles/
    const articlesDir = path.join(this.rootDir, 'blog', 'articles');
    if (fs.existsSync(articlesDir)) {
      const articleFiles = fs.readdirSync(articlesDir).filter(f => f.endsWith('.html'));
      articleFiles.forEach(file => {
        this.fixArticle(path.join(articlesDir, file));
      });
    }

    // مقالات في blog/
    const blogDir = path.join(this.rootDir, 'blog');
    const blogFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.html'));
    blogFiles.forEach(file => {
      this.fixArticle(path.join(blogDir, file));
    });

    // مقالات في cities/
    const citiesDir = path.join(this.rootDir, 'cities');
    if (fs.existsSync(citiesDir)) {
      const cityFiles = fs.readdirSync(citiesDir).filter(f => f.endsWith('.html'));
      cityFiles.forEach(file => {
        this.fixArticle(path.join(citiesDir, file));
      });
    }

    // مقالات في examples/
    const examplesDir = path.join(this.rootDir, 'examples');
    if (fs.existsSync(examplesDir)) {
      const exampleFiles = fs.readdirSync(examplesDir).filter(f => f.endsWith('.html'));
      exampleFiles.forEach(file => {
        this.fixArticle(path.join(examplesDir, file));
      });
    }
  }

  // تشغيل الإصلاح
  run() {
    console.log('🚀 بدء إصلاح جميع المقالات في الموقع...\n');
    
    this.fixAllArticles();
    
    console.log('\n📊 إحصائيات الإصلاح:');
    console.log(`📄 إجمالي المقالات: ${this.stats.total}`);
    console.log(`✅ مقالات تم إصلاحها: ${this.stats.fixed}`);
    console.log(`❌ أخطاء: ${this.stats.errors}`);
    console.log('\n✅ تم إصلاح جميع المقالات!');
  }
}

// تشغيل الإصلاح
const fixer = new ArticlesFixer();
fixer.run();