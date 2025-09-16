/**
 * Pages Module - Contains all page content and templates
 */
window.Pages = {
    getHomePage() {
        return `
            <div class="relative overflow-hidden">
                <!-- Hero Section -->
                <section class="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="text-center">
                            <div class="flex justify-center mb-8">
                                <div class="bg-white p-6 rounded-full shadow-lg">
                                    <svg class="h-16 w-16 text-primary" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h3c.6 0 1-.4 1-1s-.4-1-1-1H5V5h3c.6 0 1-.4 1-1s-.4-1-1-1zm7.5 17l1.1-1.1L14.7 17H21v-2h-6.3l1.9-1.9L15.5 12l-3.5 3.5v1L15.5 20z"/>
                                    </svg>
                                </div>
                            </div>
                            <h1 class="text-5xl font-bold text-gray-900 mb-6 text-balance">
                                DiffLens
                            </h1>
                            <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto text-balance">
                                A clean, secure, and privacy-focused git diff viewer. Process everything client-side with no data leaving your browser.
                            </p>
                            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                                <button data-page="diff-view" class="btn-primary px-8 py-3 text-lg">
                                    Try Diff Viewer
                                </button>
                                <a href="https://github.com/NiazBinSiraj/difflense" target="_blank" rel="noopener noreferrer" 
                                   class="btn-outline px-8 py-3 text-lg inline-flex items-center">
                                    <svg class="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                                    </svg>
                                    View on GitHub
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Features Section -->
                <section class="py-20 bg-white">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="text-center mb-16">
                            <h2 class="text-3xl font-bold text-gray-900 mb-4">Why Choose DiffLens?</h2>
                            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                                Built with privacy and security in mind, DiffLens processes all your code diffs locally in your browser.
                            </p>
                        </div>
                        
                        <div class="grid md:grid-cols-3 gap-8">
                            <div class="text-center">
                                <div class="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                                    </svg>
                                </div>
                                <h3 class="text-xl font-semibold text-gray-900 mb-3">Privacy First</h3>
                                <p class="text-gray-600">
                                    All processing happens locally in your browser. Your code never leaves your machine.
                                </p>
                            </div>
                            
                            <div class="text-center">
                                <div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg class="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                                    </svg>
                                </div>
                                <h3 class="text-xl font-semibold text-gray-900 mb-3">Lightning Fast</h3>
                                <p class="text-gray-600">
                                    Instant diff parsing and rendering with no server round trips required.
                                </p>
                            </div>
                            
                            <div class="text-center">
                                <div class="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg class="h-8 w-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                </div>
                                <h3 class="text-xl font-semibold text-gray-900 mb-3">Easy to Use</h3>
                                <p class="text-gray-600">
                                    Simple interface with support for paste, file upload, and multiple view modes.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- How It Works Section -->
                <section class="py-20 bg-gray-50">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="text-center mb-16">
                            <h2 class="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
                            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                                Get started with DiffLens in just a few simple steps.
                            </p>
                        </div>
                        
                        <div class="grid md:grid-cols-4 gap-8">
                            <div class="text-center">
                                <div class="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                                <h3 class="text-lg font-semibold text-gray-900 mb-2">Generate Diff</h3>
                                <p class="text-gray-600 text-sm">Run <code class="bg-gray-200 px-2 py-1 rounded text-xs">git diff</code> in your repository</p>
                            </div>
                            
                            <div class="text-center">
                                <div class="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                                <h3 class="text-lg font-semibold text-gray-900 mb-2">Upload or Paste</h3>
                                <p class="text-gray-600 text-sm">Copy the diff output or upload a diff file</p>
                            </div>
                            
                            <div class="text-center">
                                <div class="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                                <h3 class="text-lg font-semibold text-gray-900 mb-2">Choose View</h3>
                                <p class="text-gray-600 text-sm">Select unified or side-by-side view mode</p>
                            </div>
                            
                            <div class="text-center">
                                <div class="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
                                <h3 class="text-lg font-semibold text-gray-900 mb-2">Review Changes</h3>
                                <p class="text-gray-600 text-sm">Analyze your code changes with syntax highlighting</p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Open Source Section -->
                <section class="py-20 bg-white">
                    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div class="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-12 text-white">
                            <h2 class="text-3xl font-bold mb-4">Open Source & Free</h2>
                            <p class="text-xl mb-8 text-blue-100">
                                DiffLens is completely open source and free to use. Contribute to make it even better!
                            </p>
                            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                                <button data-page="contribute" class="bg-white text-primary px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
                                    Learn How to Contribute
                                </button>
                                <a href="https://github.com/NiazBinSiraj/difflense/issues" target="_blank" rel="noopener noreferrer" 
                                   class="border border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-primary transition-colors">
                                    Report Issues
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        `;
    },

    getDiffViewPage() {
        return `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div class="text-center mb-12">
                    <h1 class="text-4xl font-bold text-gray-900 mb-4">Diff Viewer</h1>
                    <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                        Paste your git diff output or upload a diff file to visualize code changes with syntax highlighting.
                    </p>
                </div>

                <!-- Input Section -->
                <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <div class="grid md:grid-cols-2 gap-6 mb-6">
                        <!-- Text Input -->
                        <div>
                            <label for="diff-input" class="block text-sm font-medium text-gray-700 mb-2">
                                Paste Diff Content
                            </label>
                            <textarea
                                id="diff-input"
                                rows="10"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary font-mono text-sm"
                                placeholder="Paste your git diff output here..."
                            ></textarea>
                        </div>

                        <!-- File Upload -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Upload Diff File
                            </label>
                            <div class="file-upload-area relative">
                                <input type="file" id="diff-file-input" class="file-upload-input" accept=".txt,.diff,.patch">
                                <div class="text-center">
                                    <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    <p class="text-sm text-gray-600">
                                        <span class="text-primary font-medium">Click to upload</span> or drag and drop
                                    </p>
                                    <p class="text-xs text-gray-500 mt-1">
                                        .txt, .diff, .patch files supported
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Controls -->
                    <div class="flex flex-col sm:flex-row gap-4 items-center justify-between border-t pt-6">
                        <div class="flex gap-4">
                            <div class="flex items-center space-x-2">
                                <label class="text-sm font-medium text-gray-700">View Mode:</label>
                                <select id="view-mode" class="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-primary focus:border-primary">
                                    <option value="unified">Unified</option>
                                    <option value="side-by-side">Side by Side</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="flex gap-3">
                            <button id="clear-diff" class="btn-secondary">
                                Clear
                            </button>
                            <button id="show-diff" class="btn-primary">
                                Show Diff
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Diff Output -->
                <div id="diff-output" class="hidden">
                    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div class="bg-gray-50 px-6 py-3 border-b border-gray-200">
                            <div class="flex justify-between items-center">
                                <h3 class="text-lg font-medium text-gray-900">Diff Results</h3>
                                <div class="flex gap-2">
                                    <button id="copy-diff" class="text-sm text-gray-600 hover:text-primary">
                                        Copy to Clipboard
                                    </button>
                                    <button id="download-diff" class="text-sm text-gray-600 hover:text-primary">
                                        Download
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div id="diff-content" class="diff-viewer">
                            <!-- Diff content will be rendered here -->
                        </div>
                    </div>
                </div>

                <!-- No Diff Message -->
                <div id="no-diff-message" class="hidden text-center py-12">
                    <div class="text-gray-500">
                        <svg class="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                        </svg>
                        <h3 class="text-lg font-medium text-gray-900 mb-2">No diff to display</h3>
                        <p class="text-gray-600">Paste or upload a git diff to get started.</p>
                    </div>
                </div>

                <!-- Sample Diff Button -->
                <div class="text-center mt-8">
                    <button id="load-sample" class="text-primary hover:text-primary-dark underline">
                        Load Sample Diff
                    </button>
                </div>
            </div>
        `;
    },

    getContributePage() {
        return `
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div class="text-center mb-12">
                    <h1 class="text-4xl font-bold text-gray-900 mb-4">Contribute to DiffLens</h1>
                    <p class="text-lg text-gray-600">
                        Help us make DiffLens better! Here's how you can contribute to our open-source project.
                    </p>
                </div>

                <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
                    <h2 class="text-2xl font-bold text-gray-900 mb-6">Getting Started</h2>
                    
                    <div class="space-y-6">
                        <div>
                            <h3 class="text-xl font-semibold text-gray-900 mb-3">1. Fork the Repository</h3>
                            <p class="text-gray-600 mb-4">
                                Start by forking our repository on GitHub to create your own copy.
                            </p>
                            <div class="bg-gray-100 rounded-md p-4 font-mono text-sm">
                                <p class="text-gray-800">
                                    git clone https://github.com/YOUR_USERNAME/difflense.git<br>
                                    cd difflense
                                </p>
                            </div>
                        </div>

                        <div>
                            <h3 class="text-xl font-semibold text-gray-900 mb-3">2. Set Up Development Environment</h3>
                            <p class="text-gray-600 mb-4">
                                DiffLens is a static website project. You can serve it locally using any web server.
                            </p>
                            <div class="bg-gray-100 rounded-md p-4 font-mono text-sm">
                                <p class="text-gray-800">
                                    # Using Python<br>
                                    python -m http.server 8000<br><br>
                                    # Using Node.js<br>
                                    npx serve .<br><br>
                                    # Using PHP<br>
                                    php -S localhost:8000
                                </p>
                            </div>
                        </div>

                        <div>
                            <h3 class="text-xl font-semibold text-gray-900 mb-3">3. Make Your Changes</h3>
                            <p class="text-gray-600 mb-4">
                                Create a new branch for your feature or bug fix:
                            </p>
                            <div class="bg-gray-100 rounded-md p-4 font-mono text-sm">
                                <p class="text-gray-800">
                                    git checkout -b feature/your-feature-name<br>
                                    # Make your changes<br>
                                    git add .<br>
                                    git commit -m "Add your descriptive commit message"
                                </p>
                            </div>
                        </div>

                        <div>
                            <h3 class="text-xl font-semibold text-gray-900 mb-3">4. Submit a Pull Request</h3>
                            <p class="text-gray-600 mb-4">
                                Push your changes and create a pull request on GitHub.
                            </p>
                            <div class="bg-gray-100 rounded-md p-4 font-mono text-sm">
                                <p class="text-gray-800">
                                    git push origin feature/your-feature-name
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="grid md:grid-cols-2 gap-8 mb-8">
                    <div class="bg-white rounded-lg shadow-lg p-6">
                        <h2 class="text-xl font-bold text-gray-900 mb-4">Ways to Contribute</h2>
                        <ul class="space-y-3">
                            <li class="flex items-start">
                                <span class="text-primary mr-2">•</span>
                                <span class="text-gray-600">Fix bugs and improve performance</span>
                            </li>
                            <li class="flex items-start">
                                <span class="text-primary mr-2">•</span>
                                <span class="text-gray-600">Add new features and enhancements</span>
                            </li>
                            <li class="flex items-start">
                                <span class="text-primary mr-2">•</span>
                                <span class="text-gray-600">Improve documentation</span>
                            </li>
                            <li class="flex items-start">
                                <span class="text-primary mr-2">•</span>
                                <span class="text-gray-600">Report issues and suggest improvements</span>
                            </li>
                            <li class="flex items-start">
                                <span class="text-primary mr-2">•</span>
                                <span class="text-gray-600">Add more diff format support</span>
                            </li>
                            <li class="flex items-start">
                                <span class="text-primary mr-2">•</span>
                                <span class="text-gray-600">Improve UI/UX design</span>
                            </li>
                        </ul>
                    </div>

                    <div class="bg-white rounded-lg shadow-lg p-6">
                        <h2 class="text-xl font-bold text-gray-900 mb-4">Coding Guidelines</h2>
                        <ul class="space-y-3">
                            <li class="flex items-start">
                                <span class="text-primary mr-2">•</span>
                                <span class="text-gray-600">Use modern JavaScript (ES6+)</span>
                            </li>
                            <li class="flex items-start">
                                <span class="text-primary mr-2">•</span>
                                <span class="text-gray-600">Follow consistent code formatting</span>
                            </li>
                            <li class="flex items-start">
                                <span class="text-primary mr-2">•</span>
                                <span class="text-gray-600">Write clear, descriptive commit messages</span>
                            </li>
                            <li class="flex items-start">
                                <span class="text-primary mr-2">•</span>
                                <span class="text-gray-600">Test your changes thoroughly</span>
                            </li>
                            <li class="flex items-start">
                                <span class="text-primary mr-2">•</span>
                                <span class="text-gray-600">Maintain privacy-first approach</span>
                            </li>
                            <li class="flex items-start">
                                <span class="text-primary mr-2">•</span>
                                <span class="text-gray-600">Use TailwindCSS for styling</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="bg-gradient-to-r from-primary to-blue-600 rounded-lg p-8 text-white text-center">
                    <h2 class="text-2xl font-bold mb-4">Join Our Community</h2>
                    <p class="text-lg mb-6 text-blue-100">
                        Connect with other contributors and stay updated on project developments.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="https://github.com/NiazBinSiraj/difflense" target="_blank" rel="noopener noreferrer" 
                           class="bg-white text-primary px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center">
                            <svg class="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                            </svg>
                            GitHub Repository
                        </a>
                        <a href="https://github.com/NiazBinSiraj/difflense/issues" target="_blank" rel="noopener noreferrer" 
                           class="border border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-primary transition-colors">
                            Report Issues
                        </a>
                    </div>
                </div>
            </div>
        `;
    },

    getAboutPage() {
        return `
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div class="text-center mb-12">
                    <h1 class="text-4xl font-bold text-gray-900 mb-4">About DiffLens</h1>
                    <p class="text-lg text-gray-600">
                        Learn more about our privacy-focused git diff viewer and the philosophy behind it.
                    </p>
                </div>

                <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
                    <h2 class="text-2xl font-bold text-gray-900 mb-6">Our Mission</h2>
                    <p class="text-gray-600 text-lg leading-relaxed mb-6">
                        DiffLens was created with a simple yet important mission: to provide developers with a clean, 
                        secure, and privacy-focused way to visualize code changes. In an era where data privacy is 
                        paramount, we believe that your code should never leave your machine unless you explicitly 
                        choose to share it.
                    </p>
                    <p class="text-gray-600 leading-relaxed">
                        Our tool processes all git diff files entirely on the client-side, ensuring that your sensitive 
                        code remains private and secure. Whether you're reviewing personal projects or enterprise code, 
                        DiffLens provides the visualization you need without compromising your privacy.
                    </p>
                </div>

                <div class="grid md:grid-cols-2 gap-8 mb-8">
                    <div class="bg-white rounded-lg shadow-lg p-6">
                        <h2 class="text-xl font-bold text-gray-900 mb-4">Key Features</h2>
                        <ul class="space-y-3">
                            <li class="flex items-start">
                                <svg class="h-5 w-5 text-green-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                                </svg>
                                <span class="text-gray-600">Client-side processing for maximum privacy</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="h-5 w-5 text-green-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                                </svg>
                                <span class="text-gray-600">Side-by-side and unified diff views</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="h-5 w-5 text-green-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                                </svg>
                                <span class="text-gray-600">Syntax highlighting and line numbers</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="h-5 w-5 text-green-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                                </svg>
                                <span class="text-gray-600">File upload and paste support</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="h-5 w-5 text-green-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                                </svg>
                                <span class="text-gray-600">Mobile-responsive design</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="h-5 w-5 text-green-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                                </svg>
                                <span class="text-gray-600">No registration or account required</span>
                            </li>
                        </ul>
                    </div>

                    <div class="bg-white rounded-lg shadow-lg p-6">
                        <h2 class="text-xl font-bold text-gray-900 mb-4">Technical Details</h2>
                        <ul class="space-y-3">
                            <li class="flex items-start">
                                <svg class="h-5 w-5 text-blue-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
                                </svg>
                                <span class="text-gray-600">Built with vanilla JavaScript</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="h-5 w-5 text-blue-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
                                </svg>
                                <span class="text-gray-600">Styled with TailwindCSS</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="h-5 w-5 text-blue-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
                                </svg>
                                <span class="text-gray-600">Hosted on GitHub Pages</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="h-5 w-5 text-blue-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
                                </svg>
                                <span class="text-gray-600">Open source (MIT License)</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="h-5 w-5 text-blue-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
                                </svg>
                                <span class="text-gray-600">No external dependencies</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="h-5 w-5 text-blue-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
                                </svg>
                                <span class="text-gray-600">Cross-browser compatible</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-8 text-white">
                    <h2 class="text-2xl font-bold mb-4">Privacy & Security</h2>
                    <p class="text-gray-300 leading-relaxed mb-6">
                        At DiffLens, privacy isn't an afterthought—it's our foundation. We've designed the entire 
                        application to work without any server-side processing, meaning your code never leaves your 
                        browser. This approach provides several key benefits:
                    </p>
                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 class="text-lg font-semibold mb-3 text-blue-400">Complete Privacy</h3>
                            <p class="text-gray-300 text-sm">
                                Your diffs are processed entirely in your browser's JavaScript engine, 
                                ensuring no sensitive code is transmitted over networks.
                            </p>
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold mb-3 text-blue-400">No Data Collection</h3>
                            <p class="text-gray-300 text-sm">
                                We don't collect, store, or track any of your data. No analytics, 
                                no cookies, no user accounts required.
                            </p>
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold mb-3 text-blue-400">Offline Capable</h3>
                            <p class="text-gray-300 text-sm">
                                Once loaded, DiffLens works completely offline, making it perfect 
                                for secure environments or when working without internet access.
                            </p>
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold mb-3 text-blue-400">Open Source</h3>
                            <p class="text-gray-300 text-sm">
                                Our entire codebase is open source, allowing you to audit our 
                                privacy claims and even host your own instance.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    getContactPage() {
        return `
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div class="text-center mb-12">
                    <h1 class="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
                    <p class="text-lg text-gray-600">
                        Have questions, suggestions, or want to get involved? We'd love to hear from you!
                    </p>
                </div>

                <div class="grid md:grid-cols-2 gap-8 mb-8">
                    <div class="bg-white rounded-lg shadow-lg p-8">
                        <h2 class="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                        
                        <div class="space-y-6">
                            <div class="flex items-start">
                                <div class="bg-primary/10 p-3 rounded-full mr-4">
                                    <svg class="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="text-lg font-semibold text-gray-900 mb-2">Documentation</h3>
                                    <p class="text-gray-600">
                                        Check out our comprehensive documentation and FAQ on GitHub for answers to common questions.
                                    </p>
                                    <a href="https://github.com/NiazBinSiraj/difflense/wiki" target="_blank" rel="noopener noreferrer" 
                                       class="text-primary hover:text-primary-dark underline mt-2 inline-block">
                                        View Documentation →
                                    </a>
                                </div>
                            </div>

                            <div class="flex items-start">
                                <div class="bg-primary/10 p-3 rounded-full mr-4">
                                    <svg class="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="text-lg font-semibold text-gray-900 mb-2">Report Issues</h3>
                                    <p class="text-gray-600">
                                        Found a bug or have a feature request? Please report it on our GitHub issues page.
                                    </p>
                                    <a href="https://github.com/NiazBinSiraj/difflense/issues" target="_blank" rel="noopener noreferrer" 
                                       class="text-primary hover:text-primary-dark underline mt-2 inline-block">
                                        Report Issue →
                                    </a>
                                </div>
                            </div>

                            <div class="flex items-start">
                                <div class="bg-primary/10 p-3 rounded-full mr-4">
                                    <svg class="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h8z"/>
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="text-lg font-semibold text-gray-900 mb-2">Discussions</h3>
                                    <p class="text-gray-600">
                                        Join our community discussions to share ideas, ask questions, and connect with other users.
                                    </p>
                                    <a href="https://github.com/NiazBinSiraj/difflense/discussions" target="_blank" rel="noopener noreferrer" 
                                       class="text-primary hover:text-primary-dark underline mt-2 inline-block">
                                        Join Discussion →
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-lg shadow-lg p-8">
                        <h2 class="text-2xl font-bold text-gray-900 mb-6">Quick Contact</h2>
                        
                        <div class="space-y-4">
                            <div>
                                <label for="contact-name" class="block text-sm font-medium text-gray-700 mb-1">
                                    Name
                                </label>
                                <input type="text" id="contact-name" 
                                       class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary">
                            </div>

                            <div>
                                <label for="contact-email" class="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input type="email" id="contact-email" 
                                       class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary">
                            </div>

                            <div>
                                <label for="contact-subject" class="block text-sm font-medium text-gray-700 mb-1">
                                    Subject
                                </label>
                                <select id="contact-subject" 
                                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary">
                                    <option>General Question</option>
                                    <option>Bug Report</option>
                                    <option>Feature Request</option>
                                    <option>Contribution Inquiry</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div>
                                <label for="contact-message" class="block text-sm font-medium text-gray-700 mb-1">
                                    Message
                                </label>
                                <textarea id="contact-message" rows="6" 
                                          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                                          placeholder="Tell us about your question or feedback..."></textarea>
                            </div>

                            <button onclick="handleContactForm()" class="w-full btn-primary">
                                Send Message
                            </button>

                            <p class="text-sm text-gray-500 mt-4">
                                <strong>Note:</strong> This is a demo contact form. For actual support, please use the GitHub links above.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="bg-gradient-to-r from-primary to-blue-600 rounded-lg p-8 text-white text-center">
                    <h2 class="text-2xl font-bold mb-4">Stay Updated</h2>
                    <p class="text-lg mb-6 text-blue-100">
                        Follow our GitHub repository to stay updated on new features and releases.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="https://github.com/NiazBinSiraj/difflense" target="_blank" rel="noopener noreferrer" 
                           class="bg-white text-primary px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center">
                            <svg class="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                            </svg>
                            Star on GitHub
                        </a>
                        <a href="https://github.com/NiazBinSiraj/difflense/releases" target="_blank" rel="noopener noreferrer" 
                           class="border border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-primary transition-colors">
                            View Releases
                        </a>
                    </div>
                </div>
            </div>

            <script>
                function handleContactForm() {
                    const name = document.getElementById('contact-name').value;
                    const email = document.getElementById('contact-email').value;
                    const subject = document.getElementById('contact-subject').value;
                    const message = document.getElementById('contact-message').value;

                    if (!name || !email || !message) {
                        alert('Please fill in all required fields.');
                        return;
                    }

                    // In a real implementation, you would send this data to a server
                    // For now, we'll just show a demo message
                    alert('Thank you for your message! This is a demo form. For actual support, please use the GitHub links above.');
                    
                    // Clear the form
                    document.getElementById('contact-name').value = '';
                    document.getElementById('contact-email').value = '';
                    document.getElementById('contact-message').value = '';
                }
            </script>
        `;
    },

    getNotFoundPage() {
        return `
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <div class="mb-8">
                    <svg class="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                </div>
                <h1 class="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
                <p class="text-lg text-gray-600 mb-8">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <button data-page="home" class="btn-primary">
                    Go Back Home
                </button>
            </div>
        `;
    }
};
