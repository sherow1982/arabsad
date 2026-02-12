const fs = require('fs');
const path = require('path');

class BlogFixer {
  constructor() {
    this.rootDir = path.join(__dirname, '..');
    this.stats = { fixed: 0, errors: 0 };
  }

  // إصلاح صفحة المدونة الرئيسية
  fixBlogIndex() {
    console.log('📝 إصلاح صفحة المدونة الرئيسية...');
    
    const blogPath = path.join(this.rootDir, 'blog', 'index.html');
    let content = fs.readFileSync(blogPath, 'utf8');
    let modified = false;

    // إصلاح مسارات CSS
    if (!content.includes('../assets/css/universal-header-footer.css')) {
      content = content.replace(
        'assets/css/universal-header-footer.css',
        '../assets/css/universal-header-footer.css'
      );
      modified = true;
    }

    // إصلاح مسارات JS
    if (!content.includes('../assets/js/universal-header-footer.js')) {
      content = content.replace(
        '/assets/js/universal-header-footer.js',
        '../assets/js/universal-header-footer.js'
      );
      modified = true;
    }

    // إصلاح مسارات الهيدر والفوتر
    if (!content.includes('data-include="../shared-header.html"')) {
      content = content.replace(
        'data-include="shared-header.html"',
        'data-include="../shared-header.html"'
      );
      modified = true;
    }

    if (!content.includes('data-include="../shared-footer.html"')) {
      content = content.replace(
        'data-include="shared-footer.html"',
        'data-include="../shared-footer.html"'
      );
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(blogPath, content);
      this.stats.fixed++;
      console.log('✅ blog/index.html');
    }
  }

  // إصلاح جميع مقالات المدونة
  fixBlogArticles() {
    console.log('📚 إصلاح مقالات المدونة...');
    
    const articlesDir = path.join(this.rootDir, 'blog', 'articles');
    if (!fs.existsSync(articlesDir)) {
      console.log('⚠️ مجلد articles غير موجود');
      return;
    }

    const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.html'));
    
    files.forEach(file => {
      try {
        const filePath = path.join(articlesDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;

        // إضافة CSS إذا لم يكن موجود
        if (!content.includes('universal-header-footer.css')) {
          content = content.replace(
            '</head>',
            '  <link rel="stylesheet" href="../../assets/css/universal-header-footer.css">\n</head>'
          );
          modified = true;
        }

        // إضافة الهيدر إذا لم يكن موجود
        if (!content.includes('data-include')) {
          content = content.replace(
            '<body>',
            '<body>\n  <div data-include="../../shared-header.html"></div>'
          );
          
          // إضافة الفوتر
          if (content.includes('</body>')) {
            content = content.replace(
              '</body>',
              '  <div data-include="../../shared-footer.html"></div>\n  <script src="../../assets/js/universal-header-footer.js"></script>\n</body>'
            );
          }
          modified = true;
        }

        if (modified) {
          fs.writeFileSync(filePath, content);
          this.stats.fixed++;
          console.log(`✅ articles/${file}`);
        }
      } catch (error) {
        console.error(`❌ articles/${file}: ${error.message}`);
        this.stats.errors++;
      }
    });
  }

  // إصلاح مقالات المدونة في المجلد الرئيسي
  fixMainBlogFiles() {
    console.log('📄 إصلاح مقالات المدونة الرئيسية...');
    
    const blogDir = path.join(this.rootDir, 'blog');
    const files = fs.readdirSync(blogDir).filter(f => 
      f.endsWith('.html') && f !== 'index.html'
    );
    
    files.forEach(file => {
      try {
        const filePath = path.join(blogDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;

        // إصلاح مسارات CSS
        if (!content.includes('../assets/css/universal-header-footer.css')) {
          if (content.includes('assets/css/universal-header-footer.css')) {
            content = content.replace(
              'assets/css/universal-header-footer.css',
              '../assets/css/universal-header-footer.css'
            );
            modified = true;
          } else if (!content.includes('universal-header-footer.css')) {
            content = content.replace(
              '</head>',
              '  <link rel="stylesheet" href="../assets/css/universal-header-footer.css">\n</head>'
            );
            modified = true;
          }
        }

        // إصلاح مسارات الهيدر والفوتر
        if (!content.includes('data-include="../shared-header.html"')) {
          if (content.includes('data-include="shared-header.html"')) {
            content = content.replace(
              'data-include="shared-header.html"',
              'data-include="../shared-header.html"'
            );
            modified = true;
          } else if (!content.includes('data-include')) {
            content = content.replace(
              '<body>',
              '<body>\n  <div data-include="../shared-header.html"></div>'
            );
            modified = true;
          }
        }

        if (!content.includes('data-include="../shared-footer.html"')) {
          if (content.includes('data-include="shared-footer.html"')) {
            content = content.replace(
              'data-include="shared-footer.html"',
              'data-include="../shared-footer.html"'
            );
            modified = true;
          } else if (!content.includes('shared-footer.html')) {
            content = content.replace(
              '</body>',
              '  <div data-include="../shared-footer.html"></div>\n</body>'
            );
            modified = true;
          }
        }

        // إصلاح مسارات JS
        if (!content.includes('../assets/js/universal-header-footer.js')) {
          if (!content.includes('universal-header-footer.js')) {
            content = content.replace(
              '</body>',
              '  <script src="../assets/js/universal-header-footer.js"></script>\n</body>'
            );
            modified = true;
          }
        }

        if (modified) {
          fs.writeFileSync(filePath, content);
          this.stats.fixed++;
          console.log(`✅ blog/${file}`);
        }
      } catch (error) {
        console.error(`❌ blog/${file}: ${error.message}`);
        this.stats.errors++;
      }
    });
  }

  // تشغيل جميع الإصلاحات
  run() {
    console.log('🚀 بدء إصلاح المدونة ومقالاتها...\n');
    
    this.fixBlogIndex();
    this.fixBlogArticles();
    this.fixMainBlogFiles();
    
    console.log('\n📊 إحصائيات الإصلاح:');
    console.log(`✅ ملفات تم إصلاحها: ${this.stats.fixed}`);
    console.log(`❌ أخطاء: ${this.stats.errors}`);
    console.log('\n✅ تم الانتهاء من إصلاح المدونة!');
  }
}

// تشغيل الإصلاحات
const fixer = new BlogFixer();
fixer.run();