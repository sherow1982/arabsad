// ArabSad Website Final Optimization Script
(function() {
    'use strict';
    
    if (window.__ARABSAD_OPTIMIZED__) return;
    window.__ARABSAD_OPTIMIZED__ = true;
    
    // Performance monitoring
    const perfMonitor = {
        start: performance.now(),
        
        log: function(event) {
            const time = (performance.now() - this.start).toFixed(2);
            console.log(`[ArabSad] ${event} - ${time}ms`);
        },
        
        measure: function(name, fn) {
            const start = performance.now();
            const result = fn();
            const end = performance.now();
            console.log(`[ArabSad] ${name} took ${(end - start).toFixed(2)}ms`);
            return result;
        }
    };
    
    // Lazy loading for images
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
            
            perfMonitor.log('Lazy loading initialized');
        }
    }
    
    // Smooth scroll enhancement
    function enhanceSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = 80;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        perfMonitor.log('Smooth scroll enhanced');
    }
    
    // Animation on scroll
    function initScrollAnimations() {
        if ('IntersectionObserver' in window) {
            const animationObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        animationObserver.unobserve(entry.target);
                    }
                });
            }, {\n                threshold: 0.1,\n                rootMargin: '0px 0px -50px 0px'\n            });\n            \n            document.querySelectorAll('.fade-in, .slide-up').forEach(el => {\n                animationObserver.observe(el);\n            });\n            \n            perfMonitor.log('Scroll animations initialized');\n        }\n    }\n    \n    // Form enhancements\n    function enhanceForms() {\n        document.querySelectorAll('form').forEach(form => {\n            form.addEventListener('submit', function(e) {\n                const submitBtn = form.querySelector('[type=\"submit\"]');\n                if (submitBtn) {\n                    submitBtn.classList.add('loading');\n                    submitBtn.disabled = true;\n                    \n                    // Re-enable after 3 seconds as fallback\n                    setTimeout(() => {\n                        submitBtn.classList.remove('loading');\n                        submitBtn.disabled = false;\n                    }, 3000);\n                }\n            });\n        });\n        \n        perfMonitor.log('Forms enhanced');\n    }\n    \n    // Error handling for images\n    function handleImageErrors() {\n        document.querySelectorAll('img').forEach(img => {\n            img.addEventListener('error', function() {\n                this.style.display = 'none';\n                console.warn('Image failed to load:', this.src);\n            });\n        });\n        \n        perfMonitor.log('Image error handling added');\n    }\n    \n    // Preload critical resources\n    function preloadCriticalResources() {\n        const criticalResources = [\n            '/arabsad/assets/css/main.css',\n            '/arabsad/assets/js/navigation-system.js',\n            '/arabsad/shared-header.html',\n            '/arabsad/shared-footer.html'\n        ];\n        \n        criticalResources.forEach(resource => {\n            const link = document.createElement('link');\n            link.rel = 'prefetch';\n            link.href = resource;\n            document.head.appendChild(link);\n        });\n        \n        perfMonitor.log('Critical resources preloaded');\n    }\n    \n    // Service Worker registration\n    function registerServiceWorker() {\n        if ('serviceWorker' in navigator) {\n            navigator.serviceWorker.register('/arabsad/sw.js')\n                .then(registration => {\n                    perfMonitor.log('Service Worker registered');\n                    \n                    // Check for updates\n                    registration.addEventListener('updatefound', () => {\n                        const newWorker = registration.installing;\n                        newWorker.addEventListener('statechange', () => {\n                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {\n                                // Show update notification\n                                console.log('New version available! Refresh to update.');\n                            }\n                        });\n                    });\n                })\n                .catch(error => {\n                    console.warn('Service Worker registration failed:', error);\n                });\n        }\n    }\n    \n    // Analytics and tracking\n    function initAnalytics() {\n        // Simple page view tracking\n        try {\n            const pageData = {\n                url: window.location.href,\n                title: document.title,\n                timestamp: new Date().toISOString(),\n                referrer: document.referrer || 'direct',\n                userAgent: navigator.userAgent.substring(0, 100)\n            };\n            \n            // Store in localStorage for potential analytics\n            const views = JSON.parse(localStorage.getItem('arabsad_page_views') || '[]');\n            views.push(pageData);\n            \n            // Keep only last 50 views\n            if (views.length > 50) {\n                views.splice(0, views.length - 50);\n            }\n            \n            localStorage.setItem('arabsad_page_views', JSON.stringify(views));\n            perfMonitor.log('Analytics initialized');\n        } catch (e) {\n            // Fail silently\n        }\n    }\n    \n    // Performance optimization\n    function optimizePerformance() {\n        // Debounce scroll events\n        let scrollTimeout;\n        window.addEventListener('scroll', () => {\n            clearTimeout(scrollTimeout);\n            scrollTimeout = setTimeout(() => {\n                // Scroll-based optimizations can go here\n            }, 100);\n        }, { passive: true });\n        \n        // Optimize resize events\n        let resizeTimeout;\n        window.addEventListener('resize', () => {\n            clearTimeout(resizeTimeout);\n            resizeTimeout = setTimeout(() => {\n                // Resize-based optimizations can go here\n            }, 250);\n        }, { passive: true });\n        \n        perfMonitor.log('Performance optimizations applied');\n    }\n    \n    // Initialize all optimizations\n    function init() {\n        perfMonitor.log('Optimization script started');\n        \n        // Run optimizations in order\n        setTimeout(() => {\n            initLazyLoading();\n            enhanceSmoothScroll();\n            initScrollAnimations();\n            enhanceForms();\n            handleImageErrors();\n            preloadCriticalResources();\n            registerServiceWorker();\n            initAnalytics();\n            optimizePerformance();\n            \n            perfMonitor.log('All optimizations completed');\n        }, 100);\n    }\n    \n    // Start when DOM is ready\n    if (document.readyState === 'loading') {\n        document.addEventListener('DOMContentLoaded', init);\n    } else {\n        init();\n    }\n    \n    // Export for debugging\n    window.ArabSadOptimizer = {\n        perfMonitor,\n        reinit: init\n    };\n    \n})();