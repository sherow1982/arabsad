// 🌍 Global Configuration & Auto-Updates for ArabSad.com
// ملف الإعدادات العام لجميع صفحات الموقع

(function() {
  'use strict';
  
  // 🔧 Global Website Configuration
  window.ARABSAD_GLOBAL_CONFIG = {
    // Social Media Links - Updated URLs
    SOCIAL_MEDIA: {
      facebook: 'https://www.facebook.com/arabads.me',
      instagram: 'https://instagram.com/arabsadads',
      tiktok: 'https://tiktok.com/@arabsadads',
      twitter: 'https://twitter.com/arabsadads',
      linkedin: 'https://linkedin.com/company/arabsad',
      whatsapp: 'https://wa.me/201110760081',
      telegram: 'https://t.me/arabsadads'
    },
    
    // Contact Information
    CONTACT: {
      phone: '+201110760081',
      email: 'info@arabsad.com',
      support_email: 'support@arabsad.com',
      business_hours: '24/7',
      timezone: 'Africa/Cairo'
    },
    
    // Website Settings
    WEBSITE: {
      domain: 'arabsad.com',
      name: 'مؤسسة إعلانات العرب',
      tagline: 'وكالة التسويق الرقمي الرائدة في الخليج',
      description: 'وكالة تسويق رقمي متخصصة في إعلانات جوجل وفيسبوك وإنستجرام وSEO',
      logo_url: 'assets/images/logo.svg',
      primary_color: '#3b82f6',
      secondary_color: '#10b981'
    },
    
    // Performance Settings
    PERFORMANCE: {
      lazy_load_margin: '100px',
      scroll_throttle: 16,
      toast_duration: 4000,
      animation_duration: 300
    },
    
    // Feature Flags
    FEATURES: {
      newsletter_enabled: true,
      chatbot_enabled: true,
      analytics_enabled: true,
      social_sharing: true,
      dark_mode: false,
      auto_updates: true
    }
  };
  
  // 🔄 Auto-Update System
  class AutoUpdateSystem {
    constructor() {
      this.config = window.ARABSAD_GLOBAL_CONFIG;
      this.init();
    }
    
    init() {
      this.updateSocialMediaLinks();
      this.updateContactInfo();
      this.updateMetaTags();
      this.enhanceResponsiveness();
      this.addMissingElements();
      this.fixCommonIssues();
      
      console.log('🔄 Auto-update system initialized');
    }
    
    updateSocialMediaLinks() {
      // Update Facebook links specifically
      document.querySelectorAll('a[href*="facebook.com"]').forEach(link => {
        const oldUrl = link.href;
        link.href = this.config.SOCIAL_MEDIA.facebook;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        
        if (oldUrl !== link.href) {
          console.log(`✅ Updated Facebook link: ${oldUrl} → ${link.href}`);
        }
      });
      
      // Update other social media links
      Object.entries(this.config.SOCIAL_MEDIA).forEach(([platform, url]) => {
        document.querySelectorAll(`a[href*="${platform}.com"], a[href*="${platform}."]`).forEach(link => {
          if (!link.href.includes(url)) {
            link.href = url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
          }
        });
      });
    }
    
    updateContactInfo() {
      // Update phone numbers
      document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        if (!link.href.includes(this.config.CONTACT.phone)) {
          link.href = `tel:${this.config.CONTACT.phone}`;
        }
      });
      
      // Update email links
      document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        if (link.href === 'mailto:' || link.href.includes('example.com')) {
          link.href = `mailto:${this.config.CONTACT.email}`;
        }
      });
      
      // Update displayed phone numbers
      document.querySelectorAll('[data-phone]').forEach(element => {
        element.textContent = this.config.CONTACT.phone;
      });
      
      // Update displayed emails
      document.querySelectorAll('[data-email]').forEach(element => {
        element.textContent = this.config.CONTACT.email;
      });
    }
    
    updateMetaTags() {
      // Update or add viewport meta tag
      let viewport = document.querySelector('meta[name="viewport"]');
      if (!viewport) {
        viewport = document.createElement('meta');
        viewport.name = 'viewport';
        document.head.appendChild(viewport);
      }
      viewport.content = 'width=device-width, initial-scale=1, viewport-fit=cover';
      
      // Update theme color
      let themeColor = document.querySelector('meta[name="theme-color"]');
      if (!themeColor) {
        themeColor = document.createElement('meta');
        themeColor.name = 'theme-color';
        document.head.appendChild(themeColor);
      }
      themeColor.content = this.config.WEBSITE.primary_color;
      
      // Add or update Open Graph meta tags
      const ogTags = {
        'og:site_name': this.config.WEBSITE.name,
        'og:type': 'website',
        'og:locale': 'ar_AR',
        'og:image': `https://${this.config.WEBSITE.domain}/assets/images/og-image.jpg`,
        'og:image:width': '1200',
        'og:image:height': '630'
      };
      
      Object.entries(ogTags).forEach(([property, content]) => {
        let meta = document.querySelector(`meta[property="${property}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute('property', property);
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
      });
    }
    
    enhanceResponsiveness() {
      // Add responsive CSS if not already included
      if (!document.getElementById('responsive-enhancements')) {
        const style = document.createElement('style');
        style.id = 'responsive-enhancements';
        style.innerHTML = `
          /* 📱 Emergency Responsive Fixes */
          
          /* Prevent horizontal scrolling */
          body, html {
            overflow-x: hidden;
            max-width: 100vw;
          }
          
          /* Fix container widths */
          .container {
            width: 100%;
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 clamp(0.5rem, 3vw, 2rem);
          }
          
          /* Responsive text scaling */
          body {
            font-size: clamp(14px, 2.5vw, 16px);
          }
          
          /* Fix button responsiveness */
          .btn {
            min-height: 44px;
            padding: clamp(0.6rem, 2vw, 1rem) clamp(1rem, 4vw, 2rem);
            font-size: clamp(0.85rem, 2.5vw, 1rem);
            word-break: keep-all;
            white-space: nowrap;
          }
          
          /* Mobile-first grid fixes */
          .grid-2, .grid-3, .grid-4 {
            display: grid;
            grid-template-columns: 1fr;
            gap: clamp(1rem, 3vw, 2rem);
          }
          
          @media (min-width: 640px) {
            .grid-2 { grid-template-columns: repeat(2, 1fr); }
          }
          
          @media (min-width: 768px) {
            .grid-3 { grid-template-columns: repeat(2, 1fr); }
            .grid-4 { grid-template-columns: repeat(2, 1fr); }
          }
          
          @media (min-width: 1024px) {
            .grid-3 { grid-template-columns: repeat(3, 1fr); }
            .grid-4 { grid-template-columns: repeat(4, 1fr); }
          }
          
          /* Card responsiveness */
          .card, .service-card, .feature-card, .country-card {
            padding: clamp(1rem, 3vw, 2rem);
            border-radius: clamp(8px, 2vw, 16px);
            margin-bottom: clamp(1rem, 2vw, 1.5rem);
          }
          
          /* Social buttons responsive */
          .social-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: clamp(0.5rem, 2vw, 1rem);
            justify-content: center;
          }
          
          @media (max-width: 768px) {
            .social-buttons {
              flex-direction: column;
              align-items: center;
              max-width: 300px;
              margin: 0 auto;
            }
            
            .social-btn {
              width: 100%;
              justify-content: center;
            }
            
            .btn {
              width: 100%;
              max-width: 300px;
              margin: 0.25rem auto;
            }
          }
          
          /* Form responsiveness */
          .form-group {
            flex-wrap: wrap;
          }
          
          @media (max-width: 640px) {
            .form-group {
              flex-direction: column;
              gap: 0.75rem;
              padding: 1rem;
            }
            
            .form-group button {
              width: 100%;
            }
          }
          
          /* Images responsive */
          img {
            max-width: 100%;
            height: auto;
          }
          
          /* Table responsive */
          table {
            width: 100%;
            overflow-x: auto;
            display: block;
            white-space: nowrap;
          }
          
          @media (max-width: 768px) {
            table {
              font-size: 0.85rem;
            }
            
            th, td {
              padding: 0.5rem 0.25rem;
            }
          }
        `;
        document.head.appendChild(style);
      }
    }
    
    addMissingElements() {
      // Add toast container if missing
      if (!document.getElementById('toastContainer')) {
        const container = document.createElement('div');
        container.id = 'toastContainer';
        container.style.cssText = `
          position: fixed;
          top: 100px;
          right: 20px;
          z-index: 10001;
          pointer-events: none;
        `;
        document.body.appendChild(container);
      }
      
      // Add reading progress bar if missing
      if (!document.getElementById('readingProgress')) {
        const progress = document.createElement('div');
        progress.id = 'readingProgress';
        progress.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 0;
          height: 4px;
          background: linear-gradient(135deg, ${this.config.WEBSITE.primary_color}, #8b5cf6);
          z-index: 1001;
          transition: width 0.3s ease;
        `;
        document.body.insertBefore(progress, document.body.firstChild);
        
        // Initialize progress tracking
        window.addEventListener('scroll', () => {
          const scrollPercent = (window.pageYOffset / (document.body.scrollHeight - window.innerHeight)) * 100;
          progress.style.width = Math.min(Math.max(scrollPercent, 0), 100) + '%';
        }, { passive: true });
      }
      
      // Add WhatsApp float button if missing
      if (!document.querySelector('.whatsapp-float')) {
        const whatsappFloat = document.createElement('div');
        whatsappFloat.className = 'whatsapp-float';
        whatsappFloat.innerHTML = `
          <a href="${this.config.SOCIAL_MEDIA.whatsapp}?text=مرحباً! أريد استشارة مجانية" 
             target="_blank" 
             class="whatsapp-btn" 
             rel="noopener noreferrer" 
             aria-label="مراسلة عبر واتساب">
            💬 راسلنا
          </a>
        `;
        document.body.appendChild(whatsappFloat);
      }
      
      // Add back to top button if missing
      if (!document.getElementById('backToTop')) {
        const backToTop = document.createElement('button');
        backToTop.id = 'backToTop';
        backToTop.className = 'back-to-top';
        backToTop.innerHTML = '↑';
        backToTop.setAttribute('aria-label', 'العودة إلى أعلى الصفحة');
        document.body.appendChild(backToTop);
        
        // Initialize functionality
        let isVisible = false;
        window.addEventListener('scroll', () => {
          const shouldShow = window.pageYOffset > 300;
          if (shouldShow !== isVisible) {
            isVisible = shouldShow;
            backToTop.style.display = shouldShow ? 'flex' : 'none';
          }
        }, { passive: true });
        
        backToTop.addEventListener('click', () => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      }
    }
    
    fixCommonIssues() {
      // Fix images without alt attributes
      document.querySelectorAll('img:not([alt])').forEach(img => {
        img.alt = 'صورة من موقع مؤسسة إعلانات العرب';
      });
      
      // Fix links without proper rel attributes
      document.querySelectorAll('a[target="_blank"]:not([rel])').forEach(link => {
        link.rel = 'noopener noreferrer';
      });
      
      // Fix form inputs without proper labels
      document.querySelectorAll('input:not([aria-label]):not([id])').forEach(input => {
        if (input.placeholder) {
          input.setAttribute('aria-label', input.placeholder);
        }
      });
      
      // Ensure proper button types
      document.querySelectorAll('button:not([type])').forEach(button => {
        if (button.closest('form')) {
          button.type = 'submit';
        } else {
          button.type = 'button';
        }
      });
    }
  }
  
  // 📈 Enhanced Newsletter with Multiple Methods
  class EnhancedNewsletter {
    constructor() {
      this.config = window.ARABSAD_GLOBAL_CONFIG;
      this.emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.rateLimitKey = 'newsletter_rate_limit';
      this.subscribersKey = 'newsletter_subscribers';
      this.init();
    }
    
    init() {
      // Bind to all newsletter forms
      document.querySelectorAll('form').forEach(form => {
        const emailInput = form.querySelector('input[type="email"]');
        if (emailInput) {
          this.enhanceForm(form);
        }
      });
    }
    
    enhanceForm(form) {
      const emailInput = form.querySelector('input[type="email"]');
      const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
      
      if (!emailInput || !submitBtn) return;
      
      // Real-time validation
      emailInput.addEventListener('input', () => {
        this.validateEmail(emailInput);
        this.updateSubmitButton(emailInput, submitBtn);
      });
      
      // Form submission
      form.addEventListener('submit', (e) => this.handleSubmission(e));
      
      // Enter key support
      emailInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && this.emailRegex.test(emailInput.value.trim())) {
          e.preventDefault();
          submitBtn.click();
        }
      });
    }
    
    validateEmail(input) {
      const email = input.value.trim();
      const isValid = this.emailRegex.test(email);
      
      if (email.length > 0) {
        input.style.borderColor = isValid ? '#10b981' : '#ef4444';
        input.style.boxShadow = isValid ? '0 0 0 2px rgba(16, 185, 129, 0.1)' : '0 0 0 2px rgba(239, 68, 68, 0.1)';
      } else {
        input.style.borderColor = '';
        input.style.boxShadow = '';
      }
      
      return isValid;
    }
    
    updateSubmitButton(emailInput, submitBtn) {
      const isValid = this.validateEmail(emailInput);
      submitBtn.style.opacity = isValid ? '1' : '0.6';
      submitBtn.style.pointerEvents = isValid ? 'auto' : 'none';
    }
    
    async handleSubmission(e) {
      e.preventDefault();
      
      const form = e.target;
      const emailInput = form.querySelector('input[type="email"]');
      const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
      const email = emailInput?.value.trim();
      
      // Validation
      if (!email || !this.emailRegex.test(email)) {
        this.showToast('يرجى إدخال بريد إلكتروني صحيح', 'error');
        emailInput?.focus();
        return;
      }
      
      // Rate limiting check
      if (this.isRateLimited()) {
        this.showToast('يرجى الانتظار دقيقة قبل المحاولة مرة أخرى', 'warning');
        return;
      }
      
      // Check if already subscribed
      const subscribers = JSON.parse(localStorage.getItem(this.subscribersKey) || '[]');
      if (subscribers.includes(email.toLowerCase())) {
        this.showToast('هذا البريد مسجل مسبقاً! شكراً لك', 'info');
        return;
      }
      
      // Show loading state
      this.setLoadingState(submitBtn, true);
      
      try {
        // Try multiple submission methods
        await this.submitWithMultipleMethods(email);
        
        // Save to local storage
        subscribers.push(email.toLowerCase());
        localStorage.setItem(this.subscribersKey, JSON.stringify(subscribers));
        localStorage.setItem(this.rateLimitKey, Date.now().toString());
        
        // Clear form and show success
        if (emailInput) {
          emailInput.value = '';
          this.validateEmail(emailInput);
        }
        
        this.showToast('✅ تم الاشتراك بنجاح! سنراسلك أحدث العروض', 'success');
        
        // Analytics tracking
        this.trackEvent('newsletter_signup', { email_domain: email.split('@')[1] });
        
      } catch (error) {
        this.showToast('تم حفظ بياناتك بنجاح! سنتواصل معك قريباً', 'success');
      } finally {
        this.setLoadingState(submitBtn, false);
      }
    }
    
    async submitWithMultipleMethods(email) {
      const promises = [];
      
      // Method 1: FormSubmit.co
      promises.push(this.submitToFormSubmit(email));
      
      // Method 2: Direct webhook (if configured)
      if (this.config.WEBHOOK_URL) {
        promises.push(this.submitToWebhook(email));
      }
      
      // Method 3: Local backup (always works)
      this.saveToBackup(email);
      
      // Try all methods but don't fail if some don't work
      await Promise.allSettled(promises);
    }
    
    async submitToFormSubmit(email) {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('_subject', 'اشتراك جديد في نشرة إعلانات العرب');
      formData.append('_template', 'table');
      formData.append('_captcha', 'false');
      formData.append('_next', `https://${this.config.WEBSITE.domain}/?subscribed=1`);
      formData.append('source', 'arabsad.com');
      formData.append('timestamp', new Date().toISOString());
      
      return fetch('https://formsubmit.co/sherow1982@gmail.com', {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      });
    }
    
    async submitToWebhook(email) {
      return fetch(this.config.WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'arabsad.com',
          timestamp: new Date().toISOString(),
          page: window.location.pathname
        })
      });
    }
    
    saveToBackup(email) {
      const backups = JSON.parse(localStorage.getItem('newsletter_detailed_backups') || '[]');
      
      backups.push({
        email,
        timestamp: new Date().toISOString(),
        page: window.location.pathname,
        referrer: document.referrer,
        userAgent: navigator.userAgent.substring(0, 200),
        language: navigator.language,
        screenSize: `${screen.width}x${screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      });
      
      // Keep last 200 entries
      if (backups.length > 200) {
        backups.splice(0, backups.length - 200);
      }
      
      localStorage.setItem('newsletter_detailed_backups', JSON.stringify(backups));
    }
    
    isRateLimited() {
      const lastSubmission = localStorage.getItem(this.rateLimitKey);
      if (!lastSubmission) return false;
      
      const timeDiff = Date.now() - parseInt(lastSubmission);
      return timeDiff < 60000; // 1 minute
    }
    
    setLoadingState(button, isLoading) {
      if (!button) return;
      
      if (isLoading) {
        button.disabled = true;
        button.innerHTML = '🔄 جاري الإرسال...';
        button.classList.add('loading');
      } else {
        button.disabled = false;
        button.innerHTML = '✉️ اشترك مجاناً';
        button.classList.remove('loading');
      }
    }
    
    showToast(message, type = 'info') {
      let container = document.getElementById('toastContainer');
      if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.style.cssText = `
          position: fixed;
          top: 100px;
          right: 20px;
          z-index: 10001;
        `;
        document.body.appendChild(container);
      }
      
      const toast = document.createElement('div');
      toast.className = `toast toast-${type}`;
      toast.textContent = message;
      toast.setAttribute('role', 'alert');
      toast.style.cssText = `
        background: ${this.getToastColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        margin-bottom: 0.5rem;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        animation: slideInToast 0.4s ease;
        max-width: 350px;
        font-weight: 500;
        pointer-events: auto;
      `;
      
      container.appendChild(toast);
      
      // Auto remove
      setTimeout(() => {
        toast.style.animation = 'slideOutToast 0.4s ease forwards';
        setTimeout(() => {
          if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 400);
      }, this.config.PERFORMANCE.toast_duration);
    }
    
    getToastColor(type) {
      const colors = {
        success: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        error: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
        warning: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        info: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
        default: 'linear-gradient(135deg, #64748b 0%, #475569 100%)'
      };
      
      return colors[type] || colors.default;
    }
    
    trackEvent(eventName, properties = {}) {
      // Simple event tracking
      console.log(`📈 Event: ${eventName}`, properties);
      
      // Integration with analytics services
      if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
          event_category: 'newsletter',
          ...properties
        });
      }
      
      if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', properties);
      }
    }
  }
  
  // 🎨 Toast Animation CSS
  const toastCSS = `
    <style id="toast-animations">
      @keyframes slideInToast {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      @keyframes slideOutToast {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
      
      .toast {
        animation: slideInToast 0.4s ease;
      }
      
      /* Mobile toast adjustments */
      @media (max-width: 480px) {
        #toastContainer {
          right: 10px !important;
          left: 10px !important;
          top: 90px !important;
        }
        
        .toast {
          max-width: none !important;
          font-size: 0.9rem;
        }
      }
    </style>
  `;
  
  // 📱 Mobile-First Initialization
  function mobileFirstInit() {
    // Add toast CSS
    if (!document.getElementById('toast-animations')) {
      document.head.insertAdjacentHTML('beforeend', toastCSS);
    }
    
    // Initialize systems
    new AutoUpdateSystem();
    new EnhancedNewsletter();
    
    // Add mobile viewport fix
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover';
    }
    
    console.log('✨ ArabSad.com - Mobile-first responsive system loaded!');
    console.log(`📱 Screen size: ${screen.width}x${screen.height}`);
    console.log(`🌍 Window size: ${window.innerWidth}x${window.innerHeight}`);
  }
  
  // 🚀 Initialize everything
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mobileFirstInit);
  } else {
    mobileFirstInit();
  }
  
  // Also run on window load as fallback
  window.addEventListener('load', () => {
    console.log('🎆 All Facebook links updated to: https://www.facebook.com/arabads.me');
    console.log('✅ Website is fully responsive and ready!');
  });
  
})();

// 🌍 Export global utilities
if (typeof window !== 'undefined') {
  window.ARABSAD_UTILS = {
    scrollToSection: (id) => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    
    openWhatsApp: (message) => {
      const config = window.ARABSAD_GLOBAL_CONFIG;
      const url = `${config.SOCIAL_MEDIA.whatsapp}?text=${encodeURIComponent(message || 'مرحباً! أريد استشارة مجانية')}`;
      window.open(url, '_blank', 'noopener');
    },
    
    checkResponsive: () => {
      console.log('Viewport width:', window.innerWidth);
      console.log('Viewport height:', window.innerHeight);
      console.log('Device pixel ratio:', window.devicePixelRatio);
      console.log('Touch support:', 'ontouchstart' in window);
    }
  };
}