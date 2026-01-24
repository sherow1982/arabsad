/**
 * محسن تحميل الصور
 * Image Loading Optimizer
 * مؤسسة إعلانات العرب - ArabSad
 */

class ImageOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.setupLazyLoading();
        this.preloadCriticalImages();
        this.handleImageErrors();
        this.addLoadingStates();
    }

    setupLazyLoading() {
        // Intersection Observer للصور
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    this.loadImage(img);
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        // مراقبة جميع الصور مع loading="lazy"
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    loadImage(img) {
        const src = img.getAttribute('src');
        if (!src) return;

        // إنشاء صورة جديدة للتحميل المسبق
        const imageLoader = new Image();
        
        imageLoader.onload = () => {
            img.classList.add('loaded');
            img.style.opacity = '1';
        };

        imageLoader.onerror = () => {
            this.handleImageError(img);
        };

        imageLoader.src = src;
    }

    preloadCriticalImages() {
        // تحميل مسبق للصور المهمة
        const criticalImages = [
            'assets/images/بانر الصفحة الرئيسية.jpg',
            'assets/images/logo-arabsad.png'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    handleImageErrors() {
        document.addEventListener('error', (e) => {
            if (e.target.tagName === 'IMG') {
                this.handleImageError(e.target);
            }
        }, true);
    }

    handleImageError(img) {
        const fallbackSrc = this.getFallbackImage(img.src);
        if (fallbackSrc && img.src !== fallbackSrc) {
            img.src = fallbackSrc;
            console.log(`🔄 Fallback image loaded for: ${img.alt}`);
        } else {
            // إخفاء الصورة إذا فشل التحميل
            img.style.display = 'none';
            console.warn(`❌ Image failed to load: ${img.src}`);
        }
    }

    getFallbackImage(originalSrc) {
        // خريطة الصور البديلة
        const fallbackMap = {
            'google-ads-service.png': 'assets/images/خدمات اعلانات جوجل.jpg',
            'seo-service.png': 'assets/images/سيو.jpg',
            'social-media-service.png': 'assets/images/وسائل التواصل.jpg',
            'ecommerce-service.png': 'assets/images/التجارة الالكترونية.jpg',
            'website-service.png': 'assets/images/مواقع.jpg'
        };

        for (const [missing, fallback] of Object.entries(fallbackMap)) {
            if (originalSrc.includes(missing)) {
                return fallback;
            }
        }

        return null;
    }

    addLoadingStates() {
        // إضافة حالة التحميل للصور
        document.querySelectorAll('img').forEach(img => {
            if (!img.complete) {
                img.style.opacity = '0';
                img.addEventListener('load', () => {
                    img.style.opacity = '1';
                });
            }
        });
    }
}

// تهيئة محسن الصور عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    new ImageOptimizer();
});

// تصدير للاستخدام في ملفات أخرى
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ImageOptimizer;
}