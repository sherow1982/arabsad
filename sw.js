// Helper function to validate origin
function isValidOrigin(url) {
  try {
    const requestUrl = new URL(url);
    const allowedOrigins = [
      'https://sherow1982.github.io',
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ];
    return allowedOrigins.some(origin => requestUrl.origin === origin);
  } catch {
    return false;
  }
}

// Service Worker for ArabSad.com PWA
const CACHE_NAME = 'arabsad-v1.0.1';
const CACHE_VERSION = '2025-11-11';

// قائمة الملفات المهمة للتخزين المؤقت
const CORE_CACHE = [
  '/',
  '/index.html',
  '/assets/css/main.css',
  '/assets/css/navigation-system.css',
  '/favicon.ico',
  '/favicon.svg',
  '/manifest.json'
];

// ملفات الصفحات المهمة
const PAGES_CACHE = [
  '/services/index.html',
  '/services/google-ads.html',
  '/services/seo.html',
  '/services/website-design.html',
  '/services/ecommerce.html',
  '/services/safahat-al5dmat.html',
  '/services/social-media-ads.html',
  '/services/social-management.html',
  '/sa.html',
  '/ae.html',
  '/kw.html',
  '/qa.html',
  '/bh.html',
  '/om.html',
  '/privacy-policy.html',
  '/terms-of-service.html'
];

// تثبيت Service Worker
self.addEventListener('install', event => {
  console.log('Service Worker: Installing');
  
  event.waitUntil(
    Promise.all([
      // تخزين الملفات الأساسية
      caches.open(CACHE_NAME).then(cache => {
        console.log('Service Worker: Caching core files');
        return cache.addAll(CORE_CACHE.map(url => new Request(url, { credentials: 'same-origin' }))).catch(err => {
          console.log('Service Worker: Failed to cache some core files', err);
        });
      }),
      
      // تخزين الصفحات المهمة
      caches.open(CACHE_NAME + '-pages').then(cache => {
        console.log('Service Worker: Caching pages');
        return cache.addAll(PAGES_CACHE.map(url => new Request(url, { credentials: 'same-origin' }))).catch(err => {
          console.log('Service Worker: Failed to cache some pages', err);
        });
      })
    ]).then(() => {
      console.log('Service Worker: Installation complete');
      return self.skipWaiting();
    })
  );
});

// تفعيل Service Worker
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating');
  
  event.waitUntil(
    // حذف الكاشات القديمة
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && cacheName !== CACHE_NAME + '-pages') {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Activation complete');
      return self.clients.claim();
    })
  );
});

// التعامل مع طلبات الشبكة
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  
  // تجاهل الطلبات الخارجية والامتدادات غير المدعومة
  if (
    !url.origin.includes(location.origin) ||
    request.method !== 'GET' ||
    url.pathname.includes('wp-admin') ||
    url.pathname.includes('api') ||
    url.pathname.includes('.php')
  ) {
    return;
  }
  
  event.respondWith(
    caches.match(request).then(cachedResponse => {
      // إرجاع النسخة المخزنة إذا وجدت
      if (cachedResponse) {
        console.log('Service Worker: Serving from cache:', request.url);
        
        // تحديث الكاش في الخلفية (stale-while-revalidate)
        if (isValidOrigin(request.url)) {
          fetch(request).then(response => {
            if (response && response.status === 200) {
              const responseClone = response.clone();
              caches.open(CACHE_NAME).then(cache => {
                cache.put(request, responseClone);
              }).catch(err => {
                console.warn('Service Worker: Failed to update cache:', err);
              });
            }
          }).catch(err => {
            console.warn('Service Worker: Background fetch failed:', err);
          });
        }
        
        return cachedResponse;
      }
      
      // جلب من الشبكة وتخزين
      return fetch(request).then(response => {
        // التأكد من صحة الاستجابة
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        
        console.log('Service Worker: Fetching and caching:', request.url);
        
        // تخزين النسخة الجديدة
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(request, responseClone);
        }).catch(err => {
          console.warn('Service Worker: Failed to cache response:', err);
        });
        
        return response;
      }).catch(err => {
        console.warn('Service Worker: Fetch failed:', err);
        // في حالة عدم وجود اتصال، إرجاع صفحة غير متصل
        if (request.destination === 'document') {
          return caches.match('/index.html').catch(() => {
            return new Response('<!DOCTYPE html><html><body><h1>غير متصل</h1></body></html>', {
              headers: { 'Content-Type': 'text/html; charset=utf-8' }
            });
          });
        }
        
        // للموارد الأخرى، إرجاع استجابة فارغة
        return new Response('', {
          status: 408,
          statusText: 'Offline'
        });
      });
    }).catch(err => {
      console.error('Service Worker: Cache match failed:', err);
      return fetch(request).catch(() => {
        return new Response('Service Unavailable', {
          status: 503,
          statusText: 'Service Unavailable'
        });
      });
    })
  );
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
  } catch (error) {
    console.error('Service Worker: Message handling error:', error);
  }
});

// تنظيف دوري للكاش
self.addEventListener('sync', event => {
  if (event.tag === 'cache-cleanup') {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        const oldCaches = cacheNames.filter(name => 
          name.startsWith('arabsad-') && name !== CACHE_NAME && name !== CACHE_NAME + '-pages'
        );
        
        return Promise.all(
          oldCaches.map(cacheName => caches.delete(cacheName))
        );
      })
    );
  }
});

// إشعارات الدفع (في المستقبل)
self.addEventListener('push', event => {
  if (!event.data) return;
  
  try {
    const data = event.data.json();
    const options = {
      body: data.body || 'لديك إشعار جديد من مؤسسة إعلانات العرب',
      icon: '/favicon.svg',
      badge: '/favicon.ico',
      tag: 'arabsad-notification',
      requireInteraction: true
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title || 'مؤسسة إعلانات العرب', options)
    );
  } catch (error) {
    console.error('Service Worker: Push notification error:', error);
  }
});

// التعامل مع نقرات الإشعارات
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      clients.openWindow('/').catch(() => 
        clients.openWindow('https://sherow1982.github.io/arabsad')
      )
    );
  }
});