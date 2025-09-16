/**
 * Diff Parser Module - Parses git diff output into structured data
 */
window.DiffParser = {
    /**
     * Parse git diff content into structured format
     * @param {string} diffContent - Raw git diff content
     * @returns {Array} Array of parsed file changes
     */
    parse(diffContent) {
        if (!diffContent || typeof diffContent !== 'string') {
            return [];
        }

        const lines = diffContent.split('\n');
        const files = [];
        let currentFile = null;
        let currentHunk = null;
        let i = 0;

        while (i < lines.length) {
            const line = lines[i];

            // File header detection
            if (line.startsWith('diff --git')) {
                // Save previous file if exists
                if (currentFile) {
                    files.push(currentFile);
                }

                // Start new file
                currentFile = this.parseFileHeader(line);
                currentFile.hunks = [];
                currentHunk = null;
            }
            // Index line (contains file hashes)
            else if (line.startsWith('index ')) {
                if (currentFile) {
                    currentFile.index = line;
                }
            }
            // File mode changes
            else if (line.startsWith('new file mode') || line.startsWith('deleted file mode')) {
                if (currentFile) {
                    currentFile.mode = line;
                }
            }
            // Old file path
            else if (line.startsWith('--- ')) {
                if (currentFile) {
                    currentFile.oldPath = this.extractFilePath(line);
                }
            }
            // New file path
            else if (line.startsWith('+++ ')) {
                if (currentFile) {
                    currentFile.newPath = this.extractFilePath(line);
                }
            }
            // Hunk header
            else if (line.startsWith('@@')) {
                currentHunk = this.parseHunkHeader(line);
                if (currentFile) {
                    currentFile.hunks.push(currentHunk);
                }
            }
            // Content lines
            else if (currentHunk && (line.startsWith('+') || line.startsWith('-') || line.startsWith(' ') || line === '')) {
                const diffLine = this.parseDiffLine(line, currentHunk.lines.length + 1);
                currentHunk.lines.push(diffLine);
            }

            i++;
        }

        // Add last file
        if (currentFile) {
            files.push(currentFile);
        }

        return files;
    },

    /**
     * Parse file header line
     * @param {string} headerLine - The diff --git line
     * @returns {Object} File object
     */
    parseFileHeader(headerLine) {
        // Extract file paths from "diff --git a/path/to/file b/path/to/file"
        const match = headerLine.match(/^diff --git a\/(.+) b\/(.+)$/);
        if (match) {
            return {
                oldPath: match[1],
                newPath: match[2],
                type: 'modified'
            };
        }

        return {
            oldPath: '',
            newPath: '',
            type: 'unknown'
        };
    },

    /**
     * Extract file path from --- or +++ lines
     * @param {string} line - The file path line
     * @returns {string} Cleaned file path
     */
    extractFilePath(line) {
        // Remove prefix and extract path
        const path = line.substring(4); // Remove "--- " or "+++ "
        
        // Handle special cases
        if (path === '/dev/null') {
            return null;
        }

        // Remove a/ or b/ prefix if present
        return path.replace(/^[ab]\//, '');
    },

    /**
     * Parse hunk header
     * @param {string} hunkLine - The @@ hunk header line
     * @returns {Object} Hunk object
     */
    parseHunkHeader(hunkLine) {
        // Parse @@ -oldStart,oldCount +newStart,newCount @@ context
        const match = hunkLine.match(/^@@\s*-(\d+)(?:,(\d+))?\s*\+(\d+)(?:,(\d+))?\s*@@(.*)$/);
        
        if (match) {
            return {
                oldStart: parseInt(match[1], 10),
                oldCount: match[2] ? parseInt(match[2], 10) : 1,
                newStart: parseInt(match[3], 10),
                newCount: match[4] ? parseInt(match[4], 10) : 1,
                context: match[5].trim(),
                header: hunkLine,
                lines: []
            };
        }

        return {
            oldStart: 0,
            oldCount: 0,
            newStart: 0,
            newCount: 0,
            context: '',
            header: hunkLine,
            lines: []
        };
    },

    /**
     * Parse individual diff line
     * @param {string} line - The diff line
     * @param {number} lineNumber - Line number within hunk
     * @returns {Object} Diff line object
     */
    parseDiffLine(line, lineNumber) {
        if (!line) {
            return {
                type: 'unchanged',
                content: '',
                oldLineNumber: null,
                newLineNumber: null,
                lineNumber: lineNumber
            };
        }

        const firstChar = line.charAt(0);
        const content = line.substring(1);

        switch (firstChar) {
            case '+':
                return {
                    type: 'added',
                    content: content,
                    oldLineNumber: null,
                    newLineNumber: null, // Will be calculated later
                    lineNumber: lineNumber
                };
            case '-':
                return {
                    type: 'removed',
                    content: content,
                    oldLineNumber: null, // Will be calculated later
                    newLineNumber: null,
                    lineNumber: lineNumber
                };
            case ' ':
                return {
                    type: 'unchanged',
                    content: content,
                    oldLineNumber: null, // Will be calculated later
                    newLineNumber: null, // Will be calculated later
                    lineNumber: lineNumber
                };
            default:
                return {
                    type: 'context',
                    content: line,
                    oldLineNumber: null,
                    newLineNumber: null,
                    lineNumber: lineNumber
                };
        }
    },

    /**
     * Calculate line numbers for diff lines
     * @param {Array} files - Parsed diff files
     * @returns {Array} Files with calculated line numbers
     */
    calculateLineNumbers(files) {
        files.forEach(file => {
            file.hunks.forEach(hunk => {
                let oldLineNum = hunk.oldStart;
                let newLineNum = hunk.newStart;

                hunk.lines.forEach(line => {
                    switch (line.type) {
                        case 'unchanged':
                            line.oldLineNumber = oldLineNum++;
                            line.newLineNumber = newLineNum++;
                            break;
                        case 'removed':
                            line.oldLineNumber = oldLineNum++;
                            break;
                        case 'added':
                            line.newLineNumber = newLineNum++;
                            break;
                    }
                });
            });
        });

        return files;
    },

    /**
     * Get statistics for parsed diff
     * @param {Array} files - Parsed diff files
     * @returns {Object} Statistics object
     */
    getStats(files) {
        let totalFiles = files.length;
        let totalAdditions = 0;
        let totalDeletions = 0;
        let totalChanges = 0;

        files.forEach(file => {
            file.hunks.forEach(hunk => {
                hunk.lines.forEach(line => {
                    switch (line.type) {
                        case 'added':
                            totalAdditions++;
                            break;
                        case 'removed':
                            totalDeletions++;
                            break;
                    }
                });
            });
        });

        totalChanges = totalAdditions + totalDeletions;

        return {
            files: totalFiles,
            additions: totalAdditions,
            deletions: totalDeletions,
            changes: totalChanges
        };
    },

    /**
     * Detect file type from extension
     * @param {string} filename - File name
     * @returns {string} File type
     */
    getFileType(filename) {
        if (!filename) return 'text';

        const ext = filename.split('.').pop().toLowerCase();
        const typeMap = {
            'js': 'javascript',
            'jsx': 'javascript',
            'ts': 'typescript',
            'tsx': 'typescript',
            'java': 'java',
            'py': 'python',
            'rb': 'ruby',
            'php': 'php',
            'html': 'html',
            'css': 'css',
            'scss': 'css',
            'sass': 'css',
            'json': 'json',
            'xml': 'xml',
            'yml': 'yaml',
            'yaml': 'yaml',
            'md': 'markdown',
            'cpp': 'cpp',
            'c': 'c',
            'h': 'c',
            'cs': 'csharp',
            'go': 'go',
            'rs': 'rust',
            'kt': 'kotlin',
            'swift': 'swift'
        };

        return typeMap[ext] || 'text';
    },

    /**
     * Generate sample diff for demonstration
     * @returns {string} Sample diff content
     */
    generateSampleDiff() {
        // Use the provided diff.txt content as inspiration for a simpler sample
        return `diff --git a/src/components/Button.js b/src/components/Button.js
index 1234567..abcdefg 100644
--- a/src/components/Button.js
+++ b/src/components/Button.js
@@ -1,10 +1,12 @@
 import React from 'react';
+import PropTypes from 'prop-types';
 
-const Button = ({ children, onClick }) => {
+const Button = ({ children, onClick, variant = 'primary' }) => {
   return (
     <button
-      className="bg-blue-500 text-white px-4 py-2 rounded"
+      className={\`px-4 py-2 rounded \${variant === 'primary' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}\`}
       onClick={onClick}
+      type="button"
     >
       {children}
     </button>
@@ -12,4 +14,10 @@
 };
 
+Button.propTypes = {
+  children: PropTypes.node.isRequired,
+  onClick: PropTypes.func,
+  variant: PropTypes.oneOf(['primary', 'secondary'])
+};
+
 export default Button;
diff --git a/src/utils/helpers.js b/src/utils/helpers.js
new file mode 100644
index 0000000..1234567
--- /dev/null
+++ b/src/utils/helpers.js
@@ -0,0 +1,15 @@
+/**
+ * Utility functions for the application
+ */
+
+export const formatDate = (date) => {
+  return new Intl.DateTimeFormat('en-US', {
+    year: 'numeric',
+    month: 'long',
+    day: 'numeric'
+  }).format(new Date(date));
+};
+
+export const debounce = (func, wait) => {
+  let timeout;
+  return function executedFunction(...args) {
+    const later = () => {
+      clearTimeout(timeout);
+      func(...args);
+    };
+    clearTimeout(timeout);
+    timeout = setTimeout(later, wait);
+  };
+};`;
    }
};
