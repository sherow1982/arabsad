/**
 * نظام التنقل الشامل لموقع إعلانات العرب
 * يدير القوائم المنسدلة والبطاقات التفاعلية
 */

// بيانات جميع صفحات الموقع
const SITE_PAGES = {
    main: [
        { name: 'الرئيسية', url: 'index.html', icon: 'fa-home' }
    ],
    services: [
        { name: 'جميع الخدمات', url: 'services/index.html', icon: 'fa-list' },
        { name: 'إعلانات Google Ads', url: 'services/google-ads-complete.html', icon: 'fab fa-google' },
        { name: 'SEO تحسين محركات البحث', url: 'services/seo-complete.html', icon: 'fa-search' },
        { name: 'المتاجر الإلكترونية', url: 'services/ecommerce.html', icon: 'fa-shopping-cart' },
        { name: 'إدارة السوشيال ميديا', url: 'services/social-media-ads.html', icon: 'fa-hashtag' },
        { name: 'تصميم المواقع', url: 'services/website-design-complete.html', icon: 'fa-palette' },
        { name: 'خدمات المدن الخليجية', url: 'services/gulf-cities.html', icon: 'fa-city' }
    ],
    countries: [
        { name: 'السعودية 🇸🇦', url: 'sa.html', icon: 'fa-map-marker-alt' },
        { name: 'الإمارات 🇦🇪', url: 'ae.html', icon: 'fa-map-marker-alt' },
        { name: 'الكويت 🇰🇼', url: 'kw.html', icon: 'fa-map-marker-alt' },
        { name: 'قطر 🇶🇦', url: 'qa.html', icon: 'fa-map-marker-alt' },
        { name: 'البحرين 🇧🇭', url: 'bh.html', icon: 'fa-map-marker-alt' },
        { name: 'عمان 🇴🇲', url: 'om.html', icon: 'fa-map-marker-alt' }
    ],
    cities: [
        { name: 'دبي', url: 'cities/dubai-digital-marketing.html', icon: 'fa-building' },
        { name: 'أبوظبي', url: 'cities/abudhabi-digital-marketing.html', icon: 'fa-building' },
        { name: 'الرياض', url: 'cities/riyadh-google-ads.html', icon: 'fa-building' },
        { name: 'جدة', url: 'cities/jeddah-google-ads.html', icon: 'fa-building' },
        { name: 'الدمام', url: 'cities/dammam-google-ads.html', icon: 'fa-building' },
        { name: 'الدوحة', url: 'cities/doha-digital-marketing.html', icon: 'fa-building' },
        { name: 'مدينة الكويت', url: 'cities/kuwait-digital-marketing.html', icon: 'fa-building' },
        { name: 'المنامة', url: 'cities/manama-digital-marketing.html', icon: 'fa-building' }
    ],
    blog: [
        { name: 'جميع المقالات', url: 'blog/index.html', icon: 'fa-blog' },
        { name: 'Google Ads السعودية', url: 'blog/google-ads-saudi-guide-2025.html', icon: 'fa-newspaper' },
        { name: 'Google Ads الإمارات', url: 'blog/google-ads-uae-guide-2025.html', icon: 'fa-newspaper' },
        { name: 'Google Ads الكويت', url: 'blog/google-ads-kuwait-guide-2025.html', icon: 'fa-newspaper' },
        { name: 'Google Ads قطر', url: 'blog/google-ads-qatar-guide-2025.html', icon: 'fa-newspaper' },
        { name: 'Google Ads البحرين', url: 'blog/google-ads-bahrain-guide-2025.html', icon: 'fa-newspaper' },
        { name: 'Google Ads عمان', url: 'blog/google-ads-oman-guide-2025.html', icon: 'fa-newspaper' },
        { name: 'SEO للمتاجر الخليجية', url: 'blog/ecommerce-seo-gulf-optimization.html', icon: 'fa-newspaper' },
        { name: 'TikTok وSnapchat', url: 'blog/tiktok-snapchat-gulf-marketing-2025.html', icon: 'fa-newspaper' }
    ],
    tools: [
        { name: 'لوحة التحليلات', url: 'analytics-dashboard.html', icon: 'fa-chart-bar' },
        { name: 'Chatbot', url: 'chatbot.html', icon: 'fa-robot' },
        { name: 'Google Ads', url: 'google-ads.html', icon: 'fab fa-google' },
        { name: 'مدن الخليج', url: 'gulf-cities.html', icon: 'fa-city' },
        { name: 'إدارة السوشيال ميديا', url: 'social-media-management.html', icon: 'fa-users' },
        { name: 'قائمة الخدمات', url: 'services-page.html', icon: 'fa-concierge-bell' }
    ],
    legal: [
        { name: 'سياسة الخصوصية', url: 'privacy-policy.html', icon: 'fa-shield-alt' },
        { name: 'شروط الخدمة', url: 'terms-of-service.html', icon: 'fa-file-contract' }
    ]
};

