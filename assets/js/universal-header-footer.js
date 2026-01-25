/**
 * نظام تحميل الهيدر والفوتر الثابت
 * Universal Header & Footer Loader
 * مؤسسة إعلانات العرب - ArabSad
 */

class UniversalHeaderFooter {
    constructor() {
        this.baseUrl = this.getBaseUrl();
        this.retryCount = 0;
        this.maxRetries = 3;
        this.init();
    }

    getBaseUrl() {
        const path = window.location.pathname;
        if (path.includes('/arabsad/')) {
            return '/arabsad';
        }
        return '';
    }

    async init() {
        try {
            await this.loadHeader();
            await this.loadFooter();
            this.adjustBodyPadding();
            this.initializeNavigation();
            console.log('✅ Header & Footer loaded successfully');
        } catch (error) {
            console.error('❌ Failed to load header/footer:', error);
            if (this.retryCount < this.maxRetries) {
                this.retryCount++;
                console.log(`🔄 Retrying... (${this.retryCount}/${this.maxRetries})`);
                setTimeout(() => this.init(), 1000);
            } else {
                console.log('🚨 Using fallback header/footer');
                this.createFallbackHeader();
                this.createFallbackFooter();
            }
        }
    }

    async loadHeader() {
        try {
            // البحث عن عنصر الهيدر أو إنشاؤه
            let headerContainer = document.querySelector('header') || 
                                document.querySelector('[data-include*="header"]') ||
                                document.getElementById('header');
            
            if (!headerContainer) {
                headerContainer = document.createElement('div');
                headerContainer.id = 'header-container';
                document.body.insertBefore(headerContainer, document.body.firstChild);
            }

            const response = await fetch(`${this.baseUrl}/shared-header.html`);
            if (response.ok) {
                const headerHTML = await response.text();
                headerContainer.innerHTML = headerHTML;
                
                // تحديث الروابط النسبية
                this.updateRelativeLinks(headerContainer);
            }
        } catch (error) {
            console.warn('تعذر تحميل الهيدر:', error);
            this.createFallbackHeader();
        }
    }

    async loadFooter() {
        try {
            // البحث عن عنصر الفوتر أو إنشاؤه
            let footerContainer = document.querySelector('footer') || 
                                document.querySelector('[data-include*="footer"]') ||
                                document.getElementById('footer');
            
            if (!footerContainer) {
                footerContainer = document.createElement('div');
                footerContainer.id = 'footer-container';
                document.body.appendChild(footerContainer);
            }

            const response = await fetch(`${this.baseUrl}/shared-footer.html`);
            if (response.ok) {
                const footerHTML = await response.text();
                footerContainer.innerHTML = footerHTML;
                
                // تحديث الروابط النسبية
                this.updateRelativeLinks(footerContainer);
            }
        } catch (error) {
            console.warn('تعذر تحميل الفوتر:', error);
            this.createFallbackFooter();
        }
    }

    updateRelativeLinks(container) {
        const links = container.querySelectorAll('a[href^="/arabsad/"]');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (!href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
                // الروابط صحيحة بالفعل
            }
        });
    }

    adjustBodyPadding() {
        // إضافة padding للـ body لتجنب تداخل الهيدر الثابت
        const header = document.querySelector('header');
        if (header) {
            const headerHeight = header.offsetHeight;
            document.body.style.paddingTop = `${headerHeight + 20}px`;
        }
    }

    initializeNavigation() {
        // تهيئة التنقل بعد تحميل الهيدر
        
        // تعريف دوال القائمة للموبايل
        window.toggleMobileMenu = function() {
            const menu = document.getElementById('mobile-menu');
            const icon = document.getElementById('hamburger-icon');
            
            if (menu && icon) {
                if (menu.style.display === 'none' || menu.style.display === '') {
                    menu.style.display = 'block';
                    icon.textContent = '✕';
                } else {
                    menu.style.display = 'none';
                    icon.textContent = '☰';
                }
            }
        };

        window.closeMobileMenu = function() {
            const menu = document.getElementById('mobile-menu');
            const icon = document.getElementById('hamburger-icon');
            if (menu && icon) {
                menu.style.display = 'none';
                icon.textContent = '☰';
            }
        };

        // إغلاق القائمة عند النقر خارجها
        document.addEventListener('click', function(event) {
            const menu = document.getElementById('mobile-menu');
            const btn = document.querySelector('.mobile-menu-btn');
            
            if (menu && btn && !menu.contains(event.target) && !btn.contains(event.target)) {
                if (menu.style.display === 'block') {
                    window.closeMobileMenu();
                }
            }
        });
    }

    createFallbackHeader() {
        const headerContainer = document.getElementById('header-container') || 
                              document.createElement('div');
        headerContainer.innerHTML = `
            <header style="position: fixed; top: 0; width: 100%; z-index: 1000; background: rgba(10, 14, 39, 0.95); backdrop-filter: blur(10px); padding: 1rem; border-bottom: 1px solid rgba(255, 184, 0, 0.1);">
                <div style="max-width: 1400px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center;">
                    <a href="${this.baseUrl}/" style="font-size: 1.5rem; font-weight: 800; color: #FFB800; text-decoration: none;">🌐 إعلانات العرب</a>
                    <nav style="display: flex; align-items: center; gap: 1.5rem;">
                        <a href="${this.baseUrl}/services/" style="color: #e8edf5; text-decoration: none; font-weight: 500;">الخدمات</a>
                        <a href="https://wa.me/201110760081" style="background: #FFB800; color: #000; padding: 0.7rem 1.2rem; border-radius: 25px; font-weight: 600; text-decoration: none;">📞 اتصل بنا</a>
                    </nav>
                </div>
            </header>
        `;
        
        if (!document.getElementById('header-container')) {
            document.body.insertBefore(headerContainer, document.body.firstChild);
        }
    }

    createFallbackFooter() {
        const footerContainer = document.getElementById('footer-container') || 
                              document.createElement('div');
        footerContainer.innerHTML = `
            <footer style="background: #1a1f3a; padding: 2rem; margin-top: 4rem; text-align: center;">
                <div style="max-width: 1200px; margin: 0 auto;">
                    <h3 style="color: #FFB800; margin-bottom: 1rem;">🌐 إعلانات العرب</h3>
                    <p style="color: #a8b3c1; margin-bottom: 1rem;">وكالة تسويق رقمي متخصصة في Google Ads وFacebook Ads وSEO</p>
                    <div style="display: flex; justify-content: center; gap: 2rem; margin-bottom: 1rem;">
                        <a href="https://wa.me/201110760081" style="color: #a8b3c1; text-decoration: none;">📱 واتساب</a>
                        <a href="mailto:info@arabsad.com" style="color: #a8b3c1; text-decoration: none;">📧 إيميل</a>
                    </div>
                    <p style="color: #a8b3c1;">&copy; 2026 إعلانات العرب - جميع الحقوق محفوظة</p>
                </div>
            </footer>
        `;
        
        if (!document.getElementById('footer-container')) {
            document.body.appendChild(footerContainer);
        }
    }
}

// تهيئة النظام عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    new UniversalHeaderFooter();
});

// تصدير للاستخدام في ملفات أخرى
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UniversalHeaderFooter;
}