// BFCache Fix for better page performance
(function() {
    'use strict';
    
    // Prevent bfcache issues
    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            // Page was loaded from bfcache, refresh dynamic content
            const dynamicElements = document.querySelectorAll('[data-include]');
            dynamicElements.forEach(function(el) {
                // Re-trigger include loading if needed
                const file = el.getAttribute('data-include');
                if (file && !el.innerHTML.trim()) {
                    fetch('/arabsad/' + file)
                        .then(response => response.text())
                        .then(html => el.innerHTML = html)
                        .catch(e => console.log('Include load error:', e));
                }
            });
        }
    });
    
    // Handle pagehide event
    window.addEventListener('pagehide', function(event) {
        // Clean up any resources if needed
    });
    
})();