/**
 * حساب إجمالي عدد الصفحات
 */
function getTotalPagesCount() {
    let total = 0;
    for (let category in SITE_PAGES) {
        total += SITE_PAGES[category].length;
    }
    return total;
}

/**
 * بناء HTML للقائمة المنسدلة
 */
function buildDropdownMenu(category) {
    const pages = SITE_PAGES[category];
    if (!pages || pages.length === 0) return '';
    
    let html = '<ul class="dropdown-menu">';
    pages.forEach(page => {
        html += `
            <li class="dropdown-item">
                <a href="${page.url}" target="_blank" class="dropdown-link">
                    <i class="fas ${page.icon}"></i> ${page.name}
                </a>
            </li>
        `;
    });
    html += '</ul>';
    return html;
}

/**
 * بناء بطاقات الصفحات
 */
function buildPageCards(category) {
    const pages = SITE_PAGES[category];
    if (!pages || pages.length === 0) return '';
    
    let html = '';
    pages.forEach(page => {
        html += `
            <a href="${page.url}" target="_blank" class="page-card">
                <i class="fas fa-external-link-alt page-card-link"></i>
                <div class="page-card-icon"><i class="fas ${page.icon}"></i></div>
                <div class="page-card-title">${page.name}</div>
                <div class="page-card-desc">${page.desc || page.name}</div>
            </a>
        `;
    });
    return html;
}

/**
 * تبديل عرض قائمة الجوال
 */
function toggleMobileNav() {
    const navMenu = document.getElementById('navMenu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}

/**
 * بحث في الصفحات
 */
function searchPages() {
    const input = document.getElementById('searchInput');
    if (!input) return;
    
    const searchTerm = input.value.toLowerCase();
    const cards = document.querySelectorAll('.page-card');
    let visibleCount = 0;

    cards.forEach(card => {
        const title = card.querySelector('.page-card-title').textContent.toLowerCase();
        const desc = card.querySelector('.page-card-desc')?.textContent.toLowerCase() || '';
        
        if (title.includes(searchTerm) || desc.includes(searchTerm)) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    // تحديث عداد النتائج
    const totalPagesElement = document.getElementById('totalPages');
    if (totalPagesElement) {
        totalPagesElement.textContent = visibleCount;
    }
}

/**
 * فتح رابط في تبويب جديد
 */
function openInNewTab(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * إضافة تأثيرات عند النقر
 */
function addClickEffects() {
    document.querySelectorAll('.page-card, .service-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // تأثير ripple
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(246, 185, 59, 0.6)';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.left = e.offsetX + 'px';
            ripple.style.top = e.offsetY + 'px';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.animation = 'ripple-effect 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

/**
 * تفعيل القوائم المنسدلة على الجوال
 */
function initMobileDropdowns() {
    if (window.innerWidth <= 968) {
        document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                const dropdown = this.nextElementSibling;
                if (dropdown && dropdown.classList.contains('dropdown-menu')) {
                    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
                }
            });
        });
    }
}

/**
 * تهيئة CSS لتأثيرات الحركة
 */
const animationStyles = `
    @keyframes ripple-effect {
        0% {
            width: 20px;
            height: 20px;
            opacity: 1;
        }
        100% {
            width: 400px;
            height: 400px;
            opacity: 0;
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .page-card,
    .service-card {
        animation: fadeInUp 0.6s ease-out both;
    }
    
    .page-card:nth-child(1) { animation-delay: 0.05s; }
    .page-card:nth-child(2) { animation-delay: 0.1s; }
    .page-card:nth-child(3) { animation-delay: 0.15s; }
    .page-card:nth-child(4) { animation-delay: 0.2s; }
    .page-card:nth-child(5) { animation-delay: 0.25s; }
    .page-card:nth-child(6) { animation-delay: 0.3s; }
    .page-card:nth-child(7) { animation-delay: 0.35s; }
    .page-card:nth-child(8) { animation-delay: 0.4s; }
`;

// إضافة الأنماط عند تحميل الصفحة
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = animationStyles;
    document.head.appendChild(styleSheet);
}

/**
 * تهيئة النظام عند تحميل الصفحة
 */
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        addClickEffects();
        initMobileDropdowns();
        
        // تحديث عداد الصفحات
        const totalPagesElement = document.getElementById('totalPages');
        if (totalPagesElement) {
            totalPagesElement.textContent = getTotalPagesCount();
        }
        
        console.log('✅ نظام التنقل جاهز!');
        console.log(`📊 إجمالي الصفحات: ${getTotalPagesCount()}`);
    });
}

// تصدير للاستخدام في ملفات أخرى
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SITE_PAGES,
        getTotalPagesCount,
        buildDropdownMenu,
        buildPageCards,
        toggleMobileNav,
        searchPages,
        openInNewTab
    };
}