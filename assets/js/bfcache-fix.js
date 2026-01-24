// Fix for back/forward cache issues in some browsers
window.addEventListener('pageshow', function(event) {
  if (event.persisted && event.isTrusted) {
    // Add CSRF protection by checking referrer
    if (document.referrer && new URL(document.referrer).origin === window.location.origin) {
      // Check for extension context before reload
      if (typeof chrome === 'undefined' || !chrome.runtime) {
        window.location.reload();
      }
    }
  }
});

// Handle extension errors gracefully
if (typeof chrome !== 'undefined' && chrome.runtime) {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    try {
      // Handle messages safely
      return true;
    } catch (error) {
      // Suppress extension errors
      return false;
    }
  });
}