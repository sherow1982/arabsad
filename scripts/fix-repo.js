const fs = require('fs');
const path = require('path');

class RepoFixer {
  constructor() {
    this.rootDir = path.join(__dirname, '..');
    this.stats = { fixed: 0, created: 0, errors: 0 };
  }

  // إنشاء ملفات الهيدر والفوتر
  createHeaderFooter() {
    console.log('📝 إنشاء ملفات الهيدر والفوتر...');

    const header = `<header class="main-header">
  <div class="container">
    <a href="/" class="logo">🌐 إعلانات العرب</a>
    <button class="mobile-toggle" id="mobileToggle">☰</button>
    <nav class="main-nav" id="mainNav">
      <a href="/services/">الخدمات</a>
      <a href="/blog/">المدونة</a>
      <a href="/about.html">من نحن</a>
      <a href="/contact.html">اتصل بنا</a>
      <a href="https://wa.me/201110760081" class="cta-btn">📞 واتساب</a>
    </nav>
  </div>
</header>`;

    const footer = `<footer class="main-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-col">
        <h3>🌐 إعلانات العرب</h3>
        <p>وكالة تسويق رقمي متخصصة في الخليج العربي</p>
      </div>
      <div class="footer-col">
        <h4>خدماتنا</h4>
        <ul>
          <li><a href="/services/google-ads.html">إعلانات جوجل</a></li>
          <li><a href="/services/seo.html">SEO</a></li>
          <li><a href="/services/social-media-ads.html">السوشيال ميديا</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>تواصل معنا</h4>
        <p>📞 +201110760081</p>
        <p>📧 sherow1982@gmail.com</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 إعلانات العرب - جميع الحقوق محفوظة</p>
    </div>
  </div>
</footer>`;

    fs.writeFileSync(path.join(this.rootDir, 'shared-header.html'), header);
    fs.writeFileSync(path.join(this.rootDir, 'shared-footer.html'), footer);
    this.stats.created += 2;
  }

  // إنشاء CSS للهيدر والفوتر
  createHeaderFooterCSS() {
    console.log('🎨 إنشاء CSS للهيدر والفوتر...');

    const css = `/* Header & Footer Styles */
.main-header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  background: rgba(10, 14, 39, 0.95);
  backdrop-filter: blur(10px);
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 184, 0, 0.1);
}

.main-header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.logo {
  font-size: 1.3rem;
  font-weight: 800;
  color: #FFB800;
  text-decoration: none;
}

.mobile-toggle {
  background: none;
  border: none;
  color: #FFB800;
  font-size: 2rem;
  cursor: pointer;
  display: block;
}

.main-nav {
  display: none;
  align-items: center;
  gap: 1.5rem;
}

.main-nav a {
  color: #e8edf5;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.main-nav a:hover {
  background: rgba(255, 184, 0, 0.1);
  color: #FFB800;
}

.cta-btn {
  background: #FFB800 !important;
  color: #000 !important;
  padding: 0.7rem 1.2rem !important;
  border-radius: 25px !important;
  font-weight: 600 !important;
}

.main-footer {
  background: #1a1f3a;
  padding: 3rem 0 1.5rem;
  margin-top: 4rem;
  color: #a8b3c1;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-col h3, .footer-col h4 {
  color: #FFB800;
  margin-bottom: 1rem;
}

.footer-col ul {
  list-style: none;
  padding: 0;
}

.footer-col ul li {
  margin-bottom: 0.5rem;
}

.footer-col a {
  color: #a8b3c1;
  text-decoration: none;
}

.footer-col a:hover {
  color: #FFB800;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 184, 0, 0.2);
  padding-top: 1.5rem;
  text-align: center;
}

body {
  padding-top: 80px;
}

@media (min-width: 769px) {
  .mobile-toggle {
    display: none !important;
  }
  
  .main-nav {
    display: flex !important;
  }
}

@media (max-width: 768px) {
  .main-nav {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(10, 14, 39, 0.98);
    backdrop-filter: blur(15px);
    flex-direction: column;
    padding: 1rem;
    border-top: 1px solid rgba(255, 184, 0, 0.2);
  }
  
  .main-nav.active {
    display: flex !important;
  }
  
  .main-nav a {
    width: 100%;
    text-align: center;
    padding: 1rem;
    border-bottom: 1px solid rgba(255, 184, 0, 0.1);
  }
}`;

    const cssPath = path.join(this.rootDir, 'assets', 'css', 'universal-header-footer.css');
    fs.writeFileSync(cssPath, css);
    this.stats.created++;
  }

