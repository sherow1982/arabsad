/*
 * PWA Installer & Offline Manager
 * مثبّت Progressive Web App ومدير العمل بدون انترنت
 * مؤسسة إعلانات العرب
 */

(function() {
  'use strict';
  
  class PWAInstaller {
    constructor() {
      this.deferredPrompt = null;
      this.isInstalled = false;
      this.isOnline = navigator.onLine;
      
      this.init();
    }
    
    init() {
      this.checkInstallation();
      this.setupInstallPrompt();
      this.setupOfflineSupport();
      this.setupNetworkStatus();
      this.createInstallBanner();
    }
    
    checkInstallation() {
      // فحص إذا كان التطبيق مثبت مسبقاً
      if (window.matchMedia('(display-mode: standalone)').matches ||
          window.navigator.standalone === true) {
        this.isInstalled = true;
        document.body.classList.add('pwa-installed');
        console.log('✅ PWA مثبت وتعمل في وضع standalone');
      }
    }
    
    setupInstallPrompt() {
      window.addEventListener('beforeinstallprompt', (e) => {
        console.log('📦 PWA يمكن تثبيته');
        e.preventDefault();
        this.deferredPrompt = e;
        this.showInstallBanner();
      });
      
      window.addEventListener('appinstalled', (e) => {
        console.log('✅ تم تثبيت PWA بنجاح');
        this.isInstalled = true;
        this.hideInstallBanner();
        this.showInstallSuccess();
        
        // تتبع التثبيت
        if (window.gtag) {
          gtag('event', 'pwa_install', {
            'event_category': 'PWA',
            'event_label': 'Installation Success'
          });
        }
      });
    }
    
    createInstallBanner() {
      const banner = document.createElement('div');
      banner.id = 'pwa-install-banner';
      banner.className = 'pwa-banner hidden';
      banner.innerHTML = `
        <div class="banner-content">
          <div class="banner-icon">📦</div>
          <div class="banner-text">
            <h4>تثبيت تطبيق ArabSad</h4>
            <p>تصفح خدماتنا بسرعة أكبر وبدون انترنت!</p>
          </div>
          <div class="banner-actions">
            <button id="install-btn" class="btn btn-primary btn-sm">تثبيت</button>
            <button id="dismiss-install" class="btn btn-secondary btn-sm">لاحقاً</button>
          </div>
          <button class="banner-close" aria-label="إغلاق">&times;</button>
        </div>
      `;
      
      document.body.appendChild(banner);
      
      // Event listeners
      const installBtn = banner.querySelector('#install-btn');
      const dismissBtn = banner.querySelector('#dismiss-install');
      const closeBtn = banner.querySelector('.banner-close');
      
      installBtn?.addEventListener('click', () => this.installPWA());
      dismissBtn?.addEventListener('click', () => this.dismissInstall());
      closeBtn?.addEventListener('click', () => this.hideInstallBanner());
    }
    
    showInstallBanner() {
      const banner = document.getElementById('pwa-install-banner');
      if (banner && !this.isInstalled) {
        banner.classList.remove('hidden');
        banner.style.animation = 'slideDown 0.5s ease-out';
        
        // إظهار تلقائي بعد 10 ثواني
        setTimeout(() => {
          if (!localStorage.getItem('pwa-prompt-dismissed')) {
            banner.classList.add('auto-show');
          }
        }, 10000);
      }
    }
    
    hideInstallBanner() {
      const banner = document.getElementById('pwa-install-banner');
      if (banner) {
        banner.style.animation = 'slideUp 0.3s ease-in';
        setTimeout(() => {
          banner.classList.add('hidden');
        }, 300);
      }
    }
    
    async installPWA() {
      if (!this.deferredPrompt) return;
      
      const installBtn = document.getElementById('install-btn');
      if (installBtn) {
        installBtn.textContent = 'جاري التثبيت...';
        installBtn.disabled = true;
      }
      
      try {
        this.deferredPrompt.prompt();
        const result = await this.deferredPrompt.userChoice;
        
        console.log('نتيجة اقتراح التثبيت:', result.outcome);
        
        if (result.outcome === 'accepted') {
          this.hideInstallBanner();
        } else {
          if (installBtn) {
            installBtn.textContent = 'تثبيت';
            installBtn.disabled = false;
          }
        }
      } catch (error) {
        console.error('خطأ في تثبيت PWA:', error);
        if (installBtn) {
          installBtn.textContent = 'تثبيت';
          installBtn.disabled = false;
        }
      }
      
      this.deferredPrompt = null;
    }
    
    dismissInstall() {
      this.hideInstallBanner();
      localStorage.setItem('pwa-prompt-dismissed', 'true');
      localStorage.setItem('pwa-dismiss-time', Date.now().toString());
    }
    
    showInstallSuccess() {
      const notification = document.createElement('div');
      notification.className = 'install-success-notification';
      notification.innerHTML = `
        <div class="success-content">
          <div class="success-icon">✅</div>
          <div class="success-text">
            <h4>تم التثبيت بنجاح!</h4>
            <p>يمكنك الآن استخدام ArabSad من شاشتك الرئيسية</p>
          </div>
          <button class="close-success">&times;</button>
        </div>
      `;
      
      document.body.appendChild(notification);
      
      notification.querySelector('.close-success').addEventListener('click', () => {
        notification.remove();
      });
      
      // إزالة تلقائية
      setTimeout(() => {
        if (notification.parentElement) {
          notification.remove();
        }
      }, 5000);
    }
    
    setupOfflineSupport() {
      // تسجيل Service Worker
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('✅ Service Worker مسجل بنجاح');
            
            // فحص التحديثات
            registration.addEventListener('updatefound', () => {
              this.showUpdateAvailable();
            });
          })
          .catch(error => {
            console.error('❌ خطأ في تسجيل Service Worker:', error);
          });
      }
    }
    
    setupNetworkStatus() {
      window.addEventListener('online', () => {
        this.isOnline = true;
        this.hideOfflineMessage();
        console.log('✅ عاد الاتصال بالانترنت');
      });
      
      window.addEventListener('offline', () => {
        this.isOnline = false;
        this.showOfflineMessage();
        console.log('⚠️ انقطع الاتصال بالانترنت - وضع offline مفعل');
      });
    }
    
    showUpdateAvailable() {
      const notification = document.createElement('div');
      notification.className = 'update-notification';
      notification.innerHTML = `
        <div class="update-content">
          <div class="update-icon">🎆</div>
          <div class="update-text">
            <h4>تحديث جديد متاح!</h4>
            <p>نسخة محسنة من التطبيق متوفرة</p>
          </div>
          <div class="update-actions">
            <button id="update-now" class="btn btn-primary btn-sm">تحديث</button>
            <button id="update-later" class="btn btn-secondary btn-sm">لاحقاً</button>
          </div>
        </div>
      `;
      
      document.body.appendChild(notification);
      
      notification.querySelector('#update-now').addEventListener('click', () => {
        window.location.reload();
      });
      
      notification.querySelector('#update-later').addEventListener('click', () => {
        notification.remove();
      });
      
      // إزالة تلقائية بعد 30 ثانية
      setTimeout(() => {
        if (notification.parentElement) {
          notification.remove();
        }
      }, 30000);
    }
    
    showOfflineMessage() {
      let offlineMsg = document.getElementById('offline-message');
      
      if (!offlineMsg) {
        offlineMsg = document.createElement('div');
        offlineMsg.id = 'offline-message';
        offlineMsg.className = 'offline-notification';
        offlineMsg.innerHTML = `
          <div class="offline-content">
            <div class="offline-icon">📶</div>
            <div class="offline-text">
              <strong>وضع عدم الاتصال</strong>
              <p>يمكنك التصفح بعض الصفحات بدون انترنت</p>
            </div>
            <div class="connection-status">
              <div class="status-indicator offline"></div>
              <span>غير متصل</span>
            </div>
          </div>
        `;
        
        document.body.appendChild(offlineMsg);
      }
      
      offlineMsg.style.display = 'block';
      offlineMsg.style.animation = 'slideDown 0.5s ease-out';
    }
    
    hideOfflineMessage() {
      const offlineMsg = document.getElementById('offline-message');
      if (offlineMsg) {
        offlineMsg.style.animation = 'slideUp 0.3s ease-in';
        setTimeout(() => {
          offlineMsg.style.display = 'none';
        }, 300);
      }
    }
    
    async installPWA() {
      if (!this.deferredPrompt) {
        this.showManualInstallInstructions();
        return;
      }
      
      try {
        const result = await this.deferredPrompt.userChoice;
        console.log('نتيجة اقتراح التثبيت:', result.outcome);
      } catch (error) {
        console.error('خطأ في تثبيت PWA:', error);
      }
    }
    
    showManualInstallInstructions() {
      const instructions = {
        ios: '🍎 **لمستخدمي iPhone/iPad:**\n1. افتح Safari\n2. انقر على زر المشاركة 🔗\n3. اختر "إضافة إلى الشاشة الرئيسية"',
        android: '🤖 **لمستخدمي Android:**\n1. افتح Chrome\n2. انقر على قائمة الاختيارات ⋮\n3. اختر "تثبيت التطبيق"',
        desktop: '💻 **لمستخدمي سطح المكتب:**\n1. انقر على أيقونة التثبيت في شريط العنوان\n2. أو استخدم Ctrl+Shift+A (Chrome)'
      };
      
      const userAgent = navigator.userAgent.toLowerCase();
      let instruction;
      
      if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
        instruction = instructions.ios;
      } else if (userAgent.includes('android')) {
        instruction = instructions.android;
      } else {
        instruction = instructions.desktop;
      }
      
      alert('📦 تعليمات تثبيت التطبيق:\n\n' + instruction);
    }
  }
  
  // مدير العمل بدون انترنت
  class OfflineManager {
    constructor() {
      this.cachedPages = new Set();
      this.offlineQueue = [];
    }
    
    init() {
      this.setupOfflineDetection();
      this.cacheImportantPages();
      this.setupOfflineQueue();
    }
    
    setupOfflineDetection() {
      if (!navigator.onLine) {
        this.showOfflineMode();
      }
      
      window.addEventListener('online', () => {
        this.hideOfflineMode();
        this.processOfflineQueue();
      });
      
      window.addEventListener('offline', () => {
        this.showOfflineMode();
      });
    }
    
    showOfflineMode() {
      document.body.classList.add('offline-mode');
      
      // إضافة بنر العمل بدون انترنت
      if (!document.getElementById('offline-banner')) {
        const banner = document.createElement('div');
        banner.id = 'offline-banner';
        banner.innerHTML = `
          <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 0.75rem; text-align: center; font-weight: 500; position: fixed; top: 0; left: 0; right: 0; z-index: 10000;">
            📶 وضع عدم الاتصال - بعض الميزات محدودة
          </div>
        `;
        document.body.appendChild(banner);
      }
    }
    
    hideOfflineMode() {
      document.body.classList.remove('offline-mode');
      const banner = document.getElementById('offline-banner');
      if (banner) {
        banner.remove();
      }
    }
    
    cacheImportantPages() {
      const importantPages = [
        '/',
        '/services-page.html',
        '/google-ads-service.html',
        '/social-media-service.html'
      ];
      
      importantPages.forEach(page => {
        if ('caches' in window) {
          caches.open('arabsad-v2').then(cache => {
            cache.add(page);
            this.cachedPages.add(page);
          });
        }
      });
    }
    
    setupOfflineQueue() {
      // حفظ الإجراءات لتنفيذها عند عودة الاتصال
      document.addEventListener('click', (e) => {
        if (!navigator.onLine && e.target.matches('a[href*="wa.me"]')) {
          e.preventDefault();
          
          this.offlineQueue.push({
            type: 'whatsapp',
            url: e.target.href,
            text: e.target.textContent,
            timestamp: Date.now()
          });
          
          this.showOfflineActionQueued();
        }
      });
    }
    
    showOfflineActionQueued() {
      const toast = document.createElement('div');
      toast.className = 'offline-toast';
      toast.innerHTML = `
        <div style="background: #1f2937; color: white; padding: 1rem; border-radius: 8px; position: fixed; bottom: 20px; right: 20px; z-index: 10000; animation: slideInRight 0.3s ease;">
          💫 تم حفظ الإجراء - سيتم تنفيذه عند عودة الاتصال
        </div>
      `;
      
      document.body.appendChild(toast);
      
      setTimeout(() => {
        if (toast.parentElement) {
          toast.remove();
        }
      }, 4000);
    }
    
    processOfflineQueue() {
      if (this.offlineQueue.length === 0) return;
      
      console.log(`⏳ معالجة ${this.offlineQueue.length} إجراء مؤجل`);
      
      this.offlineQueue.forEach(action => {
        if (action.type === 'whatsapp') {
          // فتح رابط واتساب بعد 5 ثواني
          setTimeout(() => {
            window.open(action.url, '_blank');
          }, 2000);
        }
      });
      
      this.offlineQueue = [];
    }
  }
  
  // مُحلِّل أداء الشبكة
  class NetworkAnalyzer {
    constructor() {
      this.connectionInfo = {
        type: 'unknown',
        effectiveType: 'unknown',
        downlink: 0,
        rtt: 0
      };
    }
    
    init() {
      this.analyzeConnection();
      this.adaptToConnection();
    }
    
    analyzeConnection() {
      if ('connection' in navigator) {
        const connection = navigator.connection;
        
        this.connectionInfo = {
          type: connection.type || 'unknown',
          effectiveType: connection.effectiveType || 'unknown',
          downlink: connection.downlink || 0,
          rtt: connection.rtt || 0
        };
        
        console.log('🌐 معلومات الشبكة:', this.connectionInfo);
        
        // مراقبة تغيرات الشبكة
        connection.addEventListener('change', () => {
          this.analyzeConnection();
          this.adaptToConnection();
        });
      }
    }
    
    adaptToConnection() {
      const body = document.body;
      
      // تقليل جودة الصور على الشبكات البطيئة
      if (this.connectionInfo.effectiveType === 'slow-2g' || 
          this.connectionInfo.effectiveType === '2g' ||
          this.connectionInfo.downlink < 1) {
        
        body.classList.add('slow-connection');
        
        // تقليل الانيميشنز
        document.querySelectorAll('.card, .btn').forEach(el => {
          el.style.transition = 'none';
        });
        
        console.log('⚠️ شبكة بطيئة - تم تفعيل وضع التوفير');
      } else {
        body.classList.remove('slow-connection');
      }
    }
  }
  
  // مبدء تشغيل PWA
  function initPWAFeatures() {
    try {
      const pwaInstaller = new PWAInstaller();
      const offlineManager = new OfflineManager();
      const networkAnalyzer = new NetworkAnalyzer();
      
      offlineManager.init();
      networkAnalyzer.init();
      
      console.log('✅ تم تفعيل جميع ميزات PWA بنجاح');
      
    } catch (error) {
      console.error('❌ خطأ في تفعيل PWA:', error);
    }
  }
  
  // تشغيل عند تحميل الصفحة
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPWAFeatures);
  } else {
    initPWAFeatures();
  }
  
  // تصدير عام
  window.ArabSadPWA = {
    install: () => window.pwaInstaller?.installPWA(),
    isInstalled: () => window.pwaInstaller?.isInstalled,
    isOnline: () => navigator.onLine,
    version: '2.1.0'
  };
  
})();

