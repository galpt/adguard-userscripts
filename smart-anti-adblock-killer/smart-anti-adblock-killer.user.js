// ==UserScript==
// @name            Smart Anti-Adblock Killer
// @name:en         Smart Anti-Adblock Killer
// @description     Intelligently detects and eliminates anti-adblock popups and overlays using advanced heuristics without relying on static blocklists
// @description:en  Intelligently detects and eliminates anti-adblock popups and overlays using advanced heuristics without relying on static blocklists
// @version         1.2.0
// @author          galpt
// @homepage        https://github.com/galpt/adguard-userscripts
// @namespace       https://github.com/galpt/adguard-userscripts
// @match           *://*/*
// @grant           GM_log
// @grant           GM_setValue
// @grant           GM_getValue
// @grant           GM_registerMenuCommand
// @grant           GM_notification
// @grant           unsafeWindow
// @run-at          document-start
// @noframes
// ==/UserScript==

(function () {
    'use strict';

    // Configuration
    const CONFIG = {
        debug: false,
        aggressiveMode: true,
        checkInterval: 500,
        mutationThrottle: 100,
        minOverlaySize: 0.3, // Minimum viewport coverage to consider as overlay
        maxLegitimateZIndex: 1000000,
        // More sophisticated anti-adblock phrase patterns
        antiAdblockPatterns: [
            // Direct adblock mentions with action requests
            /please\s+disable.*ad\s*block/i,
            /turn\s+off.*ad\s*block/i,
            /disable.*ad\s*block/i,
            /whitelist.*ad\s*block/i,
            /add.*to.*whitelist/i,

            // Specific anti-adblock messages
            /ad\s*block.*detect/i,
            /ad\s*blocker.*detect/i,
            /please\s+whitelist.*site/i,
            /disable.*ad.*blocker/i,
            /turn\s+off.*ad.*blocker/i,

            // Revenue/support related anti-adblock
            /support.*by.*disabling/i,
            /revenue.*ad.*block/i,
            /ads.*help.*free/i,
            /consider.*disabling.*ad/i,

            // Detection confirmations
            /we.*detect.*ad.*block/i,
            /using.*ad.*block/i,
            /ad.*block.*enabled/i,
            /blocking.*advertisement/i
        ],
        // Default legitimate sites that should have reduced sensitivity
        defaultTrustedDomains: [
            'github.com',
            'stackoverflow.com',
            'developer.mozilla.org',
            'google.com',
            'microsoft.com',
            'apple.com',
            'wikipedia.org'
        ],
        // Storage keys for persistent settings
        storageKeys: {
            userTrustedDomains: 'smart-aab-user-trusted-domains',
            userBlockedDomains: 'smart-aab-user-blocked-domains'
        }
    };

    // State tracking
    const STATE = {
        processedElements: new WeakSet(),
        hiddenElements: new Set(),
        observers: [],
        lastCheck: 0,
        isProcessing: false,
        userTrustedDomains: [],
        userBlockedDomains: [],
        allTrustedDomains: []
    };

    // Domain management system
    const domainManager = {
        loadUserDomains: () => {
            try {
                STATE.userTrustedDomains = JSON.parse(GM_getValue(CONFIG.storageKeys.userTrustedDomains, '[]'));
                STATE.userBlockedDomains = JSON.parse(GM_getValue(CONFIG.storageKeys.userBlockedDomains, '[]'));
                STATE.allTrustedDomains = [...CONFIG.defaultTrustedDomains, ...STATE.userTrustedDomains]
                    .filter(domain => !STATE.userBlockedDomains.includes(domain));
            } catch (e) {
                console.log('[Smart Anti-Adblock Killer] Error loading user domains:', e);
                STATE.userTrustedDomains = [];
                STATE.userBlockedDomains = [];
                STATE.allTrustedDomains = [...CONFIG.defaultTrustedDomains];
            }
        },

        saveUserDomains: () => {
            try {
                GM_setValue(CONFIG.storageKeys.userTrustedDomains, JSON.stringify(STATE.userTrustedDomains));
                GM_setValue(CONFIG.storageKeys.userBlockedDomains, JSON.stringify(STATE.userBlockedDomains));
                STATE.allTrustedDomains = [...CONFIG.defaultTrustedDomains, ...STATE.userTrustedDomains]
                    .filter(domain => !STATE.userBlockedDomains.includes(domain));
            } catch (e) {
                console.log('[Smart Anti-Adblock Killer] Error saving user domains:', e);
            }
        },

        getCurrentDomain: () => {
            return window.location.hostname.toLowerCase();
        },

        getRootDomain: (hostname) => {
            const parts = hostname.split('.');
            if (parts.length <= 2) return hostname;
            return parts.slice(-2).join('.');
        },

        addTrustedDomain: (domain = null) => {
            const targetDomain = domain || domainManager.getRootDomain(domainManager.getCurrentDomain());

            if (!STATE.userTrustedDomains.includes(targetDomain)) {
                STATE.userTrustedDomains.push(targetDomain);
                // Remove from blocked list if present
                STATE.userBlockedDomains = STATE.userBlockedDomains.filter(d => d !== targetDomain);
                domainManager.saveUserDomains();

                if (typeof GM_notification !== 'undefined') {
                    GM_notification({
                        title: 'Smart Anti-Adblock Killer',
                        text: `Added "${targetDomain}" to trusted domains. Page will refresh.`,
                        timeout: 3000
                    });
                }

                setTimeout(() => window.location.reload(), 1000);
                return true;
            }
            return false;
        },

        removeTrustedDomain: (domain = null) => {
            const targetDomain = domain || domainManager.getRootDomain(domainManager.getCurrentDomain());

            // Remove from user trusted domains
            const wasInUserList = STATE.userTrustedDomains.includes(targetDomain);
            STATE.userTrustedDomains = STATE.userTrustedDomains.filter(d => d !== targetDomain);

            // If it was a default trusted domain, add to blocked list
            if (CONFIG.defaultTrustedDomains.includes(targetDomain)) {
                if (!STATE.userBlockedDomains.includes(targetDomain)) {
                    STATE.userBlockedDomains.push(targetDomain);
                }
            }

            if (wasInUserList || CONFIG.defaultTrustedDomains.includes(targetDomain)) {
                domainManager.saveUserDomains();

                if (typeof GM_notification !== 'undefined') {
                    GM_notification({
                        title: 'Smart Anti-Adblock Killer',
                        text: `Removed "${targetDomain}" from trusted domains. Page will refresh.`,
                        timeout: 3000
                    });
                }

                setTimeout(() => window.location.reload(), 1000);
                return true;
            }
            return false;
        },

        isDomainTrusted: (hostname) => {
            const domain = hostname.toLowerCase();
            return STATE.allTrustedDomains.some(trustedDomain =>
                domain === trustedDomain || domain.endsWith('.' + trustedDomain)
            );
        },

        showDomainStatus: () => {
            const currentDomain = domainManager.getCurrentDomain();
            const rootDomain = domainManager.getRootDomain(currentDomain);
            const isTrusted = domainManager.isDomainTrusted(currentDomain);
            const isUserAdded = STATE.userTrustedDomains.includes(rootDomain);
            const isDefault = CONFIG.defaultTrustedDomains.includes(rootDomain);
            const isBlocked = STATE.userBlockedDomains.includes(rootDomain);

            let status = `Domain: ${currentDomain}\nRoot: ${rootDomain}\n`;
            status += `Status: ${isTrusted ? 'TRUSTED' : 'NORMAL'}\n`;

            if (isTrusted) {
                if (isDefault && !isBlocked) status += 'Source: Default trusted domain\n';
                if (isUserAdded) status += 'Source: User-added trusted domain\n';
            }
            if (isBlocked) status += 'Note: Manually blocked by user\n';

            status += `\nTotal trusted domains: ${STATE.allTrustedDomains.length}`;
            status += `\nUser-added: ${STATE.userTrustedDomains.length}`;
            status += `\nUser-blocked: ${STATE.userBlockedDomains.length}`;

            alert(status);
        }
    };

    // Utility functions
    const utils = {
        log: (message, ...args) => {
            if (CONFIG.debug) {
                GM_log(`[Smart Anti-Adblock Killer] ${message}`, ...args);
            }
        },

        isVisible: (element) => {
            if (!element || !element.offsetParent) return false;
            const style = getComputedStyle(element);
            return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
        },

        getViewportCoverage: (element) => {
            const rect = element.getBoundingClientRect();
            const viewport = {
                width: window.innerWidth,
                height: window.innerHeight
            };

            const coverage = (rect.width * rect.height) / (viewport.width * viewport.height);
            return Math.min(coverage, 1);
        },

        isTrustedDomain: () => {
            return domainManager.isDomainTrusted(window.location.hostname);
        },

        containsAntiAdblockText: (element) => {
            const text = element.textContent?.toLowerCase() || '';
            if (text.length < 10) return false; // Skip very short text

            // Use regex patterns for more accurate detection
            const matchesPattern = CONFIG.antiAdblockPatterns.some(pattern => pattern.test(text));

            // On trusted domains, require stronger evidence
            if (utils.isTrustedDomain()) {
                // Require at least 2 patterns to match or very specific anti-adblock language
                const matchCount = CONFIG.antiAdblockPatterns.filter(pattern => pattern.test(text)).length;
                const hasStrongEvidence = /please\s+disable.*ad\s*block|turn\s+off.*ad\s*block|we.*detect.*ad.*block/i.test(text);
                return matchCount >= 2 || hasStrongEvidence;
            }

            return matchesPattern;
        },

        isLikelyAntiAdblock: (element) => {
            const style = getComputedStyle(element);
            const zIndex = parseInt(style.zIndex) || 0;
            const position = style.position;
            const isTrusted = utils.isTrustedDomain();

            // Check for overlay characteristics
            const isOverlay = (position === 'fixed' || position === 'absolute') &&
                zIndex > (isTrusted ? CONFIG.maxLegitimateZIndex * 2 : CONFIG.maxLegitimateZIndex);

            // Check for viewport coverage
            const coverage = utils.getViewportCoverage(element);
            const minCoverage = isTrusted ? CONFIG.minOverlaySize * 1.5 : CONFIG.minOverlaySize;
            const coversViewport = coverage > minCoverage;

            // Check for anti-adblock text content
            const hasAntiAdblockText = utils.containsAntiAdblockText(element);

            // Check for modal/popup patterns (more restrictive on trusted domains)
            const modalPatternRegex = isTrusted
                ? /(anti.*adblock|adblock.*modal|popup.*adblock)/i
                : /(modal|popup|overlay|block|banner)/i;
            const hasModalPattern = element.classList.toString().match(modalPatternRegex);

            // On trusted domains, require stronger evidence
            if (isTrusted) {
                return hasAntiAdblockText || (isOverlay && coversViewport && hasAntiAdblockText);
            }

            return (isOverlay && coversViewport) || hasAntiAdblockText || hasModalPattern;
        },

        safeRemove: (element) => {
            try {
                if (element && element.parentNode) {
                    STATE.hiddenElements.add(element);
                    element.style.setProperty('display', 'none', 'important');
                    element.style.setProperty('visibility', 'hidden', 'important');
                    element.style.setProperty('opacity', '0', 'important');
                    element.style.setProperty('z-index', '-999999', 'important');
                    element.remove();
                    return true;
                }
            } catch (e) {
                utils.log('Error removing element:', e);
            }
            return false;
        },

        restoreBodyScroll: () => {
            // Restore body scrolling that might be disabled by anti-adblock scripts
            document.body.style.removeProperty('overflow');
            document.body.style.removeProperty('position');
            document.documentElement.style.removeProperty('overflow');
            document.documentElement.style.removeProperty('position');
        }
    };

    // Detection engines
    const detectors = {
        // Detect overlay elements that cover the viewport
        detectOverlays: () => {
            const elements = document.querySelectorAll('div, section, aside, header, footer, nav');
            const suspicious = [];
            const isTrusted = utils.isTrustedDomain();

            for (const element of elements) {
                if (STATE.processedElements.has(element) || !utils.isVisible(element)) continue;

                const style = getComputedStyle(element);
                const zIndex = parseInt(style.zIndex) || 0;
                const position = style.position;
                const coverage = utils.getViewportCoverage(element);

                // Adjust thresholds based on domain trust
                const minZIndex = isTrusted ? 5000 : 1000;
                const minCoverage = isTrusted ? CONFIG.minOverlaySize * 1.5 : CONFIG.minOverlaySize;

                // High z-index overlay covering significant viewport
                if ((position === 'fixed' || position === 'absolute') &&
                    zIndex > minZIndex && coverage > minCoverage) {

                    // On trusted domains, also require suspicious content
                    if (isTrusted && !utils.containsAntiAdblockText(element)) {
                        continue;
                    }

                    suspicious.push({ element, reason: 'high-zindex-overlay', coverage, zIndex });
                }

                STATE.processedElements.add(element);
            }

            return suspicious;
        },

        // Detect elements with anti-adblock text content
        detectAntiAdblockText: () => {
            const textElements = document.querySelectorAll('div, p, span, h1, h2, h3, h4, h5, h6');
            const suspicious = [];

            for (const element of textElements) {
                if (STATE.processedElements.has(element) || !utils.isVisible(element)) continue;

                if (utils.containsAntiAdblockText(element)) {
                    suspicious.push({ element, reason: 'anti-adblock-text' });
                }

                STATE.processedElements.add(element);
            }

            return suspicious;
        },

        // Detect modal/popup patterns
        detectModalPatterns: () => {
            const selectors = [
                '[class*="modal"]', '[class*="popup"]', '[class*="overlay"]',
                '[class*="block"]', '[class*="banner"]', '[class*="notice"]',
                '[id*="modal"]', '[id*="popup"]', '[id*="overlay"]'
            ];

            const suspicious = [];

            for (const selector of selectors) {
                const elements = document.querySelectorAll(selector);
                for (const element of elements) {
                    if (STATE.processedElements.has(element) || !utils.isVisible(element)) continue;

                    // Additional checks to avoid false positives
                    if (utils.isLikelyAntiAdblock(element)) {
                        suspicious.push({ element, reason: 'modal-pattern' });
                    }

                    STATE.processedElements.add(element);
                }
            }

            return suspicious;
        },

        // Detect content hiding patterns
        detectHiddenContent: () => {
            const suspicious = [];
            const mainContent = document.querySelector('main, article, #content, .content, #main, .main');

            if (mainContent && !utils.isVisible(mainContent)) {
                // Check if there's an overlay that might be causing this
                const overlays = document.querySelectorAll('div[style*="position: fixed"], div[style*="position: absolute"]');
                for (const overlay of overlays) {
                    if (utils.isVisible(overlay) && utils.getViewportCoverage(overlay) > CONFIG.minOverlaySize) {
                        suspicious.push({ element: overlay, reason: 'content-hiding-overlay' });
                    }
                }
            }

            return suspicious;
        }
    };

    // Main processing function
    const processAntiAdblock = () => {
        if (STATE.isProcessing) return;
        STATE.isProcessing = true;

        try {
            const now = Date.now();
            if (now - STATE.lastCheck < CONFIG.checkInterval) return;
            STATE.lastCheck = now;

            // Run all detection engines
            const allSuspicious = [
                ...detectors.detectOverlays(),
                ...detectors.detectAntiAdblockText(),
                ...detectors.detectModalPatterns(),
                ...detectors.detectHiddenContent()
            ];

            // Process detected elements
            let removedCount = 0;
            for (const { element, reason, coverage, zIndex } of allSuspicious) {
                if (utils.safeRemove(element)) {
                    removedCount++;
                    utils.log(`Removed anti-adblock element (${reason})`, {
                        element: element.tagName,
                        class: element.className,
                        id: element.id,
                        coverage,
                        zIndex
                    });
                }
            }

            // Restore body scroll if elements were removed
            if (removedCount > 0) {
                utils.restoreBodyScroll();
            }

        } finally {
            STATE.isProcessing = false;
        }
    };

    // JavaScript interference prevention
    const preventAntiAdblockJS = () => {
        // Override common adblock detection methods
        const originalQuerySelector = Document.prototype.querySelector;
        const originalQuerySelectorAll = Document.prototype.querySelectorAll;

        // Intercept and neutralize common adblock detection patterns
        Document.prototype.querySelector = function (selector) {
            // Block queries that look for adblock detection elements
            if (selector.includes('adnoscript') || selector.includes('#adblock')) {
                return null;
            }
            return originalQuerySelector.call(this, selector);
        };

        // Override setTimeout/setInterval for anti-adblock delays
        const originalSetTimeout = unsafeWindow.setTimeout;
        unsafeWindow.setTimeout = function (callback, delay) {
            // Reduce delays commonly used by anti-adblock scripts
            if (delay > 2000 && delay < 10000) {
                delay = Math.min(delay, 100);
            }
            return originalSetTimeout.call(this, callback, delay);
        };
    };

    // Mutation observer for dynamic content
    const setupMutationObserver = () => {
        let timeoutId;
        const observer = new MutationObserver((mutations) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                processAntiAdblock();
            }, CONFIG.mutationThrottle);
        });

        observer.observe(document.body || document.documentElement, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['style', 'class', 'id']
        });

        STATE.observers.push(observer);
    };

    // Keyboard shortcuts
    const setupKeyboardShortcuts = () => {
        document.addEventListener('keydown', (e) => {
            // Ctrl+Shift+T: Add current domain to trusted list
            if (e.ctrlKey && e.shiftKey && e.code === 'KeyT') {
                e.preventDefault();
                domainManager.addTrustedDomain();
            }
            // Ctrl+Shift+R: Remove current domain from trusted list
            else if (e.ctrlKey && e.shiftKey && e.code === 'KeyR') {
                e.preventDefault();
                domainManager.removeTrustedDomain();
            }
            // Ctrl+Shift+I: Show domain info
            else if (e.ctrlKey && e.shiftKey && e.code === 'KeyI') {
                e.preventDefault();
                domainManager.showDomainStatus();
            }
        });
    };

    // Setup menu commands
    const setupMenuCommands = () => {
        if (typeof GM_registerMenuCommand !== 'undefined') {
            const currentDomain = domainManager.getRootDomain(domainManager.getCurrentDomain());
            const isTrusted = domainManager.isDomainTrusted(domainManager.getCurrentDomain());

            if (isTrusted) {
                GM_registerMenuCommand(`🔓 Remove "${currentDomain}" from trusted domains`, () => {
                    domainManager.removeTrustedDomain();
                });
            } else {
                GM_registerMenuCommand(`🔒 Add "${currentDomain}" to trusted domains`, () => {
                    domainManager.addTrustedDomain();
                });
            }

            GM_registerMenuCommand('📊 Show domain status', () => {
                domainManager.showDomainStatus();
            });

            GM_registerMenuCommand('➕ Add custom domain to trusted list', () => {
                const domain = prompt('Enter domain to add to trusted list (e.g., example.com):');
                if (domain && domain.trim()) {
                    domainManager.addTrustedDomain(domain.trim().toLowerCase());
                }
            });
        }
    };

    // Initialize the script
    const init = () => {
        // Load user domains first
        domainManager.loadUserDomains();

        const hostname = window.location.hostname;
        const isTrusted = utils.isTrustedDomain();
        utils.log(`Smart Anti-Adblock Killer v1.2.0 initialized on ${hostname}`, {
            domain: hostname,
            trusted: isTrusted,
            mode: isTrusted ? 'conservative' : 'normal',
            totalTrustedDomains: STATE.allTrustedDomains.length,
            userAddedDomains: STATE.userTrustedDomains.length
        });

        // Setup user interface
        setupKeyboardShortcuts();
        setupMenuCommands();

        // Prevent anti-adblock JavaScript interference
        preventAntiAdblockJS();

        // Set up mutation observer
        if (document.body) {
            setupMutationObserver();
        } else {
            document.addEventListener('DOMContentLoaded', setupMutationObserver);
        }

        // Initial scan
        processAntiAdblock();

        // Periodic checks
        setInterval(processAntiAdblock, CONFIG.checkInterval);

        // Handle page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                setTimeout(processAntiAdblock, 100);
            }
        });

        // Handle focus changes (some anti-adblock scripts activate on focus)
        window.addEventListener('focus', () => {
            setTimeout(processAntiAdblock, 100);
        });
    };

    // Start immediately for document-start, or wait for DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        STATE.observers.forEach(observer => observer.disconnect());
        STATE.observers.length = 0;
    });

})(); 