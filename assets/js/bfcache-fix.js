// Fix for back/forward cache issues in some browsers
window.addEventListener('pageshow', function(event) {
  if (event.persisted) {
    window.location.reload();
  }
});