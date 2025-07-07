// ==UserScript==
// @name         nhentai.net Smart Reader
// @namespace    https://github.com/galpt/adguard-userscripts
// @version      2.1.0
// @description  Enhanced manga reader with webtoon-style scrolling for nhentai.net
// @author       galpt
// @match        https://nhentai.net/g/*
// @exclude      https://nhentai.net/g/*/*/
// @grant        none
// @run-at       document-end
// @homepage     https://github.com/galpt/adguard-userscripts
// @supportURL   https://github.com/galpt/adguard-userscripts/issues
// @updateURL    https://github.com/galpt/adguard-userscripts
// ==/UserScript==

(function () {
    'use strict';

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        // Check if we're on a gallery page (not individual page)
        if (!window._gallery || window.location.pathname.includes('/g/') && window.location.pathname.split('/').length > 4) {
            return;
        }

        addSmartReaderButton();
        addReaderStyles();
    }

    function addSmartReaderButton() {
        // Find the download button
        const downloadButton = document.querySelector('#download');
        if (!downloadButton) {
            console.log('Download button not found, retrying...');
            setTimeout(addSmartReaderButton, 1000);
            return;
        }

        // Create Smart Reader button
        const smartReaderButton = document.createElement('a');
        smartReaderButton.id = 'smart-reader';
        smartReaderButton.className = 'btn btn-secondary';
        smartReaderButton.innerHTML = '<i class="fa fa-book-open"></i> Smart Reader';
        smartReaderButton.style.marginLeft = '5px';
        smartReaderButton.style.cursor = 'pointer';

        // Add click event
        smartReaderButton.addEventListener('click', function (e) {
            e.preventDefault();
            openSmartReader();
        });

        // Insert button next to download button
        downloadButton.parentNode.insertBefore(smartReaderButton, downloadButton.nextSibling);
    }

    function addReaderStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Smart Reader Modal Styles */
            .smart-reader-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .smart-reader-modal.show {
                background: rgba(0, 0, 0, 0.95);
                opacity: 1;
                visibility: visible;
            }

            .smart-reader-content {
                background: #1a1b1e;
                border-radius: 1rem;
                width: 95%;
                height: 95%;
                max-width: 1200px;
                position: relative;
                overflow: hidden;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                border: 1px solid rgba(255, 255, 255, 0.1);
                transform: scale(0.7) translateY(-50px);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .smart-reader-modal.show .smart-reader-content {
                transform: scale(1) translateY(0);
            }

            .smart-reader-header {
                background: #27282b;
                padding: 1rem 1.5rem;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                display: flex;
                justify-content: space-between;
                align-items: center;
                position: sticky;
                top: 0;
                z-index: 1001;
            }

            .smart-reader-title {
                color: #ffffff;
                font-size: 1.25rem;
                font-weight: 600;
                margin: 0;
                flex: 1;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin-right: 1rem;
            }

            .smart-reader-controls {
                display: flex;
                align-items: center;
                gap: 1rem;
            }

            .smart-reader-progress {
                color: #a0aec0;
                font-size: 0.875rem;
                white-space: nowrap;
            }

            .smart-reader-close {
                background: rgba(248, 113, 113, 0.1);
                color: #f87171;
                border: 1px solid rgba(248, 113, 113, 0.2);
                padding: 0.5rem 1rem;
                border-radius: 0.5rem;
                cursor: pointer;
                font-size: 0.875rem;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .smart-reader-close:hover {
                background: rgba(248, 113, 113, 0.2);
                border-color: #f87171;
                transform: translateY(-1px);
            }

            .smart-reader-body {
                height: calc(100% - 80px);
                overflow-y: auto;
                overflow-x: hidden;
                padding: 2rem;
                background: #1a1b1e;
                position: relative;
            }

            .smart-reader-images {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 1rem;
                max-width: 800px;
                margin: 0 auto;
            }

            .smart-reader-page {
                width: 100%;
                position: relative;
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.6s ease;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                border-radius: 0.5rem;
                overflow: hidden;
            }

            .smart-reader-page.loaded {
                opacity: 1;
                transform: translateY(0);
            }

            .smart-reader-page img {
                width: 100%;
                height: auto;
                display: block;
                border-radius: 0.5rem;
                background: #27282b;
            }

            .smart-reader-page-number {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: rgba(0, 0, 0, 0.8);
                color: #ffffff;
                padding: 0.5rem 1rem;
                border-radius: 2rem;
                font-size: 0.875rem;
                font-weight: 500;
                z-index: 10;
            }

            .smart-reader-loading {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 2rem;
                color: #a0aec0;
                font-size: 1.125rem;
                gap: 1.5rem;
            }

            .loading-text {
                font-size: 1.125rem;
                font-weight: 500;
            }

            .progress-container {
                width: 100%;
                max-width: 400px;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.75rem;
            }

            .progress-bar {
                width: 100%;
                height: 8px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 4px;
                overflow: hidden;
                position: relative;
            }

            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #60a5fa, #3b82f6);
                border-radius: 4px;
                width: 0%;
                transition: width 0.3s ease;
                position: relative;
            }



            .progress-text {
                font-size: 0.875rem;
                font-weight: 600;
                color: #60a5fa;
            }

            .smart-reader-loading-spinner {
                width: 2rem;
                height: 2rem;
                border: 2px solid rgba(160, 174, 192, 0.2);
                border-top-color: #60a5fa;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin-right: 1rem;
            }

            /* Image placeholder styles */
            .image-placeholder {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                min-height: 400px;
                background: #27282b;
                border-radius: 0.5rem;
                color: #a0aec0;
                font-size: 0.875rem;
                gap: 1rem;
                border: 2px dashed rgba(255, 255, 255, 0.1);
            }

            .loading-spinner {
                width: 1.5rem;
                height: 1.5rem;
                border: 2px solid rgba(160, 174, 192, 0.2);
                border-top-color: #60a5fa;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }

            .error-icon {
                font-size: 2rem;
                margin-bottom: 0.5rem;
            }

            .retry-btn {
                background: rgba(96, 165, 250, 0.1);
                color: #60a5fa;
                border: 1px solid rgba(96, 165, 250, 0.2);
                padding: 0.5rem 1rem;
                border-radius: 0.5rem;
                cursor: pointer;
                font-size: 0.75rem;
                margin-top: 0.5rem;
                transition: all 0.3s ease;
            }

            .retry-btn:hover {
                background: rgba(96, 165, 250, 0.2);
                border-color: #60a5fa;
                transform: translateY(-1px);
            }

            @keyframes spin {
                to { transform: rotate(360deg); }
            }

            /* Scrollbar styling */
            .smart-reader-body::-webkit-scrollbar {
                width: 8px;
            }

            .smart-reader-body::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 4px;
            }

            .smart-reader-body::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.2);
                border-radius: 4px;
            }

            .smart-reader-body::-webkit-scrollbar-thumb:hover {
                background: rgba(255, 255, 255, 0.3);
            }

            /* Mobile responsive */
            @media (max-width: 768px) {
                .smart-reader-content {
                    width: 100%;
                    height: 100%;
                    border-radius: 0;
                    max-width: none;
                }

                .smart-reader-body {
                    padding: 1rem;
                }

                .smart-reader-title {
                    font-size: 1rem;
                }

                .smart-reader-controls {
                    gap: 0.5rem;
                }
            }
        `;
        document.head.appendChild(style);
    }

    function openSmartReader() {
        if (!window._gallery) {
            console.error('Gallery data not found');
            return;
        }

        createReaderModal();
        updateProgress();
    }

    function createReaderModal() {
        // Create modal HTML
        const modal = document.createElement('div');
        modal.className = 'smart-reader-modal';
        modal.id = 'smart-reader-modal';

        const gallery = window._gallery;
        const title = gallery.title.pretty || gallery.title.english || 'Unknown Title';

        modal.innerHTML = `
            <div class="smart-reader-content">
                <div class="smart-reader-header">
                    <h2 class="smart-reader-title">${escapeHtml(title)}</h2>
                    <div class="smart-reader-controls">
                        <div class="smart-reader-progress">
                            <span id="loaded-pages">0</span> / <span id="total-pages">${gallery.num_pages}</span> loaded
                        </div>
                        <button class="smart-reader-close" onclick="closeSmartReader()">
                            <i class="fa fa-times"></i> Close
                        </button>
                    </div>
                </div>
                <div class="smart-reader-body">
                    <div class="smart-reader-loading">
                        <div class="smart-reader-loading-spinner"></div>
                        <div class="loading-text">Discovering images...</div>
                        <div class="progress-container">
                            <div class="progress-bar">
                                <div class="progress-fill" id="progress-fill"></div>
                            </div>
                            <div class="progress-text" id="progress-text">0%</div>
                        </div>
                    </div>
                    <div class="smart-reader-images" id="smart-reader-images" style="display: none;"></div>
                </div>
            </div>
        `;

        // Add to page
        document.body.appendChild(modal);

        // Show modal with animation
        setTimeout(() => modal.classList.add('show'), 10);

        // Load images
        loadAllImages();

        // Close on outside click
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                closeSmartReader();
            }
        });

        // Close on escape key
        document.addEventListener('keydown', handleKeyDown);
    }

    function loadAllImages() {
        const gallery = window._gallery;
        const mediaId = gallery.media_id;
        const pages = gallery.images.pages;
        const imagesContainer = document.getElementById('smart-reader-images');
        const loadingDiv = document.querySelector('.smart-reader-loading');
        const progressFill = document.getElementById('progress-fill');
        const progressText = document.getElementById('progress-text');
        const loadingText = document.querySelector('.loading-text');

        const loadedImages = [];
        let loadedCount = 0;

        // Start loading all images with server retry
        loadingText.textContent = 'Loading images...';

        const imagePromises = pages.map((page, index) => {
            const pageNum = index + 1;
            const extension = getImageExtension(page.t);

            return tryLoadImageFromServers(mediaId, pageNum, extension, index);
        });

        // Try loading image from all available servers (i1-i4)
        function tryLoadImageFromServers(mediaId, pageNum, extension, index) {
            const servers = [1, 2, 3, 4]; // nhentai has 4 media servers
            let serverIndex = 0;

            return new Promise((resolve) => {
                function tryNextServer() {
                    if (serverIndex >= servers.length) {
                        // All servers failed
                        console.error(`Failed to load page ${pageNum} from all servers`);
                        loadedCount++;
                        updateProgressBar(loadedCount, pages.length, `Loading images... ${loadedCount}/${pages.length}`);
                        resolve(null);
                        return;
                    }

                    const server = servers[serverIndex];
                    const imageUrl = `https://i${server}.nhentai.net/galleries/${mediaId}/${pageNum}.${extension}`;

                    const img = new Image();
                    img.onload = () => {
                        loadedImages[index] = img;
                        loadedCount++;
                        updateProgressBar(loadedCount, pages.length, `Loading images... ${loadedCount}/${pages.length}`);
                        console.log(`✓ Loaded page ${pageNum} from server i${server}`);
                        resolve(img);
                    };
                    img.onerror = () => {
                        console.log(`✗ Server i${server} failed for page ${pageNum}, trying next...`);
                        serverIndex++;
                        tryNextServer();
                    };
                    img.src = imageUrl;
                }

                tryNextServer();
            });
        }

        // Wait for all images to load
        Promise.all(imagePromises).then(() => {
            showReader();
        });

        function updateProgressBar(current, total, text) {
            const percentage = Math.round((current / total) * 100);
            progressFill.style.width = `${percentage}%`;
            progressText.textContent = `${percentage}%`;
            loadingText.textContent = text;
        }

        function showReader() {
            // Create all page containers with loaded images
            pages.forEach((page, index) => {
                const pageNum = index + 1;
                const loadedImg = loadedImages[index];

                const pageDiv = document.createElement('div');
                pageDiv.className = 'smart-reader-page loaded';
                pageDiv.innerHTML = `<div class="smart-reader-page-number">Page ${pageNum}</div>`;

                if (loadedImg) {
                    // Clone the loaded image
                    const img = loadedImg.cloneNode();
                    img.alt = `Page ${pageNum}`;
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.5s ease';
                    pageDiv.appendChild(img);

                    // Fade in with staggered delay
                    setTimeout(() => {
                        img.style.opacity = '1';
                    }, index * 50);
                } else {
                    // Show error for failed images
                    const errorDiv = document.createElement('div');
                    errorDiv.className = 'image-placeholder';
                    errorDiv.innerHTML = `
                        <div class="error-icon">⚠️</div>
                        <span>Failed to load page ${pageNum}</span>
                    `;
                    pageDiv.appendChild(errorDiv);
                }

                imagesContainer.appendChild(pageDiv);
            });

            // Hide loading screen and show reader
            setTimeout(() => {
                loadingDiv.style.opacity = '0';
                setTimeout(() => {
                    loadingDiv.style.display = 'none';
                    imagesContainer.style.display = 'flex';
                    updateProgress(); // Update the header counter
                }, 300);
            }, 500);
        }

        // Cleanup function
        window.cleanupLazyLoader = function () {
            loadedImages.length = 0;
            delete window.cleanupLazyLoader;
        };
    }

    function getImageExtension(type) {
        switch (type) {
            case 'j': return 'jpg';
            case 'p': return 'png';
            case 'g': return 'gif';
            case 'w': return 'webp';
            default: return 'jpg';
        }
    }

    function updateProgress() {
        const loadedPagesSpan = document.getElementById('loaded-pages');
        if (loadedPagesSpan) {
            const loadedImages = document.querySelectorAll('.smart-reader-page img').length;
            loadedPagesSpan.textContent = loadedImages;
        }
    }

    function handleKeyDown(e) {
        if (e.key === 'Escape') {
            closeSmartReader();
        }
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Global function for closing reader
    window.closeSmartReader = function () {
        const modal = document.getElementById('smart-reader-modal');
        if (modal) {
            modal.classList.remove('show');

            // Remove event listener
            document.removeEventListener('keydown', handleKeyDown);

            // Remove modal after animation
            setTimeout(() => {
                if (modal.parentNode) {
                    modal.parentNode.removeChild(modal);
                }
                // Cleanup global functions
                if (window.cleanupLazyLoader) {
                    window.cleanupLazyLoader();
                }
                delete window.retryImage;
                delete window.closeSmartReader;
            }, 300);
        }
    };

})(); 