// Enhanced JavaScript for improved performance, SEO, and user experience
(function() {
  'use strict';
  
  const PLACEHOLDER = 'assets/images/placeholder.webp';
  const SCROLL_THRESHOLD = 400;
  const topBtn = document.getElementById('backToTop');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  // Fix skip-link focus and smooth scroll to main content
  function initSkipLink() {
    const skip = document.querySelector('a.skip-link');
    const main = document.getElementById('main-content');
    if (!skip || !main) return;
    skip.addEventListener('click', function(e){
      // If same-page hash navigation, prevent default and focus main
      if (skip.getAttribute('href') === '#main-content') {
        e.preventDefault();
        main.setAttribute('tabindex','-1');
        main.scrollIntoView({behavior:'smooth', block:'start'});
        main.focus({preventScroll:true});
      }
    });
  }

  // Back to top visibility
  function toggleBackToTop() {
    if (!topBtn) return;
    const visible = window.pageYOffset > SCROLL_THRESHOLD;
    topBtn.style.display = visible ? 'flex' : 'none';
    topBtn.classList.toggle('show', visible);
  }

  function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

  function toggleMobileNav() {
    if (!navMenu || !navToggle) return;
    const isOpen = navMenu.classList.contains('active');
    navMenu.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', String(!isOpen));
  }

  function handleImageError(img) {
    if (img.src !== PLACEHOLDER && !img.dataset.retried) {
      img.dataset.retried = 'true';
      img.src = PLACEHOLDER;
    }
  }

  function initLazyLoading() {
    const io = new IntersectionObserver((entries, o)=>{
      entries.forEach(en=>{
        if (en.isIntersecting) { const img = en.target; img.loading = 'lazy'; o.unobserve(img); }
      });
    }, {rootMargin:'100px 0px'});
    document.querySelectorAll('img').forEach(img=> io.observe(img));
  }

  function enhanceSEO() {
    document.querySelectorAll('img:not([alt])').forEach(img=> img.alt='صورة من موقع مؤسسة إعلانات العرب');
  }

  function init() {
    // events
    window.addEventListener('scroll', toggleBackToTop, {passive:true});
    toggleBackToTop();
    topBtn && topBtn.addEventListener('click', scrollToTop);
    navToggle && navToggle.addEventListener('click', toggleMobileNav);
    document.addEventListener('error', (e)=>{ if (e.target.tagName==='IMG') handleImageError(e.target); }, true);

    // features
    initSkipLink();
    initLazyLoading();
    enhanceSEO();
  }

  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else init();
})();