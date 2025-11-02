// 🔄 Script to Update All Facebook Links Across Website
// Updates all social media links to use https://www.facebook.com/arabads.me

// Global configuration for social media links
const SOCIAL_MEDIA_CONFIG = {
  facebook: 'https://www.facebook.com/arabads.me',
  instagram: 'https://instagram.com/arabsadads',
  tiktok: 'https://tiktok.com/@arabsadads',
  twitter: 'https://twitter.com/arabsadads',
  linkedin: 'https://linkedin.com/company/arabsad',
  whatsapp: 'https://wa.me/201110760081'
};

// Function to update social media links on page load
function updateSocialMediaLinks() {
  // Update Facebook links
  const facebookLinks = document.querySelectorAll('a[href*="facebook.com"]');
  facebookLinks.forEach(link => {
    link.href = SOCIAL_MEDIA_CONFIG.facebook;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });
  
  // Update Instagram links
  const instagramLinks = document.querySelectorAll('a[href*="instagram.com"]');
  instagramLinks.forEach(link => {
    link.href = SOCIAL_MEDIA_CONFIG.instagram;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });
  
  // Update TikTok links
  const tiktokLinks = document.querySelectorAll('a[href*="tiktok.com"]');
  tiktokLinks.forEach(link => {
    link.href = SOCIAL_MEDIA_CONFIG.tiktok;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });
  
  // Update all WhatsApp links to ensure consistency
  const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
  whatsappLinks.forEach(link => {
    if (!link.href.includes('text=')) {
      link.href = SOCIAL_MEDIA_CONFIG.whatsapp + '?text=أريد استشارة مجانية';
    }
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });
}

// Function to create social media buttons if they don't exist
function createSocialMediaSection() {
  // Check if social section already exists
  if (document.querySelector('.social-follow') || document.querySelector('.social-buttons')) {
    return;
  }
  
  // Create social media section
  const socialSection = document.createElement('section');
  socialSection.className = 'section social-follow';
  socialSection.innerHTML = `
    <div class="container">
      <h3>تابعنا على وسائل التواصل</h3>
      <div class="social-buttons">
        <a href="${SOCIAL_MEDIA_CONFIG.whatsapp}?text=تابعتكم من الموقع" target="_blank" class="social-btn whatsapp" rel="noopener noreferrer">
          <span class="social-icon">💬</span>
          واتساب
        </a>
        <a href="${SOCIAL_MEDIA_CONFIG.facebook}" target="_blank" class="social-btn facebook" rel="noopener noreferrer">
          <span class="social-icon">📘</span>
          فيسبوك
        </a>
        <a href="${SOCIAL_MEDIA_CONFIG.instagram}" target="_blank" class="social-btn instagram" rel="noopener noreferrer">
          <span class="social-icon">📷</span>
          إنستجرام
        </a>
        <a href="${SOCIAL_MEDIA_CONFIG.tiktok}" target="_blank" class="social-btn tiktok" rel="noopener noreferrer">
          <span class="social-icon">🎵</span>
          تيك توك
        </a>
      </div>
    </div>
  `;
  
  // Insert after header or at beginning of main content
  const main = document.querySelector('main') || document.querySelector('.container');
  if (main) {
    main.insertBefore(socialSection, main.firstChild);
  }
}

// Function to add responsive meta tags if missing
function ensureResponsiveMeta() {
  let viewportMeta = document.querySelector('meta[name="viewport"]');
  if (!viewportMeta) {
    viewportMeta = document.createElement('meta');
    viewportMeta.name = 'viewport';
    viewportMeta.content = 'width=device-width, initial-scale=1, viewport-fit=cover';
    document.head.appendChild(viewportMeta);
  } else {
    viewportMeta.content = 'width=device-width, initial-scale=1, viewport-fit=cover';
  }
}

