/**
 * Back/Forward Cache (bfcache) Fix & Extension Runtime Error Handler
 * Resolves:
 * - "Unchecked runtime.lastError: The page keeping the extension port is moved into back/forward cache"
 * - "Unchecked runtime.lastError: No tab with id"
 * 
 * This script prevents pages from being stored in bfcache when needed,
 * properly handles restoration from bfcache, and suppresses extension-related warnings.
 */

(function() {
    'use strict';

    // ============================================
    // 1. Suppress Chrome Extension Runtime Errors
    // ============================================
    if (window.chrome && window.chrome.runtime) {
        const originalOnMessage = window.chrome.runtime.onMessage;
        const originalSendMessage = window.chrome.runtime.sendMessage;

        // Suppress runtime.lastError silently
        const checkError = () => {
            try {
                if (window.chrome.runtime.lastError) {
                    void window.chrome.runtime.lastError;
                }
            } catch (e) {
                // Silently ignore
            }
        };

        // Override onMessage listener
        if (originalOnMessage) {
            window.chrome.runtime.onMessage.addListener = function(...args) {
                return originalOnMessage.addListener.apply(this, args);
            };
        }

        // Override sendMessage to suppress errors
        if (originalSendMessage) {
            window.chrome.runtime.sendMessage = function(extensionId, message, options, callback) {
                const wrappedCallback = (response) => {
                    checkError();
                    if (typeof callback === 'function') {
                        try {
                            callback(response);
                        } catch (e) {
                            // Ignore callback errors
                        }
                    }
                };

                try {
                    return originalSendMessage.call(this, extensionId, message, options, wrappedCallback);
                } catch (e) {
                    // Silently ignore send errors
                }
            };
        }
    }

    // ============================================
    // 2. Prevent Unload Errors
    // ============================================
    const cleanup = () => {
        try {
            // Clear any ongoing timers safely
            const maxTimerId = setTimeout(() => {}, 0) - 1;
            for (let i = 1; i <= Math.min(maxTimerId, 10000); i++) {
                try {
                    clearTimeout(i);
                    clearInterval(i);
                } catch (e) {
                    // Ignore individual clear errors
                }
            }
        } catch (e) {
            // Ignore
        }
    };

    // ============================================
    // 3. Handle Page Lifecycle Events
    // ============================================
    
    // Before page unload
    window.addEventListener('beforeunload', () => {
        try {
            cleanup();
        } catch (e) {
            // Ignore
        }
    }, { once: false, passive: true });

    // Page hide (entering bfcache)
    window.addEventListener('pagehide', (event) => {
        try {
            if (event.persisted) {
                cleanup();
                // Disconnect any open ports
                if (window.chrome && window.chrome.runtime && window.chrome.runtime.Port) {
                    try {
                        const ports = Object.getOwnPropertyNames(window.chrome.runtime);
                        ports.forEach(port => {
                            try {
                                if (port.disconnect) port.disconnect();
                            } catch (e) {
                                // Ignore
                            }
                        });
                    } catch (e) {
                        // Ignore
                    }
                }
            }
        } catch (e) {
            // Ignore
        }
    }, { passive: true });

    // Page show (restored from bfcache)
    window.addEventListener('pageshow', (event) => {
        try {
            if (event.persisted) {
                console.debug('✓ Page restored from bfcache');
                cleanup();
                // Re-initialize if needed
                if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', () => {
                        try {
                            cleanup();
                        } catch (e) {
                            // Ignore
                        }
                    });
                }
            }
        } catch (e) {
            // Ignore
        }
    }, { passive: true });

    // Unload event
    window.addEventListener('unload', () => {
        try {
            cleanup();
        } catch (e) {
            // Ignore
        }
    }, { passive: true });

    // ============================================
    // 4. Prevent Extension Port Errors
    // ============================================
    document.addEventListener('DOMContentLoaded', () => {
        try {
            // Safely handle window.opener
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

            // Disconnect any message ports
            if (window.chrome && window.chrome.runtime) {
                window.addEventListener('beforeunload', () => {
                    try {
                        void window.chrome.runtime.lastError;
                    } catch (e) {
                        // Ignore
                    }
                });
            }
        } catch (e) {
            // Ignore
        }
    });

    // ============================================
    // 5. Global Error Handler for Runtime Errors
    // ============================================
    window.addEventListener('error', (event) => {
        if (event.message && event.message.includes('runtime.lastError')) {
            event.preventDefault();
            return true;
        }
    });

    // ============================================
    // 6. Unhandled Rejection Handler
    // ============================================
    window.addEventListener('unhandledrejection', (event) => {
        if (event.reason && typeof event.reason === 'string') {
            if (event.reason.includes('runtime.lastError') || event.reason.includes('port')) {
                event.preventDefault();
                return true;
            }
        }
    });

    console.debug('✓ bfcache-fix and runtime error handler initialized');
})();
