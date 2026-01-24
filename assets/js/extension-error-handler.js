// Extension Error Handler - ArabSad.com
(function() {
  'use strict';
  
  // Suppress extension runtime errors
  window.addEventListener('error', function(e) {
    if (e.message && e.message.includes('Extension context invalidated')) {
      e.preventDefault();
      return true;
    }
  });
  
  // Handle unhandled promise rejections from extensions
  window.addEventListener('unhandledrejection', function(e) {
    if (e.reason && e.reason.message && 
        (e.reason.message.includes('Extension context') || 
         e.reason.message.includes('message channel is closed'))) {
      e.preventDefault();
      return true;
    }
  });
  
  // Override console.error for extension errors
  const originalError = console.error;
  console.error = function(...args) {
    const message = args.join(' ');
    if (message.includes('runtime.lastError') || 
        message.includes('message channel is closed') ||
        message.includes('Extension context')) {
      return; // Suppress these errors
    }
    originalError.apply(console, args);
  };
  
})();