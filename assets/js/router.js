/**
 * Router Module - Handles client-side navigation
 */
class Router {
    constructor() {
        this.routes = new Map();
        this.currentPage = 'home';
        this.init();
    }

    init() {
        // Handle navigation clicks
        document.addEventListener('click', (e) => {
            const link = e.target.closest('[data-page]');
            if (link) {
                e.preventDefault();
                const page = link.dataset.page;
                this.navigate(page);
            }
        });

        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            const page = e.state?.page || 'home';
            this.navigate(page, false);
        });

        // Load initial page
        const initialPage = this.getPageFromURL();
        this.navigate(initialPage, false);
    }

    getPageFromURL() {
        const hash = window.location.hash.slice(1);
        return hash || 'home';
    }

    navigate(page, updateHistory = true) {
        if (this.currentPage === page) return;

        this.currentPage = page;

        // Update URL
        if (updateHistory) {
            const url = page === 'home' ? '/' : `/#${page}`;
            history.pushState({ page }, '', url);
        }

        // Update navigation active state
        this.updateNavigation();

        // Load page content
        this.loadPage(page);

        // Close mobile menu if open
        this.closeMobileMenu();
    }

    updateNavigation() {
        // Desktop navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            const isActive = link.dataset.page === this.currentPage;
            if (isActive) {
                link.classList.add('text-primary', 'bg-primary/10');
                link.classList.remove('text-gray-700', 'hover:text-primary', 'hover:bg-primary/5');
            } else {
                link.classList.remove('text-primary', 'bg-primary/10');
                link.classList.add('text-gray-700', 'hover:text-primary', 'hover:bg-primary/5');
            }
        });

        // Mobile navigation
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            const isActive = link.dataset.page === this.currentPage;
            if (isActive) {
                link.classList.add('text-primary', 'bg-primary/10');
                link.classList.remove('text-gray-700', 'hover:text-primary', 'hover:bg-primary/5');
            } else {
                link.classList.remove('text-primary', 'bg-primary/10');
                link.classList.add('text-gray-700', 'hover:text-primary', 'hover:bg-primary/5');
            }
        });
    }

    loadPage(page) {
        const contentContainer = document.getElementById('page-content');
        
        // Show loading state
        contentContainer.innerHTML = `
            <div class="flex justify-center items-center min-h-96">
                <div class="loading-spinner mr-2"></div>
                <span class="text-gray-600">Loading...</span>
            </div>
        `;

        // Simulate a small delay for smooth transition
        setTimeout(() => {
            let content = '';
            
            switch (page) {
                case 'home':
                    content = window.Pages.getHomePage();
                    break;
                case 'diff-view':
                    content = window.Pages.getDiffViewPage();
                    break;
                case 'contribute':
                    content = window.Pages.getContributePage();
                    break;
                case 'about':
                    content = window.Pages.getAboutPage();
                    break;
                case 'contact':
                    content = window.Pages.getContactPage();
                    break;
                default:
                    content = window.Pages.getNotFoundPage();
            }

            contentContainer.innerHTML = content;
            contentContainer.classList.add('fade-in');

            // Initialize page-specific functionality
            this.initPageFeatures(page);

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
    }

    initPageFeatures(page) {
        switch (page) {
            case 'diff-view':
                if (window.DiffViewer) {
                    window.DiffViewer.init();
                }
                break;
        }
    }

    closeMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) {
            mobileMenu.classList.add('hidden');
        }
    }
}

// Initialize router when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.Router = new Router();
    });
} else {
    window.Router = new Router();
}
