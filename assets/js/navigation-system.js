/**
 * نظام التنقل الشامل لموقع إعلانات العرب
 * يدير القوائم المنسدلة والبطاقات التفاعلية
 */

// بيانات جميع صفحات الموقع
const SITE_PAGES = {
    main: [
        { name: 'الرئيسية', url: '/arabsad/index.html', icon: 'fa-home' }
    ],
    services: [
        { name: 'جميع الخدمات', url: '/arabsad/services/index.html', icon: 'fa-list', desc: 'تصفح كافة خدماتنا الرقمية في مكان واحد' },
        { name: 'إعلانات Google Ads', url: '/arabsad/services/google-ads.html', icon: 'fab fa-google', desc: 'تصدر نتائج البحث وحقق مبيعات فورية' },
        { name: 'SEO تحسين محركات البحث', url: '/arabsad/services/seo.html', icon: 'fa-search', desc: 'زيارات مجانية مستدامة من جوجل' },
        { name: 'المتاجر الإلكترونية', url: '/arabsad/services/ecommerce.html', icon: 'fa-shopping-cart', desc: 'تصميم متاجر احترافية تبيع 24/7' },
        { name: 'بديل خرائط جوجل', url: '/arabsad/services/safahat-al5dmat.html', icon: 'fa-map-marked-alt', desc: 'صفحات هبوط خاصة تغنيك عن مشاكل الخرائط' },
        { name: 'إدارة السوشيال ميديا', url: '/arabsad/services/social-media-ads.html', icon: 'fa-hashtag', desc: 'حملات إعلانية على فيسبوك، انستجرام، وتيك توك' },
        { name: 'تصميم المواقع', url: '/arabsad/services/website-design.html', icon: 'fa-palette', desc: 'مواقع تعريفية تعكس احترافية نشاطك' },
        { name: 'إدارة الحسابات', url: '/arabsad/services/social-management.html', icon: 'fa-users', desc: 'إدارة شاملة لحسابات التواصل الاجتماعي' }
    ],
    countries: [
        { name: 'السعودية 🇸🇦', url: '/arabsad/sa.html', icon: 'fa-map-marker-alt' },
        { name: 'الإمارات 🇦🇪', url: '/arabsad/ae.html', icon: 'fa-map-marker-alt' },
        { name: 'الكويت 🇰🇼', url: '/arabsad/kw.html', icon: 'fa-map-marker-alt' },
        { name: 'قطر 🇶🇦', url: '/arabsad/qa.html', icon: 'fa-map-marker-alt' },
        { name: 'البحرين 🇧🇭', url: '/arabsad/bh.html', icon: 'fa-map-marker-alt' },
        { name: 'عمان 🇴🇲', url: '/arabsad/om.html', icon: 'fa-map-marker-alt' }
    ],
    tools: [
        { name: 'لوحة التحليلات', url: '/arabsad/analytics-dashboard.html', icon: 'fa-chart-bar' },
        { name: 'Chatbot', url: '/arabsad/chatbot.html', icon: 'fa-robot' },
        { name: 'Google Ads', url: '/arabsad/google-ads.html', icon: 'fab fa-google' },
        { name: 'إدارة السوشيال ميديا', url: '/arabsad/social-media-management.html', icon: 'fa-users' },
        { name: 'قائمة الخدمات', url: '/arabsad/services-page.html', icon: 'fa-concierge-bell' }
    ],
    legal: [
        { name: 'سياسة الخصوصية', url: '/arabsad/privacy-policy.html', icon: 'fa-shield-alt' },
        { name: 'شروط الخدمة', url: '/arabsad/terms-of-service.html', icon: 'fa-file-contract' }
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