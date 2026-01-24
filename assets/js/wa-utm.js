// WhatsApp UTM Tracking Enhancement
(function() {
    'use strict';
    
    if (window.__WA_UTM_LOADED__) return;
    window.__WA_UTM_LOADED__ = true;
    
    // UTM parameter extraction
    function getUTMParams() {
        const urlParams = new URLSearchParams(window.location.search);
        return {
            source: urlParams.get('utm_source') || 'direct',
            medium: urlParams.get('utm_medium') || 'website',
            campaign: urlParams.get('utm_campaign') || 'organic',
            term: urlParams.get('utm_term') || '',
            content: urlParams.get('utm_content') || ''
        };
    }
    
    // Referrer detection
    function getReferrerInfo() {
        const referrer = document.referrer;
        if (!referrer) return 'direct';
        
        try {
            const referrerDomain = new URL(referrer).hostname;
            
            // Common referrer mapping
            const referrerMap = {
                'google.com': 'Google Search',
                'google.sa': 'Google Saudi',
                'google.ae': 'Google UAE',
                'facebook.com': 'Facebook',
                'instagram.com': 'Instagram',
                'twitter.com': 'Twitter',
                'linkedin.com': 'LinkedIn',
                'youtube.com': 'YouTube',
                'tiktok.com': 'TikTok',
                'snapchat.com': 'Snapchat'
            };
            
            for (const [domain, name] of Object.entries(referrerMap)) {
                if (referrerDomain.includes(domain)) {
                    return name;
                }
            }
            
            return referrerDomain;
        } catch (e) {
            return 'unknown';
        }
    }
    
    // Enhanced message with tracking
    function enhanceMessageWithTracking(baseMessage) {
        const utm = getUTMParams();
        const referrer = getReferrerInfo();
        const timestamp = new Date().toLocaleString('ar-SA', {
            timeZone: 'Asia/Riyadh',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        let trackingInfo = '';
        
        // Add UTM info if available
        if (utm.source !== 'direct' || utm.campaign !== 'organic') {
            trackingInfo += `\n📊 مصدر الزيارة: ${utm.source}`;
            if (utm.campaign !== 'organic') {
                trackingInfo += `\n🎯 الحملة: ${utm.campaign}`;
            }
        }
        
        // Add referrer info
        if (referrer !== 'direct') {
            trackingInfo += `\n🔗 جاء من: ${referrer}`;
        }
        
        // Add timestamp
        trackingInfo += `\n⏰ وقت التواصل: ${timestamp}`;
        
        return baseMessage + trackingInfo;
    }
    
    // Store visitor info for analytics
    function storeVisitorInfo() {
        try {
            const visitorData = {
                utm: getUTMParams(),
                referrer: getReferrerInfo(),
                page: window.location.pathname,
                timestamp: Date.now(),
                userAgent: navigator.userAgent.substring(0, 100) // Truncated for privacy
            };
            
            // Store in localStorage for potential analytics
            const visits = JSON.parse(localStorage.getItem('arabsad_visits') || '[]');
            visits.push(visitorData);
            
            // Keep only last 10 visits
            if (visits.length > 10) {
                visits.splice(0, visits.length - 10);
            }
            
            localStorage.setItem('arabsad_visits', JSON.stringify(visits));
        } catch (e) {
            // Fail silently if localStorage is not available
        }
    }
    
    // Enhanced WhatsApp link generation
    function generateTrackedWhatsAppLink() {
        try {
            const phone = window.ArabSadWA?.getPhone() || '201110760081';
            const baseMessage = window.ArabSadWA?.generateMessage() || 'مرحباً، أريد الاستفسار عن خدماتكم';
            
            // Decode the base message first
            const decodedMessage = decodeURIComponent(baseMessage);
            const enhancedMessage = enhanceMessageWithTracking(decodedMessage);
            const encodedMessage = encodeURIComponent(enhancedMessage);
            
            return `https://wa.me/${phone}?text=${encodedMessage}`;
        } catch (error) {
            console.warn('WhatsApp tracking enhancement failed:', error);
            return `https://wa.me/201110760081?text=${encodeURIComponent('مرحباً، أريد الاستفسار عن خدماتكم')}`;
        }
    }
    
    // Update all WhatsApp links with tracking
    function updateTrackedLinks() {
        const trackedUrl = generateTrackedWhatsAppLink();
        
        // Update all WhatsApp-related elements
        const elements = document.querySelectorAll(`
            a[href*="wa.me"],
            a[href*="whatsapp"],
            .whatsapp-btn,
            #whatsappFloat,
            #finalCta,
            [data-wa="true"],
            .btn[href*="wa.me"]
        `);
        
        elements.forEach(el => {
            el.setAttribute('href', trackedUrl);
        });
    }
    
    // Initialize tracking
    function initTracking() {
        // Store visitor info
        storeVisitorInfo();
        
        // Wait for other WhatsApp scripts to load
        setTimeout(() => {
            updateTrackedLinks();
            
            // Update links when content changes
            const observer = new MutationObserver(() => {
                updateTrackedLinks();
            });
            
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }, 300);
    }
    
    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTracking);
    } else {
        initTracking();
    }
    
    // Export for global use
    window.ArabSadWA = window.ArabSadWA || {};
    window.ArabSadWA.getUTM = getUTMParams;
    window.ArabSadWA.getReferrer = getReferrerInfo;
    window.ArabSadWA.generateTrackedLink = generateTrackedWhatsAppLink;
    
})();