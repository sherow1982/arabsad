/**
 * إصلاح مشكلة الهيدر والفوتر في جميع صفحات الموقع
 * Fix Header & Footer for All Pages
 */

const fs = require('fs');
const path = require('path');

// الهيدر والفوتر المطلوب إضافتهما
const headerInclude = `    <!-- Header -->
    <div data-include="shared-header.html"></div>`;

const footerInclude = `    <!-- Footer -->
    <div data-include="shared-footer.html"></div>`;

const universalScript = `    <!-- Universal Header/Footer Script -->
    <script src="/arabsad/assets/js/universal-header-footer.js"></script>
    <script>
        // Load Shared Header/Footer
        document.addEventListener('DOMContentLoaded', function() {
            document.querySelectorAll('[data-include]').forEach(async function(el) {
                try {
                    const file = el.getAttribute('data-include');
                    const response = await fetch('/arabsad/' + file);
                    if (response.ok) {
                        el.innerHTML = await response.text();
                        if (file.includes('header') && typeof initMobileDropdowns === 'function') initMobileDropdowns();
                    }
                } catch (e) { console.log(e); }
            });
        });
    </script>`;

// قائمة الملفات التي تحتاج إصلاح
const filesToFix = [
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
    'om.html'
];

function fixFile(filePath) {
    const fullPath = path.join(__dirname, filePath);
    
    if (!fs.existsSync(fullPath)) {
        console.log(`❌ File not found: ${filePath}`);
        return;
    }

    let content = fs.readFileSync(fullPath, 'utf8');
    let modified = false;

    // تحقق من وجود الهيدر
    if (!content.includes('data-include="shared-header.html"') && 
        !content.includes('<header') && 
        !content.includes('universal-header-footer.js')) {
        
        // إضافة الهيدر بعد <body>
        if (content.includes('<body>')) {
            content = content.replace('<body>', `<body>\n${headerInclude}`);
            modified = true;
            console.log(`✅ Added header to: ${filePath}`);
        }
    }

    // تحقق من وجود الفوتر
    if (!content.includes('data-include="shared-footer.html"') && 
        !content.includes('<footer') && 
        !content.includes('universal-header-footer.js')) {
        
        // إضافة الفوتر قبل </body>
        if (content.includes('</body>')) {
            content = content.replace('</body>', `${footerInclude}\n\n${universalScript}\n</body>`);
            modified = true;
            console.log(`✅ Added footer to: ${filePath}`);
        }
    }

    // إضافة padding-top للـ body إذا لم يكن موجود
    if (modified && !content.includes('padding-top') && !content.includes('margin-top')) {
        // البحث عن body في CSS وإضافة padding-top
        if (content.includes('body {') || content.includes('body{')) {
            content = content.replace(/(body\s*{[^}]*)(})/g, '$1    padding-top: 100px;\n$2');
        } else if (content.includes('<style>')) {
            // إضافة CSS جديد
            const bodyCSS = `
        body {
            padding-top: 100px;
        }`;
            content = content.replace('</style>', `${bodyCSS}\n    </style>`);
        }
    }

    if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`🔧 Fixed: ${filePath}`);
    } else {
        console.log(`⏭️  Skipped (already has header/footer): ${filePath}`);
    }
}

// تشغيل الإصلاح
console.log('🚀 Starting header/footer fix...\n');

filesToFix.forEach(file => {
    fixFile(file);
});

console.log('\n✅ Header/Footer fix completed!');
console.log('\n📝 Summary:');
console.log('- Added header and footer includes to pages that were missing them');
console.log('- Added universal-header-footer.js script');
console.log('- Added body padding-top for fixed header');
console.log('\n🔄 Please refresh your browser to see the changes.');