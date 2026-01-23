// Fix for back/forward cache issues in some browsers
window.addEventListener('pageshow', function(event) {
  if (event.persisted && event.isTrusted) {
    // Add CSRF protection by checking referrer
    if (document.referrer && new URL(document.referrer).origin === window.location.origin) {
      window.location.reload();
    }
  }
});