  // إنشاء JS للهيدر والفوتر
  createHeaderFooterJS() {
    console.log('⚡ إنشاء JS للهيدر والفوتر...');

    const js = `// Universal Header Footer System
document.addEventListener('DOMContentLoaded', function() {
  // Load header and footer
  loadIncludes();
  
  // Setup mobile menu after loading
  setTimeout(setupMobileMenu, 100);
});

function loadIncludes() {
  const includes = document.querySelectorAll('[data-include]');
  
  includes.forEach(async (element) => {
    const file = element.getAttribute('data-include');
    try {
      const response = await fetch(file);
      if (response.ok) {
        const content = await response.text();
        element.innerHTML = content;
      }
    } catch (error) {
      console.log('Include load error:', error);
    }
  });
}

function setupMobileMenu() {
  const toggle = document.getElementById('mobileToggle');
  const nav = document.getElementById('mainNav');
  
  if (toggle && nav) {
    toggle.addEventListener('click', function() {
      nav.classList.toggle('active');
      this.textContent = nav.classList.contains('active') ? '✕' : '☰';
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove('active');
        toggle.textContent = '☰';
      }
    });
  }
}`;

    const jsPath = path.join(this.rootDir, 'assets', 'js', 'universal-header-footer.js');
    fs.writeFileSync(jsPath, js);
    this.stats.created++;
  }

  // إصلاح جميع ملفات HTML
  fixAllHTML() {
    console.log('🔧 إصلاح جميع ملفات HTML...');
    
    const files = this.getAllHTMLFiles();
    
    files.forEach(file => {
      try {
        let content = fs.readFileSync(file, 'utf8');
        let modified = false;

        // إضافة CSS
        if (!content.includes('universal-header-footer.css')) {
          content = content.replace(
            '</head>',
            '  <link rel="stylesheet" href="assets/css/universal-header-footer.css">\n</head>'
          );
          modified = true;
        }

        // إضافة div للهيدر
        if (!content.includes('data-include="shared-header.html"')) {
          content = content.replace(
            '<body>',
            '<body>\n  <div data-include="shared-header.html"></div>'
          );
          modified = true;
        }

        // إضافة div للفوتر
        if (!content.includes('data-include="shared-footer.html"')) {
          const footerDiv = '\n  <div data-include="shared-footer.html"></div>';
          
          if (content.includes('</main>')) {
            content = content.replace('</main>', '</main>' + footerDiv);
          } else if (content.includes('</body>')) {
            content = content.replace('</body>', footerDiv + '\n</body>');
          }
          modified = true;
        }

        // إضافة JS
        if (!content.includes('universal-header-footer.js')) {
          content = content.replace(
            '</body>',
            '  <script src="assets/js/universal-header-footer.js"></script>\n</body>'
          );
          modified = true;
        }

        if (modified) {
          fs.writeFileSync(file, content);
          this.stats.fixed++;
          console.log(`✅ ${path.basename(file)}`);
        }
      } catch (error) {
        console.error(`❌ ${path.basename(file)}: ${error.message}`);
        this.stats.errors++;
      }
    });
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
    console.log('🚀 بدء إصلاح شامل للريبو...\n');
    
    this.createHeaderFooter();
    this.createHeaderFooterCSS();
    this.createHeaderFooterJS();
    this.fixAllHTML();
    
    console.log('\n📊 إحصائيات الإصلاح:');
    console.log(`✅ ملفات تم إصلاحها: ${this.stats.fixed}`);
    console.log(`📝 ملفات تم إنشاؤها: ${this.stats.created}`);
    console.log(`❌ أخطاء: ${this.stats.errors}`);
    console.log('\n✅ تم الانتهاء من إصلاح الريبو!');
  }
}

// تشغيل الإصلاحات
const fixer = new RepoFixer();
fixer.runAll();