// أنماط CSS لميزات PWA
const pwaCSS = document.createElement('style');
pwaCSS.textContent = `
  /* بنر تثبيت PWA */
  .pwa-banner {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10000;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 1rem;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    transition: transform 0.3s ease;
  }
  
  .pwa-banner.hidden {
    transform: translateY(-100%);
  }
  
  .banner-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }
  
  .banner-icon {
    font-size: 2rem;
  }
  
  .banner-text {
    flex: 1;
    min-width: 200px;
  }
  
  .banner-text h4 {
    margin: 0 0 0.25rem 0;
    font-size: 1.1rem;
    font-weight: 600;
  }
  
  .banner-text p {
    margin: 0;
    font-size: 0.9rem;
    opacity: 0.9;
  }
  
  .banner-actions {
    display: flex;
    gap: 0.75rem;
    align-items: center;
  }
  
  .btn-sm {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }
  
  .banner-close {
    background: rgba(255,255,255,0.2);
    border: none;
    color: white;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
    line-height: 1;
  }
  
  .banner-close:hover {
    background: rgba(255,255,255,0.3);
  }
  
  /* إشعارات الحالة */
  .offline-notification {
    position: fixed;
    top: 80px;
    left: 20px;
    right: 20px;
    z-index: 9999;
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    color: white;
    padding: 1rem;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);
  }
  
  .offline-content {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .offline-icon {
    font-size: 1.5rem;
  }
  
  .offline-text h4 {
    margin: 0 0 0.25rem 0;
    font-size: 1rem;
  }
  
  .offline-text p {
    margin: 0;
    font-size: 0.85rem;
    opacity: 0.9;
  }
  
  .connection-status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-right: auto;
  }
  
  .status-indicator {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    animation: pulse 2s infinite;
  }
  
  .status-indicator.online {
    background: #10b981;
  }
  
  .status-indicator.offline {
    background: #ef4444;
  }
  
  /* إشعارات نجاح التثبيت */
  .install-success-notification {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10001;
    background: white;
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    text-align: center;
    min-width: 300px;
  }
  
  .success-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  
  .success-icon {
    font-size: 3rem;
  }
  
  .success-text h4 {
    color: #10b981;
    margin: 0 0 0.5rem 0;
    font-size: 1.25rem;
  }
  
  .success-text p {
    color: #6b7280;
    margin: 0;
    font-size: 0.9rem;
  }
  
  .close-success {
    position: absolute;
    top: 10px;
    left: 10px;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #9ca3af;
  }
  
  /* تحسينات الجوال */
  @media (max-width: 768px) {
    .banner-content {
      justify-content: center;
      text-align: center;
    }
    
    .banner-actions {
      width: 100%;
      justify-content: center;
      margin-top: 0.75rem;
    }
    
    .offline-notification {
      left: 10px;
      right: 10px;
      top: 70px;
    }
    
    .offline-content {
      flex-direction: column;
      text-align: center;
      gap: 0.75rem;
    }
  }
  
  /* انيميشنز */
  @keyframes slideDown {
    from {
      transform: translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  @keyframes slideUp {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(-100%);
      opacity: 0;
    }
  }
  
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  /* وضع عدم الاتصال */
  .offline-mode .whatsapp-btn {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .offline-mode .whatsapp-btn::after {
    content: ' (غير متاح حالياً)';
    font-size: 0.7rem;
  }
  
  /* تحسينات الشبكة البطيئة */
  .slow-connection .card img,
  .slow-connection .service-card img {
    display: none;
  }
  
  .slow-connection .hero {
    background: #667eea;
  }
  
  .slow-connection .animation,
  .slow-connection .transition {
    animation: none !important;
    transition: none !important;
  }
`;
document.head.appendChild(pwaCSS);