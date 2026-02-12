// Universal Header Footer System
document.addEventListener('DOMContentLoaded', function() {
  // Load header and footer
  loadIncludes();
  
  // Setup mobile menu after loading
  setTimeout(setupMobileMenu, 100);
});

function loadIncludes() {
  const includes = document.querySelectorAll('[data-include]');
  
  includes.forEach(async (element) => {
    const file = element.getAttribute('data-include');
    try {
      const response = await fetch(file);
      if (response.ok) {
        const content = await response.text();
        element.innerHTML = content;
      }
    } catch (error) {
      console.log('Include load error:', error);
    }
  });
}

function setupMobileMenu() {
  const toggle = document.getElementById('mobileToggle');
  const nav = document.getElementById('mainNav');
  
  if (toggle && nav) {
    toggle.addEventListener('click', function() {
      nav.classList.toggle('active');
      this.textContent = nav.classList.contains('active') ? '✕' : '☰';
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove('active');
        toggle.textContent = '☰';
      }
    });
  }
}