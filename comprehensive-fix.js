/**
 * إصلاح شامل لجميع صفحات الموقع - الهيدر والفوتر
 * Complete Fix for All Website Pages - Header & Footer
 */

const fs = require('fs');
const path = require('path');

// قائمة جميع الملفات HTML في الموقع
const allHtmlFiles = [
    'index.html',
    'about.html',
    'contact.html',
    'faq.html',
    'legal.html',
    'privacy.html',
    'terms.html',
    'ae.html',
    'sa.html',
    'kw.html',
    'qa.html',
    'bh.html',
    'om.html',
    'blog/index.html',
    'blog/articles/index.html',
    'blog/articles/google-ads-comprehensive-guide.html',
    'blog/articles/seo-comprehensive-guide.html',
    'blog/articles/social-media-ads-comprehensive-guide.html',
    'blog/articles/website-design-comprehensive-guide.html',
    'blog/articles/ecommerce-comprehensive-guide.html',
    'blog/articles/social-media-management-guide.html',
    'blog/google-ads-saudi-guide-2025.html',
    'blog/google-ads-uae-guide-2025.html',
    'blog/google-ads-kuwait-guide-2025.html',
    'blog/google-ads-qatar-guide-2025.html',
    'blog/google-ads-bahrain-guide-2025.html',
    'blog/google-ads-oman-guide-2025.html',
    'services/index.html',
    'services/google-ads.html',
    'services/seo.html',
    'services/social-media-ads.html',
    'services/social-management.html',
    'services/website-design.html',
    'services/ecommerce.html',
    'services/contracting-services.html',
    'services/gulf-cities.html',
    'services/safahat-al5dmat.html',
    'cities/riyadh-google-ads.html',
    'cities/jeddah-google-ads.html',
    'cities/dammam-google-ads.html',
    'cities/dubai-digital-marketing.html',
    'cities/abudhabi-digital-marketing.html',
    'cities/kuwait-digital-marketing.html',
    'cities/doha-digital-marketing.html',
    'cities/manama-digital-marketing.html',
    'examples/azl-khazanat-jeddah.html',
    'examples/naql-afsh-riyadh.html',
    'examples/pizza-restaurant-kuwait.html',
    'examples/salon-tajmeel-doha.html',
    'examples/siyanat-mukayifat-dubai.html',
    'examples/tandhif-manazil-dammam.html'
];

function ensureHeaderFooter(filePath) {
    const fullPath = path.join(__dirname, filePath);
    
    if (!fs.existsSync(fullPath)) {
        console.log(`❌ File not found: ${filePath}`);
        return;
    }

    let content = fs.readFileSync(fullPath, 'utf8');
    let modified = false;

    // تحديد المسار النسبي للملفات المشتركة
    const depth = filePath.split('/').length - 1;
    const relativePath = '../'.repeat(depth);
    const sharedHeaderPath = depth === 0 ? 'shared-header.html' : `${relativePath}shared-header.html`;
    const sharedFooterPath = depth === 0 ? 'shared-footer.html' : `${relativePath}shared-footer.html`;
    const jsPath = depth === 0 ? '/arabsad/assets/js/' : '/arabsad/assets/js/';

    // التحقق من وجود الهيدر
    if (!content.includes('data-include') && !content.includes('<header') && !content.includes('shared-header')) {
        // إضافة الهيدر بعد <body>
        const headerInclude = `    <!-- Header -->\n    <div data-include="${sharedHeaderPath}"></div>\n`;
        
        if (content.includes('<body>')) {
            content = content.replace('<body>', `<body>\n${headerInclude}`);
            modified = true;
            console.log(`✅ Added header to: ${filePath}`);
        }
    }

    // التحقق من وجود الفوتر
    if (!content.includes('shared-footer') && !content.includes('<footer')) {
        // إضافة الفوتر قبل </body>
        const footerInclude = `\n    <!-- Footer -->\n    <div data-include="${sharedFooterPath}"></div>\n`;
        
        if (content.includes('</body>')) {
            content = content.replace('</body>', `${footerInclude}\n</body>`);
            modified = true;
            console.log(`✅ Added footer to: ${filePath}`);
        }
    }

    // إضافة السكريپت المطلوب
    if (!content.includes('universal-header-footer.js') && !content.includes('data-include')) {
        const scripts = `
    <!-- Universal Header/Footer Scripts -->
    <script src="${jsPath}bfcache-fix.js"></script>
    <script src="${jsPath}universal-header-footer.js"></script>
    <script>
        // Load Shared Header/Footer
        document.addEventListener('DOMContentLoaded', function() {
            document.querySelectorAll('[data-include]').forEach(async function(el) {
                try {
                    const file = el.getAttribute('data-include');
                    const response = await fetch(file);
                    if (response.ok) {
                        el.innerHTML = await response.text();
                        if (file.includes('header') && typeof initMobileDropdowns === 'function') {
                            initMobileDropdowns();
                        }
                    }
                } catch (e) { 
                    console.log('Header/Footer load error:', e); 
                }
            });
        });
    </script>`;

        if (content.includes('</body>')) {
            content = content.replace('</body>', `${scripts}\n</body>`);
            modified = true;
            console.log(`✅ Added scripts to: ${filePath}`);
        }
    }

    // إضافة padding-top للـ body إذا لم يكن موجود
    if (modified && !content.includes('padding-top') && !content.includes('margin-top')) {
        // البحث عن body في CSS
        if (content.includes('body {') || content.includes('body{')) {
            content = content.replace(/(body\s*{[^}]*)(})/g, '$1    padding-top: 100px;\n$2');
            console.log(`✅ Added body padding to: ${filePath}`);
        } else if (content.includes('<style>')) {
            // إضافة CSS جديد
            const bodyCSS = `
        body {
            padding-top: 100px;
        }`;
            content = content.replace('</style>', `${bodyCSS}\n    </style>`);
            console.log(`✅ Added body CSS to: ${filePath}`);
        } else {
            // إضافة style tag جديد
            const styleTag = `
    <style>
        body {
            padding-top: 100px;
        }
    </style>`;
            content = content.replace('</head>', `${styleTag}\n</head>`);
            console.log(`✅ Added style tag to: ${filePath}`);
        }
    }

    if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`🔧 Fixed: ${filePath}`);
    } else {
        console.log(`⏭️  Already OK: ${filePath}`);
    }
}

// تشغيل الإصلاح
console.log('🚀 Starting comprehensive header/footer fix...\n');

allHtmlFiles.forEach(file => {
    ensureHeaderFooter(file);
});

console.log('\n✅ Comprehensive fix completed!');
console.log('\n📝 Summary:');
console.log('- Ensured all pages have header and footer includes');
console.log('- Added universal-header-footer.js and bfcache-fix.js scripts');
console.log('- Added body padding-top for fixed header');
console.log('- Fixed relative paths for nested directories');
console.log('\n🔄 Please refresh your browser to see the changes.');
console.log('🌐 Test the website: https://arabsads.storesads.shop/');