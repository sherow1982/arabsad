// Navigation System
(function() {
    'use strict';
    
    // Mobile menu functionality
    window.initMobileDropdowns = function() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', function() {
                const isOpen = mobileMenu.style.display === 'block';
                mobileMenu.style.display = isOpen ? 'none' : 'block';
                
                const icon = document.getElementById('hamburger-icon');
                if (icon) {
                    icon.textContent = isOpen ? '☰' : '✕';
                }
            });
        }
    };
    
    // Smooth scrolling for anchor links
    document.addEventListener('DOMContentLoaded', function() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
        
        // Initialize mobile menu after DOM load
        initMobileDropdowns();
    });
    
})();