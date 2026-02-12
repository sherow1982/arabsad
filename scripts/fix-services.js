const fs = require('fs');
const path = require('path');

class ServicesFixer {
  constructor() {
    this.rootDir = path.join(__dirname, '..');
  }

  fixServicesPages() {
    console.log('🔧 إصلاح صفحات الخدمات...');
    
    const servicesDir = path.join(this.rootDir, 'services');
    const files = fs.readdirSync(servicesDir).filter(f => f.endsWith('.html'));
    
    let fixed = 0;
    
    files.forEach(file => {
      const filePath = path.join(servicesDir, file);
      let content = fs.readFileSync(filePath, 'utf8');
      let modified = false;

      // إصلاح مسار CSS
      if (content.includes('assets/css/universal-header-footer.css') && !content.includes('../assets/css/universal-header-footer.css')) {
        content = content.replace(
          'assets/css/universal-header-footer.css',
          '../assets/css/universal-header-footer.css'
        );
        modified = true;
      }

      // إصلاح مسار JS
      if (content.includes('assets/js/universal-header-footer.js') && !content.includes('../assets/js/universal-header-footer.js')) {
        content = content.replace(
          'assets/js/universal-header-footer.js',
          '../assets/js/universal-header-footer.js'
        );
        modified = true;
      }

      // إصلاح مسار shared-header
      if (content.includes('data-include="shared-header.html"') && !content.includes('data-include="../shared-header.html"')) {
        content = content.replace(
          'data-include="shared-header.html"',
          'data-include="../shared-header.html"'
        );
        modified = true;
      }

      // إصلاح مسار shared-footer
      if (content.includes('data-include="shared-footer.html"') && !content.includes('data-include="../shared-footer.html"')) {
        content = content.replace(
          'data-include="shared-footer.html"',
          'data-include="../shared-footer.html"'
        );
        modified = true;
      }

      if (modified) {
        fs.writeFileSync(filePath, content);
        fixed++;
        console.log(`✅ ${file}`);
      }
    });

    console.log(`✅ تم إصلاح ${fixed} ملف في مجلد services`);
  }

  run() {
    console.log('🚀 بدء إصلاح مجلد الخدمات...\n');
    this.fixServicesPages();
    console.log('\n✅ تم الانتهاء!');
  }
}

const fixer = new ServicesFixer();
fixer.run();