// Function to add Open Graph meta tags for social sharing
function addOpenGraphMeta() {
  const ogData = {
    'og:title': document.title,
    'og:description': document.querySelector('meta[name="description"]')?.content || 'وكالة تسويق رقمي احترافية',
    'og:image': 'https://arabsad.com/assets/images/og-image.jpg',
    'og:url': window.location.href,
    'og:type': 'website',
    'og:locale': 'ar_AR'
  };
  
  Object.entries(ogData).forEach(([property, content]) => {
    let meta = document.querySelector(`meta[property="${property}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('property', property);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  });
}

// Enhanced responsive CSS for all pages
const responsiveCSS = `
<style id="global-responsive-css">
/* 📱 Global Responsive Enhancements */

/* Ensure proper box model */
*, *::before, *::after {
  box-sizing: border-box;
}

/* Base responsive typography */
body {
  font-size: clamp(14px, 2.5vw, 16px);
  line-height: 1.6;
  overflow-x: hidden;
}

h1 { font-size: clamp(1.8rem, 5vw, 3rem); }
h2 { font-size: clamp(1.5rem, 4vw, 2.5rem); }
h3 { font-size: clamp(1.25rem, 3vw, 2rem); }
h4 { font-size: clamp(1.1rem, 2.5vw, 1.5rem); }

/* Responsive container */
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (min-width: 768px) {
  .container { padding: 0 2rem; }
}

@media (min-width: 1024px) {
  .container { padding: 0 1.5rem; }
}

/* Enhanced button system */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  font-weight: 600;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  font-family: inherit;
  white-space: nowrap;
}

.btn-primary {
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: white;
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(59, 130, 246, 0.4);
  color: white;
}

.btn-secondary {
  background: white;
  color: #1e293b;
  border: 2px solid #e2e8f0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.btn-secondary:hover {
  background: #f8fafc;
  border-color: #3b82f6;
  color: #3b82f6;
  transform: translateY(-2px);
}

/* Social buttons responsive design */
.social-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin: 2rem 0;
}

.social-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  color: white;
  min-width: 140px;
  justify-content: center;
}

.social-btn.whatsapp { background: #25d366; }
.social-btn.facebook { background: #1877f2; }
.social-btn.instagram { background: linear-gradient(45deg, #f58529, #dd2a7b, #8134af); }
.social-btn.tiktok { background: #000000; }

.social-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  color: white;
}

/* Grid system */
.grid {
  display: grid;
  gap: 1.5rem;
}

.grid-2 {
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .grid-2 { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .grid-3 { grid-template-columns: repeat(3, 1fr); }
  .grid-4 { grid-template-columns: repeat(4, 1fr); }
}

/* Card enhancements */
.card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 4px;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
  border-color: #3b82f6;
}

.card:hover::before {
  transform: scaleX(1);
}

/* WhatsApp float button */
.whatsapp-float {
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 1000;
}

.whatsapp-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #25d366;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  box-shadow: 0 8px 25px rgba(37, 211, 102, 0.4);
  transition: all 0.3s ease;
}

.whatsapp-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(37, 211, 102, 0.5);
  color: white;
}

/* Back to top button */
.back-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: bold;
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
  transition: all 0.3s ease;
  z-index: 999;
  display: none;
}

.back-to-top:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(59, 130, 246, 0.4);
}

/* Mobile specific fixes */
@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
  
  .social-buttons {
    flex-direction: column;
    align-items: center;
    max-width: 300px;
    margin: 2rem auto;
  }
  
  .social-btn {
    width: 100%;
  }
  
  .btn {
    width: 100%;
    max-width: 300px;
    justify-content: center;
    margin: 0.5rem auto;
  }
  
  .grid {
    gap: 1rem;
  }
  
  .card {
    padding: 1.5rem;
  }
  
  .whatsapp-float {
    left: 10px;
    bottom: 15px;
  }
  
  .whatsapp-btn {
    padding: 0.8rem 1.2rem;
    font-size: 0.9rem;
  }
  
  .back-to-top {
    right: 10px;
    bottom: 15px;
    width: 45px;
    height: 45px;
    font-size: 1.3rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 0.5rem;
  }
  
  .card {
    padding: 1.25rem;
    border-radius: 12px;
  }
  
  .btn {
    padding: 0.8rem 1.5rem;
    font-size: 0.95rem;
  }
}

/* High contrast support */
@media (prefers-contrast: high) {
  .btn-primary {
    background: #0000FF;
    border: 2px solid #000;
  }
  
  .card {
    border: 2px solid #000;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
`;

// Function to inject responsive CSS
function injectResponsiveCSS() {
  if (!document.getElementById('global-responsive-css')) {
    document.head.insertAdjacentHTML('beforeend', responsiveCSS);
  }
}

// Function to enhance existing forms
function enhanceExistingForms() {
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    const emailInputs = form.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
      input.addEventListener('input', () => {
        const email = input.value.trim();
        if (email.length > 0) {
          if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            input.style.borderColor = '#10b981';
            input.style.boxShadow = '0 0 0 2px rgba(16, 185, 129, 0.1)';
          } else {
            input.style.borderColor = '#ef4444';
            input.style.boxShadow = '0 0 0 2px rgba(239, 68, 68, 0.1)';
          }
        } else {
          input.style.borderColor = '';
          input.style.boxShadow = '';
        }
      });
    });
  });
}

// Function to add back to top functionality
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.style.display = 'block';
      } else {
        backToTopBtn.style.display = 'none';
      }
    }, { passive: true });
    
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// Main initialization function
function initializePageEnhancements() {
  // Ensure responsive design
  ensureResponsiveMeta();
  
  // Inject responsive CSS
  injectResponsiveCSS();
  
  // Update social media links
  updateSocialMediaLinks();
  
  // Create social section if missing
  createSocialMediaSection();
  
  // Add Open Graph meta
  addOpenGraphMeta();
  
  // Enhance forms
  enhanceExistingForms();
  
  // Initialize back to top
  initBackToTop();
  
  console.log('🎆 Page enhancements loaded - All Facebook links updated to: https://www.facebook.com/arabads.me');
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializePageEnhancements);
} else {
  initializePageEnhancements();
}

// Also initialize on window load as fallback
window.addEventListener('load', initializePageEnhancements);

// Export for manual usage
if (typeof window !== 'undefined') {
  window.ARABSAD_CONFIG = {
    SOCIAL_MEDIA_CONFIG,
    updateSocialMediaLinks,
    initializePageEnhancements
  };
}