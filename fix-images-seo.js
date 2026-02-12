/**
 * إصلاح الصور وتحسين السيو
 * Image Fix & SEO Optimization
 */

const fs = require('fs');
const path = require('path');

// قائمة الصور المتوفرة
const availableImages = [
    'بانر الصفحة الرئيسية.jpg',
    'بديل خرائط جوجل.jpg', 
    'خدمات اعلانات جوجل.jpg',
    'سيو.jpg',
    'لاندنج بيدج صفحات الهبوط.jpg',
    'مواقع.jpg',
    'وسائل التواصل.jpg',
    'التجارة الالكترونية.jpg',
    'المدونة.jpg',
    'logo-arabsad.png',
    'logo.svg',
    'arabsad-social.webp'
];

// خريطة الصور البديلة
const imageMap = {
    'google-ads-service.png': 'خدمات اعلانات جوجل.jpg',
    'seo-service.png': 'سيو.jpg', 
    'social-media-service.png': 'وسائل التواصل.jpg',
    'ecommerce-service.png': 'التجارة الالكترونية.jpg',
    'website-service.png': 'مواقع.jpg',
    'landing-page-service.png': 'لاندنج بيدج صفحات الهبوط.jpg'
};

function fixImagesInFile(filePath) {
    const fullPath = path.join(__dirname, filePath);
    
    if (!fs.existsSync(fullPath)) {
        return;
    }

    let content = fs.readFileSync(fullPath, 'utf8');
    let modified = false;

    // إصلاح مسارات الصور
    const depth = filePath.split('/').length - 1;
    const relativePath = '../'.repeat(depth);
    const assetsPath = depth === 0 ? 'assets/images/' : `${relativePath}assets/images/`;

    // استبدال الصور المفقودة بالصور المتوفرة
    Object.entries(imageMap).forEach(([missing, available]) => {
        if (content.includes(missing)) {
            content = content.replace(new RegExp(missing, 'g'), available);
            modified = true;
            console.log(`✅ Replaced ${missing} with ${available} in ${filePath}`);
        }
    });

    // إضافة loading="lazy" للصور
    content = content.replace(/<img([^>]*?)(?<!loading="[^"]*")>/g, (match, attrs) => {
        if (!attrs.includes('loading=')) {
            return `<img${attrs} loading="lazy">`;
        }
        return match;
    });

    // إضافة width و height للصور الرئيسية
    content = content.replace(
        /<img([^>]*?)src="([^"]*بانر[^"]*)"([^>]*?)>/g,
        '<img$1src="$2"$3 width="900" height="400">'
    );

    // تحسين alt tags
    const altImprovements = {
        'بانر الصفحة الرئيسية': 'مؤسسة إعلانات العرب - وكالة التسويق الرقمي الأولى في الخليج العربي',
        'خدمات اعلانات جوجل': 'خدمات إعلانات Google Ads الاحترافية - مؤسسة إعلانات العرب',
        'سيو': 'خدمات تحسين محركات البحث SEO - مؤسسة إعلانات العرب',
        'وسائل التواصل': 'خدمات إعلانات وسائل التواصل الاجتماعي - فيسبوك وإنستغرام وسناب شات',
        'التجارة الالكترونية': 'تصميم وتطوير المتاجر الإلكترونية - مؤسسة إعلانات العرب',
        'مواقع': 'تصميم مواقع ويب احترافية ومتجاوبة - مؤسسة إعلانات العرب',
        'المدونة': 'مدونة إعلانات العرب - دليل التسويق الرقمي في الخليج العربي'
    };

    Object.entries(altImprovements).forEach(([key, value]) => {
        const regex = new RegExp(`alt="[^"]*${key}[^"]*"`, 'g');
        content = content.replace(regex, `alt="${value}"`);
        if (content.includes(key) && !content.includes(value)) {
            modified = true;
        }
    });

    // إضافة meta tags للسيو
    if (!content.includes('og:image') && filePath.endsWith('index.html')) {
        const ogTags = `
    <meta property="og:image" content="https://arabsads.storesads.shop/assets/images/بانر الصفحة الرئيسية.jpg">
    <meta property="og:image:width" content="900">
    <meta property="og:image:height" content="400">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="ar_SA">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:image" content="https://arabsads.storesads.shop/assets/images/بانر الصفحة الرئيسية.jpg">`;
        
        content = content.replace('</head>', `${ogTags}\n</head>`);
        modified = true;
        console.log(`✅ Added OG tags to ${filePath}`);
    }

    // تحسين structured data
    if (content.includes('"@type": "ProfessionalService"')) {
        const imageUrl = 'https://arabsads.storesads.shop/assets/images/logo-arabsad.png';
        if (!content.includes(imageUrl)) {
            content = content.replace(
                /"image": "[^"]*"/,
                `"image": "${imageUrl}"`
            );
            modified = true;
        }
    }

    if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`🔧 Fixed images and SEO in: ${filePath}`);
    }
}

// قائمة الملفات للإصلاح
const filesToFix = [
    'index.html',
    'blog/index.html',
    'services/google-ads.html',
    'services/seo.html',
    'services/social-media-ads.html',
    'services/ecommerce.html',
    'services/website-design.html',
    'services/social-management.html'
];

console.log('🚀 Starting image and SEO optimization...\n');

filesToFix.forEach(file => {
    fixImagesInFile(file);
});

console.log('\n✅ Image and SEO optimization completed!');
console.log('\n📝 Improvements:');
console.log('- Fixed missing image references');
console.log('- Added loading="lazy" to all images');
console.log('- Improved alt text for better accessibility');
console.log('- Added Open Graph meta tags');
console.log('- Enhanced structured data');
console.log('\n🌐 Test the website: https://arabsads.storesads.shop/');