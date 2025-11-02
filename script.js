// 🚀 Enhanced JavaScript for ArabSad.com - Fully Responsive
// مؤسسة إعلانات العرب - البرمجة المحسنة والمتجاوبة
(function() {
  'use strict';
  
  // 🎨 Global Configuration
  const CONFIG = {
    SOCIAL_MEDIA: {
      facebook: 'https://www.facebook.com/arabads.me',
      instagram: 'https://instagram.com/arabsadads',
      tiktok: 'https://tiktok.com/@arabsadads',
      twitter: 'https://twitter.com/arabsadads',
      linkedin: 'https://linkedin.com/company/arabsad',
      whatsapp: 'https://wa.me/201110760081'
    },
    SCROLL_THRESHOLD: 300,
    ANIMATION_DURATION: 300,
    TOAST_DURATION: 4000
  };
  
  // 🗺️ DOM Cache
  const DOM = {
    topBtn: null,
    navToggle: null,
    navMenu: null,
    progress: null,
    toastContainer: null
  };
  
  // 🎯 Utility Functions
  const Utils = {
    debounce: (func, wait) => {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    },
    
    throttle: (func, delay) => {
      let timeoutId;
      let lastExecTime = 0;
      return function (...args) {
        const currentTime = Date.now();
        if (currentTime - lastExecTime > delay) {
          func.apply(this, args);
          lastExecTime = currentTime;
        } else {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            func.apply(this, args);
            lastExecTime = Date.now();
          }, delay - (currentTime - lastExecTime));
        }
      };
    },
    
    isValidEmail: (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  };
  
  // 📱 Social Media Links Manager
  const SocialMediaManager = {
    init() {
      this.updateAllSocialLinks();
      this.createSocialSection();
    },
    
    updateAllSocialLinks() {
      // Update Facebook links
      document.querySelectorAll('a[href*="facebook.com"]').forEach(link => {
        link.href = CONFIG.SOCIAL_MEDIA.facebook;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      });
      
      // Update Instagram links
      document.querySelectorAll('a[href*="instagram.com"]').forEach(link => {
        link.href = CONFIG.SOCIAL_MEDIA.instagram;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      });
      
      // Update TikTok links
      document.querySelectorAll('a[href*="tiktok.com"]').forEach(link => {
        link.href = CONFIG.SOCIAL_MEDIA.tiktok;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      });
      
      console.log('✅ All social media links updated successfully');
    },
    
    createSocialSection() {
      // Check if social section exists
      if (document.querySelector('.social-follow') || document.querySelector('.social-buttons')) {
        return;
      }
      
      // Create social section for pages that don't have it
      const socialHTML = `
        <section class="section social-follow">
          <div class="container">
            <h3>تابعنا على وسائل التواصل</h3>
            <div class="social-buttons">
              <a href="${CONFIG.SOCIAL_MEDIA.whatsapp}?text=تابعتكم من الموقع" target="_blank" class="social-btn whatsapp" rel="noopener noreferrer">
                <span class="social-icon">💬</span>
                واتساب
              </a>
              <a href="${CONFIG.SOCIAL_MEDIA.facebook}" target="_blank" class="social-btn facebook" rel="noopener noreferrer">
                <span class="social-icon">📘</span>
                فيسبوك
              </a>
              <a href="${CONFIG.SOCIAL_MEDIA.instagram}" target="_blank" class="social-btn instagram" rel="noopener noreferrer">
                <span class="social-icon">📷</span>
                إنستجرام
              </a>
              <a href="${CONFIG.SOCIAL_MEDIA.tiktok}" target="_blank" class="social-btn tiktok" rel="noopener noreferrer">
                <span class="social-icon">🎵</span>
                تيك توك
              </a>
            </div>
          </div>
        </section>
      `;
      
      // Insert social section
      const main = document.querySelector('main') || document.querySelector('.container');
      if (main && main.children.length > 0) {
        main.insertAdjacentHTML('afterbegin', socialHTML);
      }
    }
  };
  
  // 💪 Responsive Navigation System
  const ResponsiveNavigation = {
    init() {
      DOM.navToggle = document.getElementById('navToggle');
      DOM.navMenu = document.getElementById('navMenu');
      
      if (!DOM.navToggle || !DOM.navMenu) {
        this.createMobileNav();
      }
      
      this.bindEvents();
    },
    
    createMobileNav() {
      // Create mobile navigation if it doesn't exist
      const header = document.querySelector('header') || document.body.firstElementChild;
      if (!header) return;
      
      const mobileNavHTML = `
        <nav class="mobile-nav" id="mobileNav">
          <button class="nav-toggle" id="navToggle" aria-label="فتح القائمة">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul class="nav-menu" id="navMenu">
            <li><a href="index.html">🏠 الرئيسية</a></li>
            <li><a href="#services">🎯 الخدمات</a></li>
            <li><a href="#countries">🌍 الدول</a></li>
            <li><a href="#contact">📞 تواصل</a></li>
          </ul>
        </nav>
      `;
      
      header.insertAdjacentHTML('afterbegin', mobileNavHTML);
      DOM.navToggle = document.getElementById('navToggle');
      DOM.navMenu = document.getElementById('navMenu');
    },
    
    bindEvents() {
      if (!DOM.navToggle || !DOM.navMenu) return;
      
      DOM.navToggle.addEventListener('click', () => this.toggleMenu());
      
      // Close menu on link click
      DOM.navMenu.addEventListener('click', (e) => {
        if (e.target.matches('a')) {
          setTimeout(() => this.closeMenu(), 100);
        }
      });
      
      // Close on outside click
      document.addEventListener('click', (e) => {
        if (!DOM.navToggle.contains(e.target) && 
            !DOM.navMenu.contains(e.target) && 
            DOM.navMenu.classList.contains('active')) {
          this.closeMenu();
        }
      });
      
      // Close on escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && DOM.navMenu.classList.contains('active')) {
          this.closeMenu();
          DOM.navToggle.focus();
        }
      });
      
      // Handle resize
      window.addEventListener('resize', Utils.debounce(() => {
        if (window.innerWidth > 768 && DOM.navMenu.classList.contains('active')) {
          this.closeMenu();
        }
      }, 150));
    },
    
    toggleMenu() {
      if (DOM.navMenu.classList.contains('active')) {
        this.closeMenu();
      } else {
        this.openMenu();
      }
    },
    
    openMenu() {
      DOM.navMenu.classList.add('active');
      DOM.navToggle.classList.add('active');
      DOM.navToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    },
    
    closeMenu() {
      DOM.navMenu.classList.remove('active');
      DOM.navToggle.classList.remove('active');
      DOM.navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  };
  
  // 💪 Enhanced Back to Top
  const BackToTop = {
    init() {
      DOM.topBtn = document.getElementById('backToTop');
      
      if (!DOM.topBtn) {
        this.createButton();
      }
      
      this.bindEvents();
      this.handleScroll();
    },
    
    createButton() {
      DOM.topBtn = document.createElement('button');
      DOM.topBtn.id = 'backToTop';
      DOM.topBtn.className = 'back-to-top';
      DOM.topBtn.innerHTML = '↑';
      DOM.topBtn.setAttribute('aria-label', 'العودة إلى أعلى الصفحة');
      DOM.topBtn.setAttribute('title', 'العودة إلى الأعلى');
      document.body.appendChild(DOM.topBtn);
    },
    
    bindEvents() {
      DOM.topBtn?.addEventListener('click', this.scrollToTop);
      window.addEventListener('scroll', Utils.throttle(this.handleScroll, 100), { passive: true });
    },
    
    handleScroll() {
      const visible = window.pageYOffset > CONFIG.SCROLL_THRESHOLD;
      if (DOM.topBtn) {
        DOM.topBtn.style.display = visible ? 'flex' : 'none';
        DOM.topBtn.classList.toggle('show', visible);
      }
    },
    
    scrollToTop() {
      window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
      });
    }
  };
  
  // 📧 Enhanced Newsletter System
  const NewsletterSystem = {
    init() {
      this.emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.bindEvents();
    },
    
    bindEvents() {
      document.querySelectorAll('form').forEach(form => {
        const emailInput = form.querySelector('input[type="email"]');
        if (emailInput) {
          // Real-time validation
          emailInput.addEventListener('input', () => {
            this.validateInput(emailInput);
          });
          
          // Form submission
          form.addEventListener('submit', (e) => this.handleSubmission(e));
        }
      });
    },
    
    validateInput(input) {
      const email = input.value.trim();
      if (email.length > 0) {
        if (this.emailRegex.test(email)) {
          input.style.borderColor = '#10b981';
          input.style.boxShadow = '0 0 0 2px rgba(16, 185, 129, 0.1)';
          input.classList.add('valid');
          input.classList.remove('invalid');
        } else {
          input.style.borderColor = '#ef4444';
          input.style.boxShadow = '0 0 0 2px rgba(239, 68, 68, 0.1)';
          input.classList.add('invalid');
          input.classList.remove('valid');
        }
      } else {
        input.style.borderColor = '';
        input.style.boxShadow = '';
        input.classList.remove('valid', 'invalid');
      }
    },
    
    async handleSubmission(e) {
      e.preventDefault();
      
      const form = e.target;
      const emailInput = form.querySelector('input[type="email"]');
      const submitBtn = form.querySelector('button[type="submit"]');
      const email = emailInput?.value.trim();
      
      if (!email || !this.emailRegex.test(email)) {
        this.showToast('يرجى إدخال بريد إلكتروني صحيح', 'error');
        emailInput?.focus();
        return;
      }
      
      // Check if already subscribed
      const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
      if (subscribers.includes(email.toLowerCase())) {
        this.showToast('هذا البريد مسجل مسبقاً! شكراً لك', 'info');
        return;
      }
      
      // Loading state
      this.setLoadingState(submitBtn, true);
      
      try {
        await this.submitToServices(email);
        
        // Save locally
        subscribers.push(email.toLowerCase());
        localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
        
        // Success
        if (emailInput) {
          emailInput.value = '';
          this.validateInput(emailInput);
        }
        
        this.showToast('✅ تم الاشتراك بنجاح! شكراً لك', 'success');
        
      } catch (error) {
        this.showToast('تم حفظ اشتراكك محلياً. سنتواصل معك!', 'success');
      } finally {
        this.setLoadingState(submitBtn, false);
      }
    },
    
    async submitToServices(email) {
      // Method 1: FormSubmit.co
      try {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('_subject', 'اشتراك جديد - arabsad.com');
        formData.append('_template', 'table');
        formData.append('_captcha', 'false');
        
        await fetch('https://formsubmit.co/sherow1982@gmail.com', {
          method: 'POST',
          body: formData,
          mode: 'no-cors'
        });
      } catch (error) {
        console.log('FormSubmit fallback used');
      }
      
      // Backup storage
      const backups = JSON.parse(localStorage.getItem('newsletter_backups') || '[]');
      backups.push({
        email,
        timestamp: new Date().toISOString(),
        page: window.location.pathname,
        userAgent: navigator.userAgent.substring(0, 100)
      });
      
      // Keep only last 100
      if (backups.length > 100) {
        backups.splice(0, backups.length - 100);
      }
      
      localStorage.setItem('newsletter_backups', JSON.stringify(backups));
    },
    
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
    },
    
    showToast(message, type = 'info') {
      DOM.toastContainer = DOM.toastContainer || this.createToastContainer();
      
      const toast = document.createElement('div');
      toast.className = `toast toast-${type}`;
      toast.textContent = message;
      toast.setAttribute('role', 'alert');
      toast.setAttribute('aria-live', 'polite');
      
      DOM.toastContainer.appendChild(toast);
      
      // Auto remove
      setTimeout(() => {
        toast.style.animation = 'slideOutToast 0.4s ease forwards';
        setTimeout(() => {
          if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
          }
        }, 400);
      }, CONFIG.TOAST_DURATION);
    },
    
    createToastContainer() {
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
      return container;
    }
  };
  
  // 📊 Reading Progress
  const ReadingProgress = {
    init() {
      DOM.progress = document.getElementById('readingProgress') || this.createProgressBar();
      
      if (DOM.progress) {
        this.updateProgress = Utils.throttle(() => {
          const scrollPercent = (window.pageYOffset / (document.body.scrollHeight - window.innerHeight)) * 100;
          DOM.progress.style.width = Math.min(Math.max(scrollPercent, 0), 100) + '%';
        }, 16);
        
        window.addEventListener('scroll', this.updateProgress, { passive: true });
        this.updateProgress();
      }
    },
    
    createProgressBar() {
      const progress = document.createElement('div');
      progress.id = 'readingProgress';
      progress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0;
        height: 4px;
        background: linear-gradient(135deg, #3b82f6, #8b5cf6);
        z-index: 1001;
        transition: width 0.3s ease;
      `;
      document.body.insertBefore(progress, document.body.firstChild);
      return progress;
    }
  };
  
  // 🎨 Enhanced UI Effects
  const UIEffects = {
    init() {
      this.enhanceCards();
      this.enhanceForms();
      this.addSmoothScrolling();
    },
    
    enhanceCards() {
      document.querySelectorAll('.card, .service-card, .country-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
          card.style.transform = 'translateY(-6px)';
        });
        
        card.addEventListener('mouseleave', () => {
          card.style.transform = '';
        });
      });
    },
    
    enhanceForms() {
      document.querySelectorAll('.form-group').forEach(formGroup => {
        const input = formGroup.querySelector('input');
        if (input) {
          input.addEventListener('focus', () => {
            formGroup.style.transform = 'scale(1.02)';
            formGroup.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
          });
          
          input.addEventListener('blur', () => {
            formGroup.style.transform = '';
            formGroup.style.boxShadow = '';
          });
        }
      });
    },
    
    addSmoothScrolling() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
          }
        });
      });
    }
  };
  
  // 🔍 Responsive Image Optimization
  const ImageOptimizer = {
    init() {
      this.optimizeImages();
      this.setupLazyLoading();
    },
    
    optimizeImages() {
      document.querySelectorAll('img:not([alt])').forEach(img => {
        img.alt = 'صورة من موقع مؤسسة إعلانات العرب';
      });
      
      document.querySelectorAll('img').forEach(img => {
        if (!img.hasAttribute('loading')) {
          img.setAttribute('loading', 'lazy');
        }
        
        img.addEventListener('error', () => {
          img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KIDxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjZjFmNWY5Ii8+CiA8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzY0NzQ4YiIgZm9udC1mYW1pbHk9IkNhaXJvLEFyaWFsIiBmb250LXNpemU9IjE0Ij7YtdmI2LHYqSDZhNmGINmF2YjZgteiINil2LnZhNin2YbYp9iqINin2YTYudix2KggLSDYp9ix2KfYqNiz2KfYrC5jb208L3RleHQ+Cjwvc3ZnPg==';
        }, { once: true });
      });
    },
    
    setupLazyLoading() {
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
              }
              observer.unobserve(img);
            }
          });
        }, {
          rootMargin: '50px 0px',
          threshold: 0.1
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
          observer.observe(img);
        });
      }
    }
  };
  
  // 🎯 Performance Monitor
  const PerformanceMonitor = {
    init() {
      this.trackWebVitals();
      this.optimizeAssets();
    },
    
    trackWebVitals() {
      // Simple performance tracking
      window.addEventListener('load', () => {
        if (performance.getEntriesByType) {
          const navigation = performance.getEntriesByType('navigation')[0];
          if (navigation) {
            console.log(`⚙️ Page Load Time: ${Math.round(navigation.loadEventEnd - navigation.fetchStart)}ms`);
          }
        }
      });
    },
    
    optimizeAssets() {
      // Preload critical assets
      const criticalAssets = [
        { href: 'styles.css', as: 'style' },
        { href: 'assets/fonts/cairo.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' }
      ];
      
      criticalAssets.forEach(asset => {
        if (!document.querySelector(`link[href="${asset.href}"]`)) {
          const link = document.createElement('link');
          link.rel = 'preload';
          Object.assign(link, asset);
          document.head.appendChild(link);
        }
      });
    }
  };
  
  // 🌐 Internationalization Support
  const I18nSupport = {
    init() {
      this.addLanguageAttributes();
      this.enhanceRTLSupport();
    },
    
    addLanguageAttributes() {
      if (!document.documentElement.lang) {
        document.documentElement.lang = 'ar';
      }
      
      if (!document.documentElement.dir) {
        document.documentElement.dir = 'rtl';
      }
    },
    
    enhanceRTLSupport() {
      // Add RTL-specific enhancements
      document.body.classList.add('rtl-layout');
      
      // Fix form input directions for Arabic
      document.querySelectorAll('input[type="email"], input[type="text"], textarea').forEach(input => {
        input.dir = 'ltr'; // Email addresses are LTR
        if (input.type === 'email') {
          input.style.textAlign = 'left';
        }
      });
    }
  };
  
  // 🔒 Security Enhancements
  const Security = {
    init() {
      this.sanitizeContent();
      this.enhanceExternalLinks();
    },
    
    sanitizeContent() {
      // Basic XSS protection for dynamic content
      document.querySelectorAll('[data-content]').forEach(element => {
        const content = element.dataset.content;
        if (content) {
          element.textContent = content; // Use textContent instead of innerHTML
        }
      });
    },
    
    enhanceExternalLinks() {
      document.querySelectorAll('a[href^="http"]').forEach(link => {
        const url = new URL(link.href);
        if (url.hostname !== location.hostname) {
          if (!link.rel.includes('noopener')) {
            link.rel += ' noopener';
          }
        }
      });
    }
  };
  
  // 🎆 Main Initialization
  function initialize() {
    try {
      // Core functionality
      SocialMediaManager.init();
      ResponsiveNavigation.init();
      BackToTop.init();
      ReadingProgress.init();
      NewsletterSystem.init();
      
      // Enhancement features
      UIEffects.init();
      ImageOptimizer.init();
      PerformanceMonitor.init();
      I18nSupport.init();
      Security.init();
      
      console.log('✨ ArabSad.com fully initialized with responsive design and updated Facebook links!');
      
    } catch (error) {
      console.error('❌ Initialization error:', error);
    }
  }
  
  // 🚀 Smart Initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }
  
  // 🌍 Global API for external use
  window.ArabSad = {
    version: '3.0.0',
    config: CONFIG,
    
    // Public methods
    scrollToSection: (sectionId) => {
      const section = document.getElementById(sectionId);
      if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    },
    
    openWhatsApp: (message = 'مرحباً! أريد استشارة مجانية') => {
      const url = `${CONFIG.SOCIAL_MEDIA.whatsapp}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank', 'noopener');
    },
    
    updateSocialLinks: () => {
      SocialMediaManager.updateAllSocialLinks();
    },
    
    showNotification: (message, type = 'info') => {
      NewsletterSystem.showToast(message, type);
    }
  };
  
})();

// 🎉 Page-specific enhancements
document.addEventListener('DOMContentLoaded', function() {
  // Add loading animation to all buttons
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      if (this.href && !this.href.includes('#') && !this.target) {
        this.style.opacity = '0.7';
        this.style.pointerEvents = 'none';
        
        setTimeout(() => {
          this.style.opacity = '';
          this.style.pointerEvents = '';
        }, 2000);
      }
    });
  });
  
  // Enhanced hover effects for mobile
  if ('ontouchstart' in window) {
    document.querySelectorAll('.card, .btn, .social-btn').forEach(element => {
      element.addEventListener('touchstart', function() {
        this.classList.add('touch-active');
      }, { passive: true });
      
      element.addEventListener('touchend', function() {
        setTimeout(() => {
          this.classList.remove('touch-active');
        }, 150);
      }, { passive: true });
    });
  }
});

// 🛡️ Error handling and fallbacks
window.addEventListener('error', function(e) {
  console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
  console.error('Unhandled promise rejection:', e.reason);
});