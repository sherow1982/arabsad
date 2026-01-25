// Service Worker for ArabSad PWA - Enhanced Version
const CACHE_NAME = 'arabsad-v2.0.0';
const CACHE_VERSION = '2026-01-23-v12';

// قائمة الملفات الأساسية للتخزين المؤقت
const CORE_CACHE = [
  '/arabsad/',
  '/arabsad/index.html',
  '/arabsad/assets/css/main.css',
  '/arabsad/assets/css/navigation-system.css',
  '/arabsad/assets/js/boot.js',
  '/arabsad/favicon.ico',
  '/arabsad/favicon.svg',
  '/arabsad/manifest.json'
];

// ملفات الصفحات المهمة
const PAGES_CACHE = [
  '/arabsad/services/google-ads.html',
  '/arabsad/services/seo.html',
  '/arabsad/services/website-design.html',
  '/arabsad/services/ecommerce.html',
  '/arabsad/services/social-media-ads.html',
  '/arabsad/services/social-management.html',
  '/arabsad/sa.html',
  '/arabsad/ae.html',
  '/arabsad/kw.html',
  '/arabsad/qa.html',
  '/arabsad/bh.html',
  '/arabsad/om.html',
  '/arabsad/about.html',
  '/arabsad/contact.html',
  '/arabsad/legal.html'
];

// Helper function to validate origin
function isValidOrigin(url) {
  try {
    const requestUrl = new URL(url);
    const allowedOrigins = [
      'https://sherow1982.github.io',
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://wa.me'
    ];
    return allowedOrigins.some(origin => requestUrl.origin === origin);
  } catch {
    return false;
  }
}

// تثبيت Service Worker
self.addEventListener('install', event => {
  console.log('🚀 Service Worker: Installing v' + CACHE_VERSION);
  
  event.waitUntil(
    Promise.all([
      // تخزين الملفات الأساسية
      caches.open(CACHE_NAME).then(cache => {
        console.log('📦 Service Worker: Caching core files');
        return cache.addAll(CORE_CACHE).catch(err => {
          console.warn('⚠️ Service Worker: Failed to cache some core files', err);
        });
      }),
      
      // تخزين الصفحات المهمة
      caches.open(CACHE_NAME + '-pages').then(cache => {
        console.log('📄 Service Worker: Caching pages');
        return cache.addAll(PAGES_CACHE).catch(err => {
          console.warn('⚠️ Service Worker: Failed to cache some pages', err);
        });
      })
    ]).then(() => {
      console.log('✅ Service Worker: Installation complete');
      return self.skipWaiting();
    })
  );
});

// تفعيل Service Worker
self.addEventListener('activate', event => {
  console.log('🔄 Service Worker: Activating');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && cacheName !== CACHE_NAME + '-pages') {
            console.log('🗑️ Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('✅ Service Worker: Activation complete');
      return self.clients.claim();
    })
  );
});

// التعامل مع طلبات الشبكة - Cache First Strategy
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  
  // تجاهل الطلبات غير المناسبة
  if (
    request.method !== 'GET' ||
    url.pathname.includes('wp-admin') ||
    url.pathname.includes('api') ||
    url.pathname.includes('.php') ||
    url.pathname.includes('admin') ||
    url.protocol === 'chrome-extension:'
  ) {
    return;
  }
  
  // استراتيجية مختلفة للملفات الثابتة والصفحات
  if (url.pathname.match(/\.(css|js|png|jpg|jpeg|gif|svg|webp|woff|woff2|ico)$/)) {
    // Cache First للملفات الثابتة
    event.respondWith(
      caches.match(request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        
        return fetch(request).then(response => {
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(request, responseClone);
            });
          }
          return response;
        }).catch(() => {
          return new Response('', { status: 404 });
        });
      })
    );
  } else {
    // Network First للصفحات HTML
    event.respondWith(
      fetch(request).then(response => {
        if (response && response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME + '-pages').then(cache => {
            cache.put(request, responseClone);
          });
        }
        return response;
      }).catch(() => {
        return caches.match(request).then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }
          
          // صفحة غير متصل مخصصة
          if (request.destination === 'document') {
            return new Response(`
              <!DOCTYPE html>
              <html lang="ar" dir="rtl">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>غير متصل - مؤسسة إعلانات العرب</title>
                <style>
                  body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #f5f5f5; }
                  .offline { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                  h1 { color: #26de81; }
                  .retry { background: #26de81; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; }
                </style>
              </head>
              <body>
                <div class="offline">
                  <h1>🌐 غير متصل بالإنترنت</h1>
                  <p>يبدو أنك غير متصل بالإنترنت حالياً</p>
                  <p>تحقق من اتصالك وحاول مرة أخرى</p>
                  <button class="retry" onclick="location.reload()">إعادة المحاولة</button>
                </div>
              </body>
              </html>
            `, {
              headers: { 'Content-Type': 'text/html; charset=utf-8' }
            });
          }
          
          return new Response('', { status: 404 });
        });
      })
    );
  }
});

// التعامل مع رسائل من الصفحة الرئيسية
self.addEventListener('message', event => {
  try {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'GET_VERSION' && event.ports[0]) {
      event.ports[0].postMessage({
        version: CACHE_VERSION,
        cacheName: CACHE_NAME
      });
    }
    
    if (event.data && event.data.type === 'CACHE_URLS' && event.data.urls) {
      event.waitUntil(
        caches.open(CACHE_NAME + '-dynamic').then(cache => {
          return cache.addAll(event.data.urls);
        })
      );
    }
  } catch (error) {
    console.error('❌ Service Worker: Message handling error:', error);
  }
});

// تنظيف دوري للكاش
self.addEventListener('sync', event => {
  if (event.tag === 'cache-cleanup') {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        const oldCaches = cacheNames.filter(name => 
          name.startsWith('arabsad-') && 
          name !== CACHE_NAME && 
          name !== CACHE_NAME + '-pages' &&
          name !== CACHE_NAME + '-dynamic'
        );
        
        return Promise.all(
          oldCaches.map(cacheName => {
            console.log('🧹 Cleaning old cache:', cacheName);
            return caches.delete(cacheName);
          })
        );
      })
    );
  }
});

// إشعارات الدفع
self.addEventListener('push', event => {
  if (!event.data) return;
  
  try {
    const data = event.data.json();
    const options = {
      body: data.body || 'لديك إشعار جديد من مؤسسة إعلانات العرب',
      icon: '/arabsad/favicon.svg',
      badge: '/arabsad/favicon.ico',
      tag: 'arabsad-notification',
      requireInteraction: true,
      actions: [
        {
          action: 'open',
          title: 'فتح الموقع'
        },
        {
          action: 'close',
          title: 'إغلاق'
        }
      ]
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title || 'مؤسسة إعلانات العرب', options)
    );
  } catch (error) {
    console.error('❌ Service Worker: Push notification error:', error);
  }
});

// التعامل مع نقرات الإشعارات
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      clients.openWindow('/arabsad/').catch(() => 
        clients.openWindow('https://sherow1982.github.io/arabsad/')
      )
    );
  }
});