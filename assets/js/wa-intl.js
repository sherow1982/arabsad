// WhatsApp International Enhancement Script
(function() {
    'use strict';
    
    if (window.__WA_INTL_LOADED__) return;
    window.__WA_INTL_LOADED__ = true;
    
    // Phone number configuration
    const PHONE_CONFIG = {
        default: '201110760081',
        countries: {
            'SA': '201110760081', // Saudi Arabia
            'AE': '201110760081', // UAE
            'KW': '201110760081', // Kuwait
            'QA': '201110760081', // Qatar
            'BH': '201110760081', // Bahrain
            'OM': '201110760081', // Oman
            'EG': '201110760081'  // Egypt
        }
    };
    
    // Detect user country (simplified)
    function detectCountry() {
        try {
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const countryMap = {
                'Asia/Riyadh': 'SA',
                'Asia/Dubai': 'AE',
                'Asia/Kuwait': 'KW',
                'Asia/Qatar': 'QA',
                'Asia/Bahrain': 'BH',
                'Asia/Muscat': 'OM',
                'Africa/Cairo': 'EG'
            };
            return countryMap[timezone] || 'default';
        } catch (e) {
            return 'default';
        }
    }
    
    // Get appropriate phone number
    function getPhoneNumber() {
        const country = detectCountry();
        return PHONE_CONFIG.countries[country] || PHONE_CONFIG.default;
    }
    
    // Update WhatsApp links
    function updateWhatsAppLinks() {
        const phone = getPhoneNumber();
        const links = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]');
        
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.includes('wa.me')) {
                // Update phone number in existing WhatsApp links
                const updatedHref = href.replace(/wa\.me\/\d+/, `wa.me/${phone}`);
                link.setAttribute('href', updatedHref);
            }
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateWhatsAppLinks);
    } else {
        updateWhatsAppLinks();
    }
    
    // Export for global use
    window.ArabSadWA = window.ArabSadWA || {};
    window.ArabSadWA.getPhone = getPhoneNumber;
    window.ArabSadWA.updateLinks = updateWhatsAppLinks;
    
})();