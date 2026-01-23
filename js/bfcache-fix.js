/**
 * Back/Forward Cache (bfcache) Fix
 * Resolves: "Unchecked runtime.lastError: The page keeping the extension port is moved into back/forward cache"
 * 
 * This script prevents pages from being stored in bfcache when needed,
 * or properly handles the restoration from bfcache.
 */

(function() {
    // Prevent unload errors by clearing any pending operations
    const cleanup = () => {
        // Clear any ongoing timers
        const maxTimerId = setTimeout(() => {}, 0) - 1;
        for (let i = 1; i <= maxTimerId; i++) {
            clearTimeout(i);
            clearInterval(i);
        }
    };

    // Handle page before unload - clean up properly
    window.addEventListener('beforeunload', () => {
        cleanup();
    }, { once: false });

    // Prevent bfcache if there are active connections or listeners
    window.addEventListener('pagehide', (event) => {
        if (event.persisted) {
            cleanup();
        }
    });

    // Handle page restoration from bfcache
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            console.log('Page restored from bfcache');
            // Reset any necessary state
            cleanup();
        }
    });

    // Gracefully handle unload of service workers or extensions
    window.addEventListener('unload', () => {
        cleanup();
    });

    // Prevent the extension errors by ensuring we don't hold references
    document.addEventListener('DOMContentLoaded', () => {
        // Ensure no open connections remain
        if (window.opener) {
            window.addEventListener('beforeunload', () => {
                try {
                    if (window.opener && !window.opener.closed) {
                        window.opener = null;
                    }
                } catch (e) {
                    // Ignore cross-origin errors
                }
            });
        }
    });
})();
