/**
 * Diff Viewer Module - Handles rendering and UI interactions for diff view
 */
window.DiffViewer = {
    currentDiff: null,
    currentViewMode: 'unified',

    /**
     * Initialize the diff viewer
     */
    async init() {
        this.setupEventListeners();
        this.loadSampleIfRequested();
        await this.loadSharedDiffIfPresent();
    },

    /**
     * Set up event listeners for the diff viewer
     */
    setupEventListeners() {
        // Show diff button
        const showDiffBtn = document.getElementById('show-diff');
        if (showDiffBtn) {
            showDiffBtn.addEventListener('click', () => this.processDiff());
        }

        // Clear diff button
        const clearDiffBtn = document.getElementById('clear-diff');
        if (clearDiffBtn) {
            clearDiffBtn.addEventListener('click', () => this.clearDiff());
        }

        // Load sample button
        const loadSampleBtn = document.getElementById('load-sample');
        if (loadSampleBtn) {
            loadSampleBtn.addEventListener('click', () => this.loadSampleDiff());
        }

        // View mode selector
        const viewModeSelect = document.getElementById('view-mode');
        if (viewModeSelect) {
            viewModeSelect.addEventListener('change', (e) => {
                this.currentViewMode = e.target.value;
                if (this.currentDiff) {
                    this.renderDiff(this.currentDiff);
                }
            });
        }

        // File upload handling
        const fileInput = document.getElementById('diff-file-input');
        if (fileInput) {
            fileInput.addEventListener('change', (e) => this.handleFileUpload(e));
        }

        // Drag and drop handling
        const uploadArea = document.querySelector('.file-upload-area');
        if (uploadArea) {
            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.classList.add('dragover');
            });

            uploadArea.addEventListener('dragleave', (e) => {
                e.preventDefault();
                uploadArea.classList.remove('dragover');
            });

            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.classList.remove('dragover');
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    this.processFile(files[0]);
                }
            });
        }

        // Copy diff button
        const copyDiffBtn = document.getElementById('copy-diff');
        if (copyDiffBtn) {
            copyDiffBtn.addEventListener('click', () => this.copyDiffToClipboard());
        }

        // Download diff button
        const downloadDiffBtn = document.getElementById('download-diff');
        if (downloadDiffBtn) {
            downloadDiffBtn.addEventListener('click', () => this.downloadDiff());
        }

        // Share diff button
        const shareDiffBtn = document.getElementById('share-diff');
        if (shareDiffBtn) {
            shareDiffBtn.addEventListener('click', () => this.showShareModal());
        }

        // Share modal event listeners
        const closeModalBtn = document.getElementById('close-modal');
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => this.hideShareModal());
        }

        const copyShareUrlBtn = document.getElementById('copy-share-url');
        if (copyShareUrlBtn) {
            copyShareUrlBtn.addEventListener('click', () => this.copyShareUrl());
        }

        // Close modal when clicking outside
        const shareModal = document.getElementById('share-modal');
        if (shareModal) {
            shareModal.addEventListener('click', (e) => {
                if (e.target === shareModal) {
                    this.hideShareModal();
                }
            });
        }
    },

    /**
     * Process diff content from textarea or file
     */
    processDiff() {
        const diffInput = document.getElementById('diff-input');
        const diffContent = diffInput ? diffInput.value.trim() : '';

        if (!diffContent) {
            this.showMessage('Please paste some diff content or upload a file.', 'warning');
            return;
        }

        try {
            this.showLoadingState();
            
            // Parse the diff content
            const parsedFiles = window.DiffParser.parse(diffContent);
            const filesWithLineNumbers = window.DiffParser.calculateLineNumbers(parsedFiles);
            
            this.currentDiff = {
                files: filesWithLineNumbers,
                stats: window.DiffParser.getStats(filesWithLineNumbers),
                rawContent: diffContent
            };

            // Render the diff
            this.renderDiff(this.currentDiff);
            
        } catch (error) {
            this.showMessage('Error processing diff: ' + error.message, 'error');
        }
    },

    /**
     * Handle file upload
     */
    handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
            this.processFile(file);
        }
    },

    /**
     * Process uploaded file
     */
    processFile(file) {
        if (!file.type.includes('text') && !file.name.match(/\.(txt|diff|patch)$/i)) {
            this.showMessage('Please upload a text file (.txt, .diff, .patch)', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            const diffInput = document.getElementById('diff-input');
            if (diffInput) {
                diffInput.value = content;
                this.processDiff();
            }
        };
        reader.readAsText(file);
    },

    /**
     * Clear all diff content
     */
    clearDiff() {
        const diffInput = document.getElementById('diff-input');
        if (diffInput) {
            diffInput.value = '';
        }

        const fileInput = document.getElementById('diff-file-input');
        if (fileInput) {
            fileInput.value = '';
        }

        this.currentDiff = null;
        this.hideDiffOutput();
        this.showNoDiffMessage();
    },

    /**
     * Load sample diff for demonstration
     */
    loadSampleDiff() {
        const sampleDiff = window.DiffParser.generateSampleDiff();
        const diffInput = document.getElementById('diff-input');
        if (diffInput) {
            diffInput.value = sampleDiff;
            this.processDiff();
        }
    },

    /**
     * Load sample from URL parameter if requested
     */
    loadSampleIfRequested() {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('sample') === 'true') {
            this.loadSampleDiff();
        }
    },

    /**
     * Render the parsed diff
     */
    renderDiff(diffData) {
        if (!diffData || !diffData.files || diffData.files.length === 0) {
            this.showNoDiffMessage();
            return;
        }

        this.hideNoDiffMessage();
        this.showDiffOutput();

        const diffContent = document.getElementById('diff-content');
        if (!diffContent) return;

        if (this.currentViewMode === 'side-by-side') {
            diffContent.innerHTML = this.renderSideBySideView(diffData);
        } else {
            diffContent.innerHTML = this.renderUnifiedView(diffData);
        }

        // Update stats display
        this.updateStatsDisplay(diffData.stats);
    },

    /**
     * Render unified diff view
     */
    renderUnifiedView(diffData) {
        let html = '';

        diffData.files.forEach(file => {
            html += '<div class="unified-file-container">';
            html += this.renderFileHeader(file);
            
            file.hunks.forEach(hunk => {
                html += this.renderHunkHeader(hunk);
                html += this.renderHunkLinesUnified(hunk);
            });
            
            html += '</div>';
        });

        return html;
    },

    /**
     * Render side-by-side diff view
     */
    renderSideBySideView(diffData) {
        let html = '<div class="side-by-side-container">';
        
        // Headers
        html += '<div class="side-by-side-header bg-red-50 text-red-800">';
        html += '<span class="font-mono text-sm">- Original</span>';
        html += '</div>';
        html += '<div class="side-by-side-header bg-green-50 text-green-800">';
        html += '<span class="font-mono text-sm">+ Modified</span>';
        html += '</div>';
        
        // Content panels
        html += '<div class="side-by-side-panel" id="left-panel">';
        html += '<div class="side-by-side-content">';
        
        html += '</div></div>';
        html += '<div class="side-by-side-panel" id="right-panel">';
        html += '<div class="side-by-side-content">';

        // Build synchronized content
        let leftContent = '';
        let rightContent = '';

        diffData.files.forEach(file => {
            const sideBySideData = this.prepareSideBySideData(file);
            
            // Add file headers
            leftContent += this.renderFileHeader(file, 'original');
            rightContent += this.renderFileHeader(file, 'modified');
            
            // Add content ensuring same number of lines
            const maxLines = Math.max(sideBySideData.original.length, sideBySideData.modified.length);
            
            for (let i = 0; i < maxLines; i++) {
                const leftLine = sideBySideData.original[i] || { type: 'empty', content: '', side: 'original' };
                const rightLine = sideBySideData.modified[i] || { type: 'empty', content: '', side: 'modified' };
                
                leftContent += this.renderSingleLine(leftLine, 'original');
                rightContent += this.renderSingleLine(rightLine, 'modified');
            }
        });

        // Insert content and close
        html = html.replace('<div class="side-by-side-content">', '<div class="side-by-side-content">' + leftContent);
        html += rightContent + '</div></div>';
        html += '</div>';
        
        // Add scroll synchronization after rendering
        setTimeout(() => {
            this.setupScrollSync();
            this.synchronizeHeights();
        }, 100);
        
        return html;
    },

    /**
     * Prepare data for side-by-side view
     */
    prepareSideBySideData(file) {
        const original = [];
        const modified = [];

        file.hunks.forEach(hunk => {
            hunk.lines.forEach(line => {
                switch (line.type) {
                    case 'unchanged':
                        original.push({ ...line, side: 'both' });
                        modified.push({ ...line, side: 'both' });
                        break;
                    case 'removed':
                        original.push({ ...line, side: 'original' });
                        modified.push({ type: 'empty', content: '', side: 'modified' });
                        break;
                    case 'added':
                        original.push({ type: 'empty', content: '', side: 'original' });
                        modified.push({ ...line, side: 'modified' });
                        break;
                }
            });
        });

        // Ensure both arrays have the same length
        const maxLength = Math.max(original.length, modified.length);
        while (original.length < maxLength) {
            original.push({ type: 'empty', content: '', side: 'original' });
        }
        while (modified.length < maxLength) {
            modified.push({ type: 'empty', content: '', side: 'modified' });
        }

        return { original, modified };
    },

    /**
     * Render side-by-side panel
     */
    renderSideBySidePanel(lines, side) {
        let html = '';
        
        lines.forEach(line => {
            html += this.renderSingleLine(line, side);
        });

        return html;
    },

    /**
     * Render a single line for side-by-side view
     */
    renderSingleLine(line, side) {
        if (line.type === 'empty') {
            return '<div class="diff-line diff-line-empty">' +
                   '<div class="diff-line-number"></div>' +
                   '<div class="diff-line-content">&nbsp;</div>' +
                   '</div>';
        } else {
            const lineClass = this.getDiffLineClass(line.type);
            return `<div class="diff-line ${lineClass}">` +
                   `<div class="diff-line-number">${this.getLineNumber(line, side)}</div>` +
                   `<div class="diff-line-content">${this.escapeHtml(line.content)}</div>` +
                   '</div>';
        }
    },

    /**
     * Get line number for display
     */
    getLineNumber(line, side) {
        if (side === 'original') {
            return line.oldLineNumber || '';
        } else if (side === 'modified') {
            return line.newLineNumber || '';
        }
        return line.oldLineNumber || line.newLineNumber || '';
    },

    /**
     * Render file header
     */
    renderFileHeader(file, side = null) {
        const fileName = file.newPath || file.oldPath || 'Unknown file';
        const fileType = window.DiffParser.getFileType(fileName);
        
        let headerText = fileName;
        if (file.type === 'new') {
            headerText = `${fileName} (new file)`;
        } else if (file.type === 'deleted') {
            headerText = `${fileName} (deleted)`;
        }

        return `
            <div class="diff-file-header">
                <span class="mr-2">${this.getFileTypeIcon(fileType)}</span>
                ${this.escapeHtml(headerText)}
            </div>
        `;
    },

    /**
     * Render hunk header
     */
    renderHunkHeader(hunk) {
        return `
            <div class="diff-hunk-header">
                ${this.escapeHtml(hunk.header)}
                ${hunk.context ? ` ${this.escapeHtml(hunk.context)}` : ''}
            </div>
        `;
    },

    /**
     * Render hunk lines for unified view
     */
    renderHunkLinesUnified(hunk) {
        let html = '';
        
        hunk.lines.forEach(line => {
            const lineClass = this.getDiffLineClass(line.type);
            html += `<div class="diff-line ${lineClass}">`;
            html += `<div class="diff-line-number">${this.getLineNumberUnified(line)}</div>`;
            html += `<div class="diff-line-content">${this.escapeHtml(line.content)}</div>`;
            html += '</div>';
        });

        return html;
    },

    /**
     * Get line number for unified view
     */
    getLineNumberUnified(line) {
        switch (line.type) {
            case 'added':
                return `+${line.newLineNumber || ''}`;
            case 'removed':
                return `-${line.oldLineNumber || ''}`;
            case 'unchanged':
                return line.oldLineNumber || line.newLineNumber || '';
            default:
                return '';
        }
    },

    /**
     * Get CSS class for diff line type
     */
    getDiffLineClass(type) {
        switch (type) {
            case 'added':
                return 'diff-line-added';
            case 'removed':
                return 'diff-line-removed';
            case 'unchanged':
                return 'diff-line-unchanged';
            case 'context':
                return 'diff-line-context';
            default:
                return 'diff-line-unchanged';
        }
    },

    /**
     * Get file type icon
     */
    getFileTypeIcon(fileType) {
        const icons = {
            'javascript': '📄',
            'typescript': '📘',
            'java': '☕',
            'python': '🐍',
            'html': '🌐',
            'css': '🎨',
            'json': '📋',
            'markdown': '📝',
            'text': '📄'
        };
        return icons[fileType] || '📄';
    },

    /**
     * Update statistics display
     */
    updateStatsDisplay(stats) {
        // This could be enhanced to show stats in the header
    },

    /**
     * Copy diff to clipboard
     */
    async copyDiffToClipboard() {
        if (!this.currentDiff) {
            this.showMessage('No diff to copy', 'warning');
            return;
        }

        try {
            await navigator.clipboard.writeText(this.currentDiff.rawContent);
            this.showMessage('Diff copied to clipboard!', 'success');
        } catch (error) {
            this.showMessage('Failed to copy to clipboard', 'error');
        }
    },

    /**
     * Download diff as file
     */
    downloadDiff() {
        if (!this.currentDiff) {
            this.showMessage('No diff to download', 'warning');
            return;
        }

        const blob = new Blob([this.currentDiff.rawContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `diff-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showMessage('Diff downloaded!', 'success');
    },

    /**
     * Show loading state
     */
    showLoadingState() {
        const diffOutput = document.getElementById('diff-output');
        const diffContent = document.getElementById('diff-content');
        
        if (diffOutput && diffContent) {
            diffOutput.classList.remove('hidden');
            diffContent.innerHTML = `
                <div class="flex justify-center items-center py-12">
                    <div class="loading-spinner mr-3"></div>
                    <span class="text-gray-600">Processing diff...</span>
                </div>
            `;
        }
        
        this.hideNoDiffMessage();
    },

    /**
     * Show diff output section
     */
    showDiffOutput() {
        const diffOutput = document.getElementById('diff-output');
        if (diffOutput) {
            diffOutput.classList.remove('hidden');
        }
    },

    /**
     * Hide diff output section
     */
    hideDiffOutput() {
        const diffOutput = document.getElementById('diff-output');
        if (diffOutput) {
            diffOutput.classList.add('hidden');
        }
    },

    /**
     * Show no diff message
     */
    showNoDiffMessage() {
        const noDiffMessage = document.getElementById('no-diff-message');
        if (noDiffMessage) {
            noDiffMessage.classList.remove('hidden');
        }
    },

    /**
     * Hide no diff message
     */
    hideNoDiffMessage() {
        const noDiffMessage = document.getElementById('no-diff-message');
        if (noDiffMessage) {
            noDiffMessage.classList.add('hidden');
        }
    },

    /**
     * Show message to user
     */
    showMessage(message, type = 'info') {
        // Simple alert for now - could be enhanced with toast notifications
        const typeEmoji = {
            'success': '✅',
            'error': '❌',
            'warning': '⚠️',
            'info': 'ℹ️'
        };
        
        alert(`${typeEmoji[type] || ''} ${message}`);
    },

    /**
     * Escape HTML to prevent XSS
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    /**
     * Setup synchronized scrolling for side-by-side panels
     */
    setupScrollSync() {
        const leftPanel = document.getElementById('left-panel');
        const rightPanel = document.getElementById('right-panel');
        
        if (!leftPanel || !rightPanel) {
            return;
        }

        let isScrolling = false;

        // Sync right panel when left panel scrolls
        leftPanel.addEventListener('scroll', () => {
            if (isScrolling) return;
            isScrolling = true;
            rightPanel.scrollLeft = leftPanel.scrollLeft;
            requestAnimationFrame(() => {
                isScrolling = false;
            });
        });

        // Sync left panel when right panel scrolls
        rightPanel.addEventListener('scroll', () => {
            if (isScrolling) return;
            isScrolling = true;
            leftPanel.scrollLeft = rightPanel.scrollLeft;
            requestAnimationFrame(() => {
                isScrolling = false;
            });
        });
    },

    /**
     * Synchronize heights of side-by-side panels
     */
    synchronizeHeights() {
        const leftPanel = document.getElementById('left-panel');
        const rightPanel = document.getElementById('right-panel');
        
        if (!leftPanel || !rightPanel) {
            return;
        }

        // Reset any forced heights
        leftPanel.style.height = 'auto';
        rightPanel.style.height = 'auto';

        // Force a reflow to get natural heights
        const leftHeight = leftPanel.offsetHeight;
        const rightHeight = rightPanel.offsetHeight;

        // Set both panels to the maximum height
        const maxHeight = Math.max(leftHeight, rightHeight);
        leftPanel.style.height = maxHeight + 'px';
        rightPanel.style.height = maxHeight + 'px';
    },

    /**
     * Load shared diff content from URL parameter if present
     */
    async loadSharedDiffIfPresent() {
        const urlParams = new URLSearchParams(window.location.search);
        const sharedDiff = urlParams.get('diff');
        
        if (sharedDiff) {
            try {
                // Validate base64 input before decoding
                if (!this.isValidBase64(sharedDiff)) {
                    this.showMessage('Invalid share URL format - corrupted or malformed link', 'error');
                    return;
                }
                
                let decodedDiff;
                
                try {
                    // Try to decompress first (new format with compression)
                    const compressedData = this.base64ToUint8Array(sharedDiff);
                    
                    // Check if this looks like compressed data (has compression type indicator)
                    if (compressedData.length > 0 && (compressedData[0] === 0 || compressedData[0] === 1 || compressedData[0] === 2)) {
                        decodedDiff = await this.decompressBrotli(compressedData);
                    } else {
                        // Fallback to old format (direct base64 decoding)
                        // Need to convert back to regular base64 for atob
                        let regularBase64 = sharedDiff
                            .replace(/-/g, '+')
                            .replace(/_/g, '/');
                        while (regularBase64.length % 4) {
                            regularBase64 += '=';
                        }
                        decodedDiff = atob(regularBase64);
                    }
                } catch (compressionError) {
                    // If compression fails, try old format
                    try {
                        // Convert URL-safe base64 to regular base64
                        let regularBase64 = sharedDiff
                            .replace(/-/g, '+')
                            .replace(/_/g, '/');
                        while (regularBase64.length % 4) {
                            regularBase64 += '=';
                        }
                        decodedDiff = atob(regularBase64);
                    } catch (legacyError) {
                        throw new Error('Unable to decode diff content in either new or legacy format');
                    }
                }
                
                // Validate that decoded content is not empty
                if (!decodedDiff.trim()) {
                    this.showMessage('Shared diff is empty or invalid', 'error');
                    return;
                }
                
                // Set the decoded content in the textarea
                const diffInput = document.getElementById('diff-input');
                if (diffInput) {
                    diffInput.value = decodedDiff;
                    // Automatically process the diff
                    this.processDiff();
                }
            } catch (error) {
                this.showMessage('Error loading shared diff: ' + error.message, 'error');
                if (error.name === 'InvalidCharacterError') {
                    this.showMessage('Invalid share URL - contains invalid characters', 'error');
                } else if (error.message.includes('decompress')) {
                    this.showMessage('Failed to decompress shared diff - URL may be corrupted or from an older version', 'error');
                } else {
                    this.showMessage('Failed to load shared diff - URL may be corrupted', 'error');
                }
            }
        }
    },

    /**
     * Compress string using Brotli compression (with gzip fallback)
     */
    async compressBrotli(str) {
        try {
            // Check if CompressionStream is available
            if (typeof CompressionStream === 'undefined') {
                // Fallback to simple base64 encoding for older browsers
                const encoder = new TextEncoder();
                const data = encoder.encode(str);
                const result = new Uint8Array(data.length + 1);
                result[0] = 2; // Special marker for uncompressed legacy format
                result.set(data, 1);
                return result;
            }

            const encoder = new TextEncoder();
            const data = encoder.encode(str);
            
            // Try Brotli first, fall back to gzip if not supported
            let compressionType = 'br';
            let compressionStream;
            
            try {
                compressionStream = new CompressionStream('br');
            } catch (error) {
                compressionType = 'gzip';
                compressionStream = new CompressionStream('gzip');
            }
            
            const writer = compressionStream.writable.getWriter();
            const reader = compressionStream.readable.getReader();
            
            // Write data to compression stream
            writer.write(data);
            writer.close();
            
            // Read compressed data
            const chunks = [];
            let done = false;
            
            while (!done) {
                const { value, done: readerDone } = await reader.read();
                done = readerDone;
                if (value) {
                    chunks.push(value);
                }
            }
            
            // Combine chunks into single Uint8Array
            const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
            const result = new Uint8Array(totalLength + 1); // +1 for compression type indicator
            
            // First byte indicates compression type: 0 = gzip, 1 = brotli, 2 = uncompressed
            result[0] = compressionType === 'br' ? 1 : 0;
            
            let offset = 1;
            for (const chunk of chunks) {
                result.set(chunk, offset);
                offset += chunk.length;
            }
            
            return result;
        } catch (error) {
            throw new Error('Failed to compress data');
        }
    },

    /**
     * Decompress Brotli compressed data (with gzip fallback detection)
     */
    async decompressBrotli(compressedData) {
        try {
            // First byte indicates compression type: 0 = gzip, 1 = brotli, 2 = uncompressed
            const compressionType = compressedData[0];
            const actualData = compressedData.slice(1);
            
            // Handle uncompressed legacy format
            if (compressionType === 2) {
                const decoder = new TextDecoder();
                return decoder.decode(actualData);
            }

            // Check if DecompressionStream is available
            if (typeof DecompressionStream === 'undefined') {
                throw new Error('DecompressionStream not available - cannot decompress data');
            }
            
            const compressionFormat = compressionType === 1 ? 'br' : 'gzip';
            let decompressionStream;
            
            try {
                decompressionStream = new DecompressionStream(compressionFormat);
            } catch (error) {
                // If the preferred format is not supported, try the other
                const fallbackFormat = compressionFormat === 'br' ? 'gzip' : 'br';
                decompressionStream = new DecompressionStream(fallbackFormat);
            }
            
            const writer = decompressionStream.writable.getWriter();
            const reader = decompressionStream.readable.getReader();
            
            // Write compressed data to decompression stream
            writer.write(actualData);
            writer.close();
            
            // Read decompressed data
            const chunks = [];
            let done = false;
            
            while (!done) {
                const { value, done: readerDone } = await reader.read();
                done = readerDone;
                if (value) {
                    chunks.push(value);
                }
            }
            
            // Combine chunks and decode to string
            const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
            const result = new Uint8Array(totalLength);
            let offset = 0;
            
            for (const chunk of chunks) {
                result.set(chunk, offset);
                offset += chunk.length;
            }
            
            const decoder = new TextDecoder();
            return decoder.decode(result);
        } catch (error) {
            throw new Error('Failed to decompress data');
        }
    },

    /**
     * Convert Uint8Array to URL-safe base64 string
     */
    uint8ArrayToBase64(uint8Array) {
        let binary = '';
        const len = uint8Array.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(uint8Array[i]);
        }
        // Convert to base64 and make it URL-safe
        return btoa(binary)
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '');
    },

    /**
     * Convert URL-safe base64 string to Uint8Array
     */
    base64ToUint8Array(base64) {
        // Convert from URL-safe base64 back to regular base64
        let regularBase64 = base64
            .replace(/-/g, '+')
            .replace(/_/g, '/');
        
        // Add padding if necessary
        while (regularBase64.length % 4) {
            regularBase64 += '=';
        }
        
        const binary = atob(regularBase64);
        const len = binary.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        return bytes;
    },

    /**
     * Generate shareable URL with Brotli compressed and base64 encoded diff content
     */
    async generateShareableUrl(diffContent) {
        try {
            // Compress diff content using Brotli (gzip fallback)
            const compressedData = await this.compressBrotli(diffContent);
            
            // Convert compressed data to base64
            const encodedDiff = this.uint8ArrayToBase64(compressedData);
            
            // Create URL with encoded diff parameter
            const baseUrl = window.location.origin + window.location.pathname;
            const shareUrl = `${baseUrl}?diff=${encodedDiff}`;
            
            return shareUrl;
        } catch (error) {
            throw new Error('Failed to generate shareable URL');
        }
    },

    /**
     * Show share modal with generated URL
     */
    async showShareModal() {
        if (!this.currentDiff || !this.currentDiff.rawContent) {
            this.showMessage('No diff content to share', 'warning');
            return;
        }

        try {
            // Show modal first with loading state
            const modal = document.getElementById('share-modal');
            const shareUrlInput = document.getElementById('share-url');
            
            if (modal && shareUrlInput) {
                shareUrlInput.value = 'Generating compressed link...';
                modal.classList.remove('hidden');
            }

            // Generate shareable URL (now with compression)
            const shareUrl = await this.generateShareableUrl(this.currentDiff.rawContent);
            
            // Update the input with the actual URL
            if (shareUrlInput) {
                shareUrlInput.value = shareUrl;
            }
        } catch (error) {
            this.showMessage('Error generating share URL: ' + error.message, 'error');
            this.hideShareModal();
        }
    },

    /**
     * Copy share URL to clipboard
     */
    async copyShareUrl() {
        const shareUrlInput = document.getElementById('share-url');
        const copySuccess = document.getElementById('copy-success');
        
        if (!shareUrlInput) return;

        try {
            await navigator.clipboard.writeText(shareUrlInput.value);
            
            // Show success message
            if (copySuccess) {
                copySuccess.classList.remove('hidden');
                setTimeout(() => {
                    copySuccess.classList.add('hidden');
                }, 3000);
            }
        } catch (error) {
            // Fallback for older browsers
            shareUrlInput.select();
            document.execCommand('copy');
            
            if (copySuccess) {
                copySuccess.classList.remove('hidden');
                setTimeout(() => {
                    copySuccess.classList.add('hidden');
                }, 3000);
            }
        }
    },

    /**
     * Hide share modal
     */
    hideShareModal() {
        const modal = document.getElementById('share-modal');
        const copySuccess = document.getElementById('copy-success');
        
        if (modal) {
            modal.classList.add('hidden');
        }
        
        if (copySuccess) {
            copySuccess.classList.add('hidden');
        }
    },

    /**
     * Validate base64 string format (supports both regular and URL-safe base64)
     */
    isValidBase64(str) {
        // Check if string is empty
        if (!str || typeof str !== 'string') {
            return false;
        }
        
        // Remove any whitespace
        str = str.trim();
        
        // Check if string contains only valid base64 characters (including URL-safe variants)
        const base64Regex = /^[A-Za-z0-9+/\-_]*={0,2}$/;
        if (!base64Regex.test(str)) {
            return false;
        }
        
        // Try to decode the string to verify it's valid base64
        try {
            // Convert URL-safe base64 to regular base64 for testing
            let testStr = str
                .replace(/-/g, '+')
                .replace(/_/g, '/');
            
            // Add padding if necessary
            while (testStr.length % 4) {
                testStr += '=';
            }
            
            atob(testStr);
            return true;
        } catch (e) {
            return false;
        }
    }
};
