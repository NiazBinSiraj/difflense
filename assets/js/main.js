/**
 * Main Application Module - Initializes and coordinates all modules
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    DiffLensApp.init();
});

/**
 * Main DiffLens Application
 */
window.DiffLensApp = {
    /**
     * Initialize the application
     */
    init() {
        console.log('🔍 DiffLens - Privacy-focused git diff viewer');
        console.log('Version: 1.0.0');
        console.log('Repository: https://github.com/NiazBinSiraj/difflense');
        
        // Initialize modules
        this.initializeModules();
        
        // Setup global event listeners
        this.setupGlobalEventListeners();
        
        // Initialize mobile menu
        this.initializeMobileMenu();
        
        // Show welcome message for first-time visitors
        this.checkFirstTimeVisitor();
        
        // Initialize service worker if available
        this.initializeServiceWorker();
    },

    /**
     * Initialize all application modules
     */
    initializeModules() {
        try {
            // Initialize GitHub integration
            if (window.GitHubIntegration) {
                window.GitHubIntegration.init();
            }

            // Router is already initialized in router.js
            console.log('✅ All modules initialized successfully');
        } catch (error) {
            console.error('❌ Error initializing modules:', error);
        }
    },

    /**
     * Setup global event listeners
     */
    setupGlobalEventListeners() {
        // Keyboard shortcuts
        document.addEventListener('keydown', this.handleKeyboardShortcuts.bind(this));
        
        // Handle window resize for responsive features
        window.addEventListener('resize', this.handleWindowResize.bind(this));
        
        // Handle online/offline events
        window.addEventListener('online', this.handleOnlineStatus.bind(this));
        window.addEventListener('offline', this.handleOfflineStatus.bind(this));
        
        // Prevent default file drag and drop on the window
        window.addEventListener('dragover', (e) => e.preventDefault());
        window.addEventListener('drop', (e) => e.preventDefault());
    },

    /**
     * Handle keyboard shortcuts
     */
    handleKeyboardShortcuts(event) {
        // Ctrl/Cmd + K to focus search (if implemented)
        if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
            event.preventDefault();
            // Could implement global search functionality
        }
        
        // Escape to close modals or clear focus
        if (event.key === 'Escape') {
            this.closeMobileMenu();
        }
        
        // Alt + D to navigate to diff view
        if (event.altKey && event.key === 'd') {
            event.preventDefault();
            if (window.Router) {
                window.Router.navigate('diff-view');
            }
        }
        
        // Alt + H to navigate to home
        if (event.altKey && event.key === 'h') {
            event.preventDefault();
            if (window.Router) {
                window.Router.navigate('home');
            }
        }
    },

    /**
     * Handle window resize events
     */
    handleWindowResize() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth >= 768) {
            this.closeMobileMenu();
        }
    },

    /**
     * Handle online status
     */
    handleOnlineStatus() {
        console.log('🌐 Connection restored');
        // Could show a toast notification
        this.updateConnectionStatus(true);
    },

    /**
     * Handle offline status
     */
    handleOfflineStatus() {
        console.log('📱 Working offline');
        // Could show a toast notification
        this.updateConnectionStatus(false);
    },

    /**
     * Update connection status indicator
     */
    updateConnectionStatus(isOnline) {
        // Could add a connection status indicator to the UI
        document.body.setAttribute('data-connection', isOnline ? 'online' : 'offline');
    },

    /**
     * Initialize mobile menu functionality
     */
    initializeMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                    mobileMenu.classList.add('hidden');
                }
            });
        }
    },

    /**
     * Close mobile menu
     */
    closeMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) {
            mobileMenu.classList.add('hidden');
        }
    },

    /**
     * Check if this is a first-time visitor
     */
    checkFirstTimeVisitor() {
        const hasVisited = localStorage.getItem('difflens-visited');
        if (!hasVisited) {
            localStorage.setItem('difflens-visited', 'true');
            console.log('👋 Welcome to DiffLens! This app works entirely in your browser for maximum privacy.');
            
            // Could show a welcome modal or tour
            this.showWelcomeMessage();
        }
    },

    /**
     * Show welcome message for new users
     */
    showWelcomeMessage() {
        // Simple console message for now - could be enhanced with a modal
        setTimeout(() => {
            if (console.info) {
                console.info(`
🔍 Welcome to DiffLens!

Key Features:
• 🔒 Privacy-first: All processing happens in your browser
• ⚡ Fast: No server round trips required
• 🎨 Clean: Beautiful, easy-to-read diff visualization
• 📱 Responsive: Works on all devices
• 🆓 Free: Open source and always free

Quick Start:
1. Go to the Diff View page
2. Paste your git diff output or upload a file
3. Choose your preferred view mode
4. Enjoy clean, highlighted diff visualization!

GitHub: https://github.com/NiazBinSiraj/difflense
                `);
            }
        }, 1000);
    },

    /**
     * Initialize service worker for offline support
     */
    initializeServiceWorker() {
        if ('serviceWorker' in navigator) {
            // Service worker could be added for offline functionality
            console.log('💾 Service worker support available');
            // navigator.serviceWorker.register('/sw.js');
        }
    },

    /**
     * Get application info
     */
    getAppInfo() {
        return {
            name: 'DiffLens',
            version: '1.0.0',
            description: 'Privacy-focused git diff viewer',
            repository: 'https://github.com/NiazBinSiraj/difflense',
            license: 'MIT',
            author: 'NiazBinSiraj',
            features: [
                'Client-side diff parsing',
                'Side-by-side and unified views',
                'Syntax highlighting',
                'File upload support',
                'Mobile responsive',
                'Privacy-first design'
            ]
        };
    },

    /**
     * Handle application errors
     */
    handleError(error, context = 'Unknown') {
        console.error(`❌ DiffLens Error [${context}]:`, error);
        
        // Could send errors to a logging service (while respecting privacy)
        // For now, just log to console and show user-friendly message
        this.showErrorMessage('Something went wrong. Please try again.');
    },

    /**
     * Show error message to user
     */
    showErrorMessage(message) {
        // Simple alert for now - could be enhanced with toast notifications
        alert(`❌ ${message}`);
    },

    /**
     * Show success message to user
     */
    showSuccessMessage(message) {
        // Simple console log for now - could be enhanced with toast notifications
        console.log(`✅ ${message}`);
    },

    /**
     * Utility function to debounce function calls
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Utility function to throttle function calls
     */
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    /**
     * Check if device prefers dark mode
     */
    prefersDarkMode() {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    },

    /**
     * Get device information for analytics (anonymous)
     */
    getDeviceInfo() {
        return {
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform,
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            colorScheme: this.prefersDarkMode() ? 'dark' : 'light'
        };
    }
};

// Make DiffLensApp globally available
window.DiffLensApp = DiffLensApp;

// Add some helpful console styling
const consoleBanner = `
 _____  _  __  __  _                     
|  __ \\(_)/ _|/ _|| |                    
| |  | |_| |_| |_ | |     ___  _ __  ___ 
| |  | | |  _|  _|| |    / _ \\| '_ \\/ __|
| |__| | | | | |  | |___|  __/| | | \\__ \\
|_____/|_|_| |_|  |______\\___||_| |_|___/

Privacy-focused git diff viewer
https://github.com/NiazBinSiraj/difflense
`;

console.log(`%c${consoleBanner}`, 'color: #2563eb; font-family: monospace;');
