// WhatsApp Page-Specific Message Generator
(function() {
    'use strict';
    
    if (window.__WA_PAGE_MSG_LOADED__) return;
    window.__WA_PAGE_MSG_LOADED__ = true;
    
    // Page-specific message templates
    const MESSAGE_TEMPLATES = {
        '/': 'مرحباً، أريد الاستفسار عن خدمات مؤسسة إعلانات العرب',
        '/services/': 'أريد معرفة المزيد عن خدماتكم التسويقية',
        '/services/google-ads.html': 'أريد بدء حملة Google Ads لمشروعي',
        '/services/seo.html': 'أريد تحسين موقعي في محركات البحث',
        '/services/social-media-ads.html': 'أريد إعلانات على وسائل التواصل الاجتماعي',
        '/services/ecommerce.html': 'أريد تصميم متجر إلكتروني احترافي',
        '/services/website-design.html': 'أريد تصميم موقع ويب احترافي',
        '/services/social-management.html': 'أريد إدارة حسابات السوشيال ميديا',
        '/services/contracting-services.html': 'أريد خدمات تسويق لشركة المقاولات',
        '/services/gulf-cities.html': 'أريد تسويق متخصص لمدن الخليج',
        '/sa.html': 'أريد خدمات تسويقية في السعودية',
        '/ae.html': 'أريد خدمات تسويقية في الإمارات',
        '/kw.html': 'أريد خدمات تسويقية في الكويت',
        '/qa.html': 'أريد خدمات تسويقية في قطر',
        '/bh.html': 'أريد خدمات تسويقية في البحرين',
        '/om.html': 'أريد خدمات تسويقية في عمان'
    };
    
    // Generate message based on current page
    function generateMessage() {
        const path = window.location.pathname.replace('/arabsad', '');
        const pageTitle = document.title;
        const currentUrl = window.location.href;
        
        let baseMessage = MESSAGE_TEMPLATES[path] || MESSAGE_TEMPLATES['/'];
        
        // Add page context
        const fullMessage = `${baseMessage}

📄 الصفحة: ${pageTitle}
🔗 الرابط: ${currentUrl}

أتطلع للتواصل معكم قريباً.`;
        
        return encodeURIComponent(fullMessage);
    }
    
    // Update WhatsApp links with dynamic messages
    function updateWhatsAppMessages() {
        try {
            const phone = window.ArabSadWA?.getPhone() || '201110760081';
            const message = generateMessage();
            const whatsappUrl = `https://wa.me/${phone}?text=${message}`;
            
            // Update all WhatsApp links
            const waLinks = document.querySelectorAll('a[href*="wa.me"], .whatsapp-btn, #whatsappFloat, #finalCta, [data-wa="true"]');
            waLinks.forEach(link => {
                link.setAttribute('href', whatsappUrl);
            });
            
            // Update any buttons with WhatsApp functionality
            const waButtons = document.querySelectorAll('[onclick*="wa.me"], [onclick*="whatsapp"]');
            waButtons.forEach(btn => {
                btn.setAttribute('onclick', `window.open('${whatsappUrl}', '_blank')`);
            });
            
        } catch (error) {
            console.warn('WhatsApp message update failed:', error);
        }
    }
    
    // Initialize
    function init() {
        // Wait for other scripts to load
        setTimeout(() => {
            updateWhatsAppMessages();
            
            // Re-update when page content changes
            const observer = new MutationObserver(() => {
                updateWhatsAppMessages();
            });
            
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }, 200);
    }
    
    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Export for global use
    window.ArabSadWA = window.ArabSadWA || {};
    window.ArabSadWA.generateMessage = generateMessage;
    window.ArabSadWA.updateMessages = updateWhatsAppMessages;
    
})();