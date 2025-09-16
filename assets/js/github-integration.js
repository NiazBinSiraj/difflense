/**
 * GitHub Integration Module - Handles GitHub API interactions
 */
window.GitHubIntegration = {
    repoOwner: 'NiazBinSiraj',
    repoName: 'difflense',
    
    /**
     * Initialize GitHub integration
     */
    init() {
        this.loadGitHubStars();
    },

    /**
     * Load GitHub stars count
     */
    async loadGitHubStars() {
        try {
            const response = await fetch(`https://api.github.com/repos/${this.repoOwner}/${this.repoName}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/vnd.github.v3+json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                this.updateStarsDisplay(data.stargazers_count);
            } else {
                // If API fails, show generic text
                this.updateStarsDisplay(null);
            }
        } catch (error) {
            console.warn('Failed to load GitHub stars:', error);
            this.updateStarsDisplay(null);
        }
    },

    /**
     * Update stars display in the UI
     * @param {number|null} count - Number of stars or null if failed
     */
    updateStarsDisplay(count) {
        const starsElement = document.getElementById('github-stars');
        if (starsElement) {
            if (count !== null) {
                starsElement.textContent = `★ ${this.formatStarCount(count)}`;
                starsElement.title = `${count} stars on GitHub`;
            } else {
                starsElement.textContent = '★ Stars';
                starsElement.title = 'View on GitHub';
            }
        }
    },

    /**
     * Format star count for display
     * @param {number} count - Star count
     * @returns {string} Formatted count
     */
    formatStarCount(count) {
        if (count >= 1000) {
            return (count / 1000).toFixed(1) + 'k';
        }
        return count.toString();
    },

    /**
     * Get repository information
     * @returns {Promise<Object>} Repository data
     */
    async getRepoInfo() {
        try {
            const response = await fetch(`https://api.github.com/repos/${this.repoOwner}/${this.repoName}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/vnd.github.v3+json'
                }
            });

            if (response.ok) {
                return await response.json();
            } else {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Failed to fetch repository info:', error);
            throw error;
        }
    },

    /**
     * Get latest releases
     * @returns {Promise<Array>} Array of releases
     */
    async getLatestReleases() {
        try {
            const response = await fetch(`https://api.github.com/repos/${this.repoOwner}/${this.repoName}/releases`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/vnd.github.v3+json'
                }
            });

            if (response.ok) {
                const releases = await response.json();
                return releases.slice(0, 5); // Return latest 5 releases
            } else {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Failed to fetch releases:', error);
            throw error;
        }
    },

    /**
     * Get repository statistics
     * @returns {Promise<Object>} Repository statistics
     */
    async getRepoStats() {
        try {
            const repoInfo = await this.getRepoInfo();
            return {
                stars: repoInfo.stargazers_count,
                forks: repoInfo.forks_count,
                watchers: repoInfo.watchers_count,
                openIssues: repoInfo.open_issues_count,
                language: repoInfo.language,
                size: repoInfo.size,
                lastUpdated: repoInfo.updated_at,
                createdAt: repoInfo.created_at
            };
        } catch (error) {
            console.error('Failed to fetch repository statistics:', error);
            throw error;
        }
    },

    /**
     * Check if there are any open issues labeled as 'good first issue'
     * @returns {Promise<Array>} Array of good first issues
     */
    async getGoodFirstIssues() {
        try {
            const response = await fetch(
                `https://api.github.com/repos/${this.repoOwner}/${this.repoName}/issues?labels=good%20first%20issue&state=open`,
                {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/vnd.github.v3+json'
                    }
                }
            );

            if (response.ok) {
                return await response.json();
            } else {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Failed to fetch good first issues:', error);
            throw error;
        }
    },

    /**
     * Get repository contributors
     * @returns {Promise<Array>} Array of contributors
     */
    async getContributors() {
        try {
            const response = await fetch(`https://api.github.com/repos/${this.repoOwner}/${this.repoName}/contributors`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/vnd.github.v3+json'
                }
            });

            if (response.ok) {
                return await response.json();
            } else {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Failed to fetch contributors:', error);
            throw error;
        }
    },

    /**
     * Create a GitHub issue URL with pre-filled template
     * @param {string} title - Issue title
     * @param {string} body - Issue body
     * @param {Array} labels - Array of label names
     * @returns {string} GitHub issue creation URL
     */
    createIssueUrl(title = '', body = '', labels = []) {
        const baseUrl = `https://github.com/${this.repoOwner}/${this.repoName}/issues/new`;
        const params = new URLSearchParams();
        
        if (title) params.append('title', title);
        if (body) params.append('body', body);
        if (labels.length > 0) params.append('labels', labels.join(','));
        
        return `${baseUrl}?${params.toString()}`;
    },

    /**
     * Create a bug report URL
     * @param {string} description - Bug description
     * @returns {string} GitHub issue URL for bug report
     */
    createBugReportUrl(description = '') {
        const title = 'Bug Report: ';
        const body = `
## Bug Description
${description}

## Steps to Reproduce
1. 
2. 
3. 

## Expected Behavior


## Actual Behavior


## Environment
- Browser: 
- OS: 
- Version: 

## Additional Context

        `.trim();
        
        return this.createIssueUrl(title, body, ['bug']);
    },

    /**
     * Create a feature request URL
     * @param {string} description - Feature description
     * @returns {string} GitHub issue URL for feature request
     */
    createFeatureRequestUrl(description = '') {
        const title = 'Feature Request: ';
        const body = `
## Feature Description
${description}

## Use Case
Describe the use case or problem this feature would solve.

## Proposed Solution
Describe your proposed solution or implementation ideas.

## Alternatives Considered
Describe any alternative solutions you've considered.

## Additional Context

        `.trim();
        
        return this.createIssueUrl(title, body, ['enhancement']);
    },

    /**
     * Get repository URL
     * @returns {string} Repository URL
     */
    getRepoUrl() {
        return `https://github.com/${this.repoOwner}/${this.repoName}`;
    },

    /**
     * Get repository clone URLs
     * @returns {Object} Clone URLs
     */
    getCloneUrls() {
        return {
            https: `https://github.com/${this.repoOwner}/${this.repoName}.git`,
            ssh: `git@github.com:${this.repoOwner}/${this.repoName}.git`,
            gh: `gh repo clone ${this.repoOwner}/${this.repoName}`
        };
    },

    /**
     * Format GitHub API date
     * @param {string} dateString - ISO date string from GitHub API
     * @returns {string} Formatted date
     */
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    /**
     * Check rate limit status
     * @returns {Promise<Object>} Rate limit information
     */
    async getRateLimit() {
        try {
            const response = await fetch('https://api.github.com/rate_limit', {
                method: 'GET',
                headers: {
                    'Accept': 'application/vnd.github.v3+json'
                }
            });

            if (response.ok) {
                return await response.json();
            } else {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Failed to check rate limit:', error);
            throw error;
        }
    }
};
