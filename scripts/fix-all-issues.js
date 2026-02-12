const fs = require('fs');
const path = require('path');

class HeaderFooterFixer {
  constructor() {
    this.rootDir = path.join(__dirname, '..');
  }

  // إصلاح الهيدر والفوتر في جميع الصفحات
  fixHeaderFooter() {
    console.log('🔧 إصلاح الهيدر والفوتر...');
    
    const files = this.getAllHTMLFiles();
    let fixed = 0;

    files.forEach(file => {
      let content = fs.readFileSync(file, 'utf8');
      let modified = false;

      // إضافة سكريبت الهيدر والفوتر إذا لم يكن موجود
      if (!content.includes('universal-header-footer.js')) {
        content = content.replace(
          '</body>',
          `<script src="assets/js/universal-header-footer.js" defer></script>\n</body>`
        );
        modified = true;
      }

      // إضافة CSS الهيدر والفوتر
      if (!content.includes('universal-header-footer.css')) {
        content = content.replace(
          '</head>',
          `<link rel="stylesheet" href="assets/css/universal-header-footer.css">\n</head>`
        );
        modified = true;
      }

      // إضافة div للهيدر والفوتر
      if (!content.includes('data-include="shared-header.html"')) {
        content = content.replace(
          '<body>',
          `<body>\n<div data-include="shared-header.html"></div>`
        );
        modified = true;
      }

      if (!content.includes('data-include="shared-footer.html"')) {
        content = content.replace(
          '</main>',
          `</main>\n<div data-include="shared-footer.html"></div>`
        );
        modified = true;
      }

      if (modified) {
        fs.writeFileSync(file, content, 'utf8');
        fixed++;
        console.log(`✅ تم إصلاح: ${path.basename(file)}`);
      }
    });

    console.log(`✅ تم إصلاح ${fixed} ملف`);
  }

  // إضافة قسم الفيسبوك
  addFacebookSection() {
    console.log('📘 إضافة قسم الفيسبوك...');
    
    const indexPath = path.join(this.rootDir, 'index.html');
    let content = fs.readFileSync(indexPath, 'utf8');

    const facebookSection = `
<!-- Facebook Section -->
<section class="section" style="background: linear-gradient(135deg, #1877f2 0%, #42a5f5 100%); color: white; text-align: center;">
  <div class="container">
    <h2 style="color: white; margin-bottom: 20px;">تابعنا على فيسبوك</h2>
    <p style="margin-bottom: 30px; opacity: 0.9;">كن أول من يعرف بالعروض والخدمات الجديدة</p>
    <a href="https://www.facebook.com/arabads.me/" target="_blank" 
       style="display: inline-flex; align-items: center; gap: 10px; background: white; color: #1877f2; padding: 15px 30px; border-radius: 50px; text-decoration: none; font-weight: bold; box-shadow: 0 5px 15px rgba(0,0,0,0.2); transition: transform 0.3s ease;"
       onmouseover="this.style.transform='scale(1.05)'" 
       onmouseout="this.style.transform='scale(1)'">
      <i class="fab fa-facebook-f" style="font-size: 1.2rem;"></i>
      تابعنا على فيسبوك
    </a>
    
    <div style="margin-top: 40px; max-width: 500px; margin-left: auto; margin-right: auto;">
      <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Farabads.me%2F&tabs=timeline&width=500&height=400&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true" 
              width="100%" height="400" style="border:none;overflow:hidden;border-radius:10px;" 
              scrolling="no" frameborder="0" allowfullscreen="true" 
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
    </div>
  </div>
</section>`;

    // إضافة قسم الفيسبوك قبل الفوتر
    if (!content.includes('تابعنا على فيسبوك')) {
      content = content.replace(
        '<div data-include="shared-footer.html"></div>',
        facebookSection + '\n<div data-include="shared-footer.html"></div>'
      );
      
      fs.writeFileSync(indexPath, content, 'utf8');
      console.log('✅ تم إضافة قسم الفيسبوك');
    } else {
      console.log('ℹ️ قسم الفيسبوك موجود بالفعل');
    }
  }

  // تحديث تاريخ sitemap
  updateSitemapDate() {
    console.log('📅 تحديث تاريخ sitemap...');
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const dateStr = yesterday.toISOString().split('T')[0];
    
    const sitemapPath = path.join(this.rootDir, 'sitemap.xml');
    let content = fs.readFileSync(sitemapPath, 'utf8');
    
    // استبدال جميع التواريخ
    content = content.replace(/\d{4}-\d{2}-\d{2}/g, dateStr);
    
    fs.writeFileSync(sitemapPath, content, 'utf8');
    console.log(`✅ تم تحديث sitemap إلى تاريخ: ${dateStr}`);
  }

  // جمع جميع ملفات HTML
  getAllHTMLFiles() {
    const files = [];
    
    const scanDir = (dir) => {
      const items = fs.readdirSync(dir);
      
      items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && !['assets', 'scripts', 'react-app', '.git', '.idx'].includes(item)) {
          scanDir(fullPath);
        } else if (item.endsWith('.html') && !['shared-header.html', 'shared-footer.html'].includes(item)) {
          files.push(fullPath);
        }
      });
    };
    
    scanDir(this.rootDir);
    return files;
  }

  // تشغيل جميع الإصلاحات
  runAll() {
    console.log('🚀 بدء إصلاح شامل...\n');
    
    this.fixHeaderFooter();
    this.addFacebookSection();
    this.updateSitemapDate();
    
    console.log('\n✅ تم الانتهاء من جميع الإصلاحات!');
  }
}

// تشغيل الإصلاحات
const fixer = new HeaderFooterFixer();
fixer.runAll();