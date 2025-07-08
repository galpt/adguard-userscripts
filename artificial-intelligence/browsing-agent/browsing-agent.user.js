// ==UserScript==
// @name         AI Browsing Agent (Gemini-Powered)
// @namespace    https://github.com/galpt/adguard-userscripts
// @version      3.2.3
// @description  Intelligent browsing assistant powered by Google Gemini API with real-time content analysis and DOM manipulation
// @author       galpt
// @match        *://*/*
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_notification
// @grant        unsafeWindow
// @run-at       document-end
// @updateURL    https://raw.githubusercontent.com/galpt/adguard-userscripts/main/artificial-intelligence/browsing-agent/browsing-agent.user.js
// @downloadURL  https://raw.githubusercontent.com/galpt/adguard-userscripts/main/artificial-intelligence/browsing-agent/browsing-agent.user.js
// ==/UserScript==

(function () {
    'use strict';

    // Configuration
    const CONFIG = {
        version: '3.1.0',
        apiEndpoint: 'https://generativelanguage.googleapis.com/v1beta/models',
        defaultModel: 'gemini-2.5-flash',
        models: {
            // Gemini 2.5 Models
            'gemini-2.5-pro': { name: 'Gemini 2.5 Pro', description: 'Most powerful thinking model with maximum accuracy', category: 'Primary', type: 'text', endpoint: 'generateContent' },
            'gemini-2.5-flash': { name: 'Gemini 2.5 Flash', description: 'Best price-performance with adaptive thinking', category: 'Primary', type: 'text', endpoint: 'generateContent' },
            'gemini-2.5-flash-lite-preview-06-17': { name: 'Gemini 2.5 Flash Lite', description: 'Cost-efficient with high throughput', category: 'Primary', type: 'text', endpoint: 'generateContent' },

            // Gemini 2.5 Audio & TTS Models
            'gemini-2.5-flash-preview-native-audio-dialog': { name: 'Gemini 2.5 Flash Native Audio', description: 'Interactive conversational audio', category: 'Audio', type: 'audio', endpoint: 'generateContent' },
            'gemini-2.5-flash-exp-native-audio-thinking-dialog': { name: 'Gemini 2.5 Flash Audio + Thinking', description: 'Audio with thinking capabilities', category: 'Audio', type: 'audio', endpoint: 'generateContent' },
            'gemini-2.5-flash-preview-tts': { name: 'Gemini 2.5 Flash TTS', description: 'High-quality text-to-speech', category: 'Audio', type: 'tts', endpoint: 'generateContent' },
            'gemini-2.5-pro-preview-tts': { name: 'Gemini 2.5 Pro TTS', description: 'Premium text-to-speech', category: 'Audio', type: 'tts', endpoint: 'generateContent' },

            // Gemini 2.0 Models
            'gemini-2.0-flash': { name: 'Gemini 2.0 Flash', description: 'Next-gen features with superior speed', category: 'Primary', type: 'text', endpoint: 'generateContent' },
            'gemini-2.0-flash-preview-image-generation': { name: 'Gemini 2.0 Flash + Images', description: 'Conversational image generation', category: 'Multimodal', type: 'text-image', endpoint: 'generateContent' },
            'gemini-2.0-flash-lite': { name: 'Gemini 2.0 Flash Lite', description: 'Optimized for speed and efficiency', category: 'Primary', type: 'text', endpoint: 'generateContent' },

            // Gemini 1.5 Models
            'gemini-1.5-flash': { name: 'Gemini 1.5 Flash', description: 'Fast and versatile multimodal', category: 'Primary', type: 'text', endpoint: 'generateContent' },
            'gemini-1.5-flash-8b': { name: 'Gemini 1.5 Flash 8B', description: 'Lightweight for high-volume tasks', category: 'Primary', type: 'text', endpoint: 'generateContent' },
            'gemini-1.5-pro': { name: 'Gemini 1.5 Pro', description: 'Complex reasoning with long context', category: 'Primary', type: 'text', endpoint: 'generateContent' },

            // Live API Models
            'gemini-live-2.5-flash-preview': { name: 'Gemini 2.5 Flash Live', description: 'Real-time voice and video interactions', category: 'Live', type: 'live', endpoint: 'streamGenerateContent' },
            'gemini-2.0-flash-live-001': { name: 'Gemini 2.0 Flash Live', description: 'Bidirectional audio/video streaming', category: 'Live', type: 'live', endpoint: 'streamGenerateContent' },

            // Imagen Models (Image Generation)
            'imagen-4.0-generate-preview-06-06': { name: 'Imagen 4.0 Standard', description: 'Latest high-quality image generation', category: 'Image Generation', type: 'image', endpoint: 'generateImage' },
            'imagen-4.0-ultra-generate-preview-06-06': { name: 'Imagen 4.0 Ultra', description: 'Premium image generation with highest quality', category: 'Image Generation', type: 'image', endpoint: 'generateImage' },
            'imagen-3.0-generate-002': { name: 'Imagen 3.0', description: 'High-quality text-to-image generation', category: 'Image Generation', type: 'image', endpoint: 'generateImage' },

            // Veo Models (Video Generation)
            'veo-2.0-generate-001': { name: 'Veo 2.0', description: 'High-quality text and image-to-video generation', category: 'Video Generation', type: 'video', endpoint: 'generateVideo' },

            // Gemma Models (Open Source)
            'gemma-3n-e2b-it': { name: 'Gemma 3n E2B', description: 'Ultra-lightweight efficient model', category: 'Gemma', type: 'text', endpoint: 'generateContent' },
            'gemma-3n-e4b-it': { name: 'Gemma 3n E4B', description: 'Compact efficient model', category: 'Gemma', type: 'text', endpoint: 'generateContent' },
            'gemma-3-1b-it': { name: 'Gemma 3 1B', description: 'Lightweight open-source model', category: 'Gemma', type: 'text', endpoint: 'generateContent' },
            'gemma-3-4b-it': { name: 'Gemma 3 4B', description: 'Balanced performance model', category: 'Gemma', type: 'text', endpoint: 'generateContent' },
            'gemma-3-12b-it': { name: 'Gemma 3 12B', description: 'High-capability model', category: 'Gemma', type: 'text', endpoint: 'generateContent' },
            'gemma-3-27b-it': { name: 'Gemma 3 27B', description: 'Most powerful open-source model', category: 'Gemma', type: 'text', endpoint: 'generateContent' },

            // Embedding Models
            'text-embedding-004': { name: 'Text Embedding 004', description: 'Latest text embedding model', category: 'Embedding', type: 'embedding', endpoint: 'embedContent' },
            'embedding-001': { name: 'Embedding 001', description: 'Classic embedding model', category: 'Embedding', type: 'embedding', endpoint: 'embedContent' },

            // Specialized Models
            'aqa': { name: 'AQA Model', description: 'Attributed Question-Answering', category: 'Specialized', type: 'text', endpoint: 'generateAnswer' }
        },
        storage: {
            apiKey: 'ai-browsing-agent-api-key',
            selectedModel: 'ai-browsing-agent-selected-model',
            conversationHistory: 'ai-browsing-agent-history'
        },
        debug: false
    };

    // Global state
    const STATE = {
        isInitialized: false,
        geminiClient: null,
        uiManager: null
    };

    // Utilities
    const utils = {
        log: (...args) => {
            if (CONFIG.debug) console.log('[AI Browsing Agent]', ...args);
        },

        extractPageContent() {
            const title = document.title || 'Untitled Page';
            const url = window.location.href;
            const description = document.querySelector('meta[name="description"]')?.content || '';

            // Extract main text content
            const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, td, span');
            let text = '';
            textElements.forEach(el => {
                if (!el.closest('.ai-browsing-agent-modal, #ai-browsing-agent-btn') &&
                    el.offsetParent !== null) {
                    text += el.textContent + ' ';
                }
            });

            // Extract links and images
            const links = Array.from(document.links).map(a => ({ text: a.textContent.trim(), href: a.href }));
            const images = Array.from(document.images).map(img => ({ src: img.src, alt: img.alt }));

            return { title, url, description, text: text.slice(0, 5000), links, images };
        },

        generateId() {
            return Math.random().toString(36).substring(2) + Date.now().toString(36);
        }
    };

    // Gemini API Client
    class GeminiClient {
        constructor() {
            this.apiKey = GM_getValue(CONFIG.storage.apiKey, '');
            this.selectedModel = GM_getValue(CONFIG.storage.selectedModel, CONFIG.defaultModel);
            this.isInitialized = false;
        }

        setApiKey(apiKey) {
            this.apiKey = apiKey;
            GM_setValue(CONFIG.storage.apiKey, apiKey);
            this.isInitialized = !!apiKey;
        }

        setModel(model) {
            this.selectedModel = model;
            GM_setValue(CONFIG.storage.selectedModel, model);
        }

        async sendMessage(prompt, context = '') {
            if (!this.apiKey) {
                throw new Error('API key not configured. Please add your Gemini API key in settings.');
            }

            const modelInfo = CONFIG.models[this.selectedModel];
            if (!modelInfo) {
                throw new Error(`Unknown model: ${this.selectedModel}`);
            }

            const fullPrompt = context ? `${context}\n\nUser query: ${prompt}` : prompt;

            return new Promise((resolve, reject) => {
                const requestData = this.buildRequestData(modelInfo, fullPrompt);
                const endpoint = this.buildEndpoint(modelInfo);

                GM_xmlhttpRequest({
                    method: 'POST',
                    url: endpoint,
                    headers: {
                        'Content-Type': 'application/json',
                        'x-goog-api-key': this.apiKey
                    },
                    data: JSON.stringify(requestData),
                    onload: (response) => {
                        try {
                            if (response.status === 200) {
                                const result = this.parseResponse(response.responseText, modelInfo);
                                resolve(result);
                            } else {
                                const errorData = JSON.parse(response.responseText);
                                reject(new Error(errorData.error?.message || `API Error: ${response.status}`));
                            }
                        } catch (error) {
                            reject(new Error('Failed to parse API response: ' + error.message));
                        }
                    },
                    onerror: () => {
                        reject(new Error('Network error occurred'));
                    },
                    ontimeout: () => {
                        reject(new Error('Request timed out'));
                    },
                    timeout: 60000 // Longer timeout for image/video generation
                });
            });
        }

        buildEndpoint(modelInfo) {
            const baseUrl = CONFIG.apiEndpoint;
            const model = this.selectedModel;

            switch (modelInfo.type) {
                case 'image':
                    // Imagen models use different endpoint structure
                    if (model.startsWith('imagen-')) {
                        return `${baseUrl}/${model}:generateImage`;
                    }
                    return `${baseUrl}/${model}:${modelInfo.endpoint}`;

                case 'video':
                    // Veo models use different endpoint structure
                    return `${baseUrl}/${model}:generateVideo`;

                case 'embedding':
                    return `${baseUrl}/${model}:${modelInfo.endpoint}`;

                case 'live':
                    return `${baseUrl}/${model}:${modelInfo.endpoint}`;

                default:
                    // Standard text generation models
                    return `${baseUrl}/${model}:${modelInfo.endpoint}`;
            }
        }

        buildRequestData(modelInfo, prompt) {
            switch (modelInfo.type) {
                case 'text':
                case 'text-image':
                case 'audio':
                case 'tts':
                    return {
                        contents: [{
                            parts: [{
                                text: prompt
                            }]
                        }],
                        generationConfig: {
                            temperature: 0.7,
                            topK: 40,
                            topP: 0.8,
                            maxOutputTokens: 2048
                        }
                    };

                case 'image':
                    return {
                        prompt: prompt,
                        generationConfig: {
                            temperature: 0.7,
                            seed: Math.floor(Math.random() * 1000000)
                        }
                    };

                case 'video':
                    return {
                        prompt: prompt,
                        generationConfig: {
                            temperature: 0.7
                        }
                    };

                case 'embedding':
                    return {
                        content: {
                            parts: [{
                                text: prompt
                            }]
                        }
                    };

                case 'live':
                    throw new Error('Live API models require streaming connection, not supported in this interface');

                default:
                    throw new Error(`Unsupported model type: ${modelInfo.type}`);
            }
        }

        parseResponse(responseText, modelInfo) {
            const data = JSON.parse(responseText);

            switch (modelInfo.type) {
                case 'text':
                case 'text-image':
                case 'audio':
                case 'tts':
                    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                        const parts = data.candidates[0].content.parts;
                        let result = '';

                        for (const part of parts) {
                            if (part.text) {
                                result += part.text;
                            } else if (part.inlineData) {
                                // Handle inline data (images, audio)
                                const mimeType = part.inlineData.mimeType;
                                const data = part.inlineData.data;

                                if (mimeType.startsWith('image/')) {
                                    result += `\n\n🖼️ **Generated Image:**\n![Generated Image](data:${mimeType};base64,${data})\n\n`;
                                } else if (mimeType.startsWith('audio/')) {
                                    result += `\n\n🎵 **Generated Audio:**\n<audio controls><source src="data:${mimeType};base64,${data}" type="${mimeType}"></audio>\n\n`;
                                }
                            }
                        }

                        return result || 'Response generated successfully but no text content received.';
                    } else {
                        throw new Error('No response content received');
                    }

                case 'image':
                    if (data.generatedImages && data.generatedImages.length > 0) {
                        let result = '🖼️ **Generated Images:**\n\n';
                        data.generatedImages.forEach((image, index) => {
                            if (image.bytesBase64Encoded) {
                                result += `![Generated Image ${index + 1}](data:image/png;base64,${image.bytesBase64Encoded})\n\n`;
                            } else if (image.gcsUri) {
                                result += `![Generated Image ${index + 1}](${image.gcsUri})\n\n`;
                            }
                        });
                        return result;
                    } else {
                        throw new Error('No images generated');
                    }

                case 'video':
                    if (data.generatedVideo) {
                        const video = data.generatedVideo;
                        if (video.bytesBase64Encoded) {
                            return `🎥 **Generated Video:**\n\n<video controls width="100%"><source src="data:video/mp4;base64,${video.bytesBase64Encoded}" type="video/mp4"></video>\n\n`;
                        } else if (video.gcsUri) {
                            return `🎥 **Generated Video:**\n\nVideo available at: ${video.gcsUri}\n\n`;
                        }
                    } else {
                        throw new Error('No video generated');
                    }

                case 'embedding':
                    if (data.embedding && data.embedding.values) {
                        const embedding = data.embedding.values;
                        return `📊 **Text Embedding Generated**\n\nDimensions: ${embedding.length}\nFirst 10 values: [${embedding.slice(0, 10).map(v => v.toFixed(4)).join(', ')}...]\n\nThis embedding can be used for semantic search, similarity comparisons, and other ML applications.`;
                    } else {
                        throw new Error('No embedding generated');
                    }

                default:
                    throw new Error(`Unsupported response type for model: ${modelInfo.type}`);
            }
        }
    }

    // UI Manager
    class UIManager {
        constructor() {
            this.modal = null;
            this.floatingBtn = null;
            this.isModalOpen = false;
        }

        init() {
            this.createFloatingButton();
            this.createModal();
            utils.log('UI Manager initialized');
        }

        createFloatingButton() {
            this.floatingBtn = document.createElement('button');
            this.floatingBtn.id = 'ai-browsing-agent-btn';
            this.floatingBtn.innerHTML = '✨';
            this.floatingBtn.title = 'AI Browsing Agent';

            this.floatingBtn.style.cssText = `
                position: fixed;
                bottom: 24px;
                right: 24px;
                width: 46px;
                height: 46px;
                background: linear-gradient(135deg, #3f83f8 0%, #1a56db 100%);
                color: white;
                border: none;
                border-radius: 50%;
                cursor: pointer;
                box-shadow: 0 4px 16px rgba(63, 131, 248, 0.3);
                z-index: 999999;
                font-size: 18px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                backdrop-filter: blur(10px);
                font-family: 'Segoe UI Variable', 'Segoe UI', system-ui, -apple-system, sans-serif;
            `;

            this.floatingBtn.addEventListener('mouseenter', () => {
                this.floatingBtn.style.transform = 'translateY(-2px) scale(1.05)';
                this.floatingBtn.style.boxShadow = '0 8px 24px rgba(63, 131, 248, 0.4)';
            });

            this.floatingBtn.addEventListener('mouseleave', () => {
                this.floatingBtn.style.transform = 'translateY(0) scale(1)';
                this.floatingBtn.style.boxShadow = '0 4px 16px rgba(63, 131, 248, 0.3)';
            });

            this.floatingBtn.addEventListener('click', () => {
                this.toggleModal();
            });

            document.body.appendChild(this.floatingBtn);
        }

        createModal() {
            // Create modal backdrop
            this.modal = document.createElement('div');
            this.modal.className = 'ai-browsing-agent-modal';
            this.modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000000;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                backdrop-filter: blur(0px);
            `;

            // Create modal content
            const modalContent = document.createElement('div');
            modalContent.className = 'ai-agent-content';
            modalContent.style.cssText = `
                background: linear-gradient(145deg, #1a1b1e 0%, #27282b 100%);
                border-radius: 20px;
                width: 92%;
                max-width: 640px;
                max-height: 88vh;
                overflow: hidden;
                box-shadow: 0 24px 80px rgba(0, 0, 0, 0.6), 0 8px 32px rgba(0, 0, 0, 0.4);
                border: 1px solid rgba(255, 255, 255, 0.12);
                transform: scale(0.8) translateY(20px);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                font-family: 'Segoe UI Variable', 'Segoe UI', system-ui, -apple-system, sans-serif;
                display: flex;
                flex-direction: column;
            `;

            modalContent.innerHTML = `
                <style>
                    /* Custom scrollbar like v.recipes DNS page */
                    .ai-agent-scrollable::-webkit-scrollbar {
                        width: 8px;
                    }
                    .ai-agent-scrollable::-webkit-scrollbar-track {
                        background: rgba(255, 255, 255, 0.05);
                        border-radius: 4px;
                    }
                    .ai-agent-scrollable::-webkit-scrollbar-thumb {
                        background: linear-gradient(180deg, #3f83f8 0%, #1a56db 100%);
                        border-radius: 4px;
                        border: 1px solid rgba(255, 255, 255, 0.1);
                    }
                    .ai-agent-scrollable::-webkit-scrollbar-thumb:hover {
                        background: linear-gradient(180deg, #2563eb 0%, #1d4ed8 100%);
                    }
                    .ai-agent-scrollable {
                        scrollbar-width: thin;
                        scrollbar-color: #3f83f8 rgba(255, 255, 255, 0.05);
                    }
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(-10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                </style>
                
                <!-- Header -->
                <div style="padding: 28px 32px 24px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); flex-shrink: 0;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <h2 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 600; letter-spacing: -0.5px;">AI Browsing Agent</h2>
                            <p style="margin: 6px 0 0; color: #a0aec0; font-size: 14px; opacity: 0.8;">Powered by Gemini API</p>
                        </div>
                        <button id="ai-agent-close" style="
                            background: rgba(255, 255, 255, 0.05);
                            border: 1px solid rgba(255, 255, 255, 0.1);
                            color: #a0aec0;
                            font-size: 20px;
                            cursor: pointer;
                            padding: 8px;
                            border-radius: 8px;
                            transition: all 0.2s ease;
                            width: 36px;
                            height: 36px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        ">×</button>
                    </div>
                </div>
                
                <!-- Chat Area -->
                <div style="
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    padding: 24px 32px;
                    gap: 20px;
                ">
                    <div id="ai-agent-chat" style="
                        flex: 1;
                        min-height: 240px;
                        overflow-y: auto;
                        padding-right: 8px;
                        margin-right: -8px;
                    " class="ai-agent-scrollable"></div>
                    
                    <!-- Input Section -->
                    <div style="
                        flex-shrink: 0;
                        border-top: 1px solid rgba(255, 255, 255, 0.08);
                        padding-top: 20px;
                        margin-top: 8px;
                    ">
                        <div style="display: flex; gap: 12px; margin-bottom: 16px;">
                            <input type="text" id="ai-agent-input" placeholder="Ask me anything about this page..." style="
                                flex: 1;
                                padding: 14px 16px;
                                background: rgba(255, 255, 255, 0.04);
                                border: 1px solid rgba(255, 255, 255, 0.12);
                                border-radius: 12px;
                                color: #ffffff;
                                font-size: 14px;
                                outline: none;
                                transition: all 0.2s ease;
                                font-family: inherit;
                            ">
                            <button id="ai-agent-send" style="
                                padding: 14px 24px;
                                background: linear-gradient(135deg, #3f83f8 0%, #2563eb 50%, #1d4ed8 100%);
                                border: none;
                                border-radius: 12px;
                                color: white;
                                cursor: pointer;
                                font-size: 14px;
                                font-weight: 600;
                                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                                box-shadow: 0 4px 16px rgba(63, 131, 248, 0.3), 0 2px 8px rgba(63, 131, 248, 0.1);
                                border: 1px solid rgba(255, 255, 255, 0.1);
                                text-transform: uppercase;
                                letter-spacing: 0.5px;
                                min-width: 80px;
                            ">Send</button>
                        </div>
                        
                        <div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;">
                            <button class="quick-action" data-action="summarize" style="
                                padding: 8px 16px;
                                background: rgba(63, 131, 248, 0.08);
                                border: 1px solid rgba(63, 131, 248, 0.2);
                                border-radius: 8px;
                                color: #3f83f8;
                                cursor: pointer;
                                font-size: 13px;
                                font-weight: 500;
                                transition: all 0.2s ease;
                                display: flex;
                                align-items: center;
                                gap: 6px;
                            ">📋 Summarize</button>
                            <button class="quick-action" data-action="clean" style="
                                padding: 8px 16px;
                                background: rgba(49, 196, 141, 0.08);
                                border: 1px solid rgba(49, 196, 141, 0.2);
                                border-radius: 8px;
                                color: #31c48d;
                                cursor: pointer;
                                font-size: 13px;
                                font-weight: 500;
                                transition: all 0.2s ease;
                                display: flex;
                                align-items: center;
                                gap: 6px;
                            ">🧹 Clean Page</button>
                            <button class="quick-action" data-action="settings" style="
                                padding: 8px 16px;
                                background: rgba(246, 173, 85, 0.08);
                                border: 1px solid rgba(246, 173, 85, 0.2);
                                border-radius: 8px;
                                color: #f6ad55;
                                cursor: pointer;
                                font-size: 13px;
                                font-weight: 500;
                                transition: all 0.2s ease;
                                display: flex;
                                align-items: center;
                                gap: 6px;
                            ">⚙️ Settings</button>
                        </div>
                    </div>
                </div>
            `;

            this.modal.appendChild(modalContent);
            document.body.appendChild(this.modal);

            // Add event listeners
            this.setupModalEvents();
            this.showWelcomeMessage();
        }

        setupModalEvents() {
            // Close button
            const closeBtn = this.modal.querySelector('#ai-agent-close');
            closeBtn.addEventListener('click', () => this.closeModal());
            closeBtn.addEventListener('mouseenter', () => {
                closeBtn.style.background = 'rgba(248, 113, 113, 0.1)';
                closeBtn.style.borderColor = 'rgba(248, 113, 113, 0.3)';
                closeBtn.style.color = '#f87171';
            });
            closeBtn.addEventListener('mouseleave', () => {
                closeBtn.style.background = 'rgba(255, 255, 255, 0.05)';
                closeBtn.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                closeBtn.style.color = '#a0aec0';
            });

            // Click outside to close
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) this.closeModal();
            });

            // Send button and input
            const sendBtn = this.modal.querySelector('#ai-agent-send');
            const input = this.modal.querySelector('#ai-agent-input');

            sendBtn.addEventListener('click', () => this.sendMessage());
            sendBtn.addEventListener('mouseenter', () => {
                sendBtn.style.transform = 'translateY(-2px) scale(1.02)';
                sendBtn.style.boxShadow = '0 8px 25px rgba(63, 131, 248, 0.4), 0 4px 12px rgba(63, 131, 248, 0.2)';
                sendBtn.style.background = 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #1e40af 100%)';
            });
            sendBtn.addEventListener('mouseleave', () => {
                sendBtn.style.transform = 'translateY(0) scale(1)';
                sendBtn.style.boxShadow = '0 4px 16px rgba(63, 131, 248, 0.3), 0 2px 8px rgba(63, 131, 248, 0.1)';
                sendBtn.style.background = 'linear-gradient(135deg, #3f83f8 0%, #2563eb 50%, #1d4ed8 100%)';
            });

            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.sendMessage();
            });

            // Quick actions
            this.modal.querySelectorAll('.quick-action').forEach(btn => {
                btn.addEventListener('click', () => {
                    this.handleQuickAction(btn.dataset.action);
                });
                btn.addEventListener('mouseenter', () => {
                    btn.style.transform = 'translateY(-1px)';
                });
                btn.addEventListener('mouseleave', () => {
                    btn.style.transform = 'translateY(0)';
                });
            });

            // Focus input when modal opens
            input.addEventListener('focus', () => {
                input.style.borderColor = '#3f83f8';
                input.style.background = 'rgba(63, 131, 248, 0.05)';
                input.style.boxShadow = '0 0 0 3px rgba(63, 131, 248, 0.1)';
            });
            input.addEventListener('blur', () => {
                input.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                input.style.background = 'rgba(255, 255, 255, 0.04)';
                input.style.boxShadow = 'none';
            });
        }

        toggleModal() {
            if (this.isModalOpen) {
                this.closeModal();
            } else {
                this.openModal();
            }
        }

        openModal() {
            this.isModalOpen = true;
            this.modal.style.visibility = 'visible';

            // Trigger animation
            requestAnimationFrame(() => {
                this.modal.style.opacity = '1';
                this.modal.style.background = 'rgba(0, 0, 0, 0.8)';
                this.modal.style.backdropFilter = 'blur(8px)';

                const content = this.modal.querySelector('.ai-agent-content');
                content.style.transform = 'scale(1) translateY(0)';
            });

            // Focus input
            setTimeout(() => {
                const input = this.modal.querySelector('#ai-agent-input');
                if (input) input.focus();
            }, 300);
        }

        closeModal() {
            this.isModalOpen = false;

            const content = this.modal.querySelector('.ai-agent-content');
            content.style.transform = 'scale(0.8) translateY(20px)';
            this.modal.style.opacity = '0';
            this.modal.style.background = 'rgba(0, 0, 0, 0)';
            this.modal.style.backdropFilter = 'blur(0px)';

            setTimeout(() => {
                this.modal.style.visibility = 'hidden';
            }, 300);
        }

        showWelcomeMessage() {
            const chat = this.modal.querySelector('#ai-agent-chat');
            const geminiClient = STATE.geminiClient;

            let statusText = '';
            let modelBadge = '';
            if (!geminiClient.apiKey) {
                statusText = '🔑 Please configure your API key in settings to get started.';
            } else {
                const modelInfo = CONFIG.models[geminiClient.selectedModel];
                statusText = `✅ Ready and connected`;
                modelBadge = `
                    <div style="
                        display: inline-flex;
                        align-items: center;
                        gap: 6px;
                        background: rgba(63, 131, 248, 0.1);
                        border: 1px solid rgba(63, 131, 248, 0.2);
                        border-radius: 8px;
                        padding: 6px 12px;
                        margin-top: 8px;
                        font-size: 12px;
                        color: #3f83f8;
                        font-weight: 500;
                    ">
                        🤖 ${modelInfo.name}
                        <span style="
                            background: rgba(63, 131, 248, 0.2);
                            border-radius: 4px;
                            padding: 2px 6px;
                            font-size: 10px;
                            text-transform: uppercase;
                            letter-spacing: 0.5px;
                        ">${modelInfo.category}</span>
                    </div>
                `;
            }

            chat.innerHTML = `
                <div style="color: #a0aec0; font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
                    <div style="margin-bottom: 16px;">
                        <h3 style="margin: 0; color: #ffffff; font-size: 18px; font-weight: 600;">Welcome to AI Browsing Agent!</h3>
                    </div>
                    <div style="margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                        <span>${statusText}</span>
                    </div>
                    ${modelBadge}
                    <div style="font-size: 13px; color: #64748b; margin-top: 16px; line-height: 1.5;">
                        I can help you analyze, summarize, and interact with web content. Try asking me about this page or use the quick actions below.
                    </div>
                </div>
            `;
        }

        async handleQuickAction(action) {
            switch (action) {
                case 'summarize':
                    await this.processMessage('Please provide a comprehensive summary of this page, including key points and main topics.');
                    break;
                case 'clean':
                    this.performCleanup();
                    break;
                case 'settings':
                    this.showSettings();
                    break;
            }
        }

        async sendMessage() {
            const input = this.modal.querySelector('#ai-agent-input');
            const message = input.value.trim();
            if (!message) return;

            input.value = '';
            await this.processMessage(message);
        }

        async processMessage(message) {
            const chat = this.modal.querySelector('#ai-agent-chat');

            // Add user message
            this.addChatMessage('user', message);

            // Add loading message
            const loadingId = this.addChatMessage('assistant', '🤔 Thinking...', true);

            try {
                const content = utils.extractPageContent();
                const context = `Page Context:
Title: ${content.title}
URL: ${content.url}
Content preview: ${content.text.slice(0, 2000)}...`;

                const response = await STATE.geminiClient.sendMessage(message, context);

                // Remove loading message and add response
                this.removeChatMessage(loadingId);
                this.addChatMessage('assistant', response);

            } catch (error) {
                this.removeChatMessage(loadingId);
                this.addChatMessage('assistant', `❌ Error: ${error.message}`, false, 'error');
            }
        }

        addChatMessage(sender, content, isTemporary = false, type = 'normal') {
            const chat = this.modal.querySelector('#ai-agent-chat');
            const messageId = utils.generateId();

            const messageDiv = document.createElement('div');
            messageDiv.id = messageId;
            messageDiv.style.cssText = `
                margin-bottom: 20px;
                padding: 16px 20px;
                border-radius: 12px;
                font-size: 14px;
                line-height: 1.6;
                ${sender === 'user'
                    ? 'background: rgba(63, 131, 248, 0.08); border: 1px solid rgba(63, 131, 248, 0.2); color: #ffffff; border-left: 4px solid #3f83f8;'
                    : type === 'error'
                        ? 'background: rgba(248, 113, 113, 0.08); border: 1px solid rgba(248, 113, 113, 0.2); color: #fca5a5; border-left: 4px solid #f87171;'
                        : 'background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); color: #ffffff; border-left: 4px solid #31c48d;'
                }
                opacity: 0;
                transform: translateY(12px);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                word-wrap: break-word;
                overflow-wrap: break-word;
            `;

            messageDiv.innerHTML = this.formatMessage(content);
            chat.appendChild(messageDiv);

            // Trigger animation
            requestAnimationFrame(() => {
                messageDiv.style.opacity = '1';
                messageDiv.style.transform = 'translateY(0)';
            });

            // Scroll to bottom
            chat.scrollTop = chat.scrollHeight;

            return messageId;
        }

        removeChatMessage(messageId) {
            const message = document.getElementById(messageId);
            if (message) {
                message.style.opacity = '0';
                message.style.transform = 'translateY(-10px)';
                setTimeout(() => message.remove(), 300);
            }
        }

        formatMessage(content) {
            // First escape HTML to prevent XSS, but preserve our multimedia elements
            let formatted = content
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');

            // Apply markdown formatting
            formatted = formatted
                // Bold text
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                // Italic text
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                // Code blocks
                .replace(/```(.*?)```/gs, '<pre style="background: #1e1e1e; padding: 12px; border-radius: 6px; overflow-x: auto; border-left: 3px solid #0078d4; margin: 8px 0;"><code style="font-family: \'Cascadia Code\', \'Fira Code\', monospace; color: #d4d4d4;">$1</code></pre>')
                // Inline code
                .replace(/`([^`]+)`/g, '<code style="background: rgba(255,255,255,0.1); padding: 2px 4px; border-radius: 3px; font-family: \'Cascadia Code\', \'Fira Code\', monospace;">$1</code>')
                // Line breaks
                .replace(/\n/g, '<br>');

            // Handle multimedia content (restore HTML tags for media)
            formatted = formatted
                // Images (both markdown and HTML)
                .replace(/!\[([^\]]*?)\]\(([^)]+?)\)/g, '<img src="$2" alt="$1" style="max-width: 100%; height: auto; border-radius: 8px; margin: 8px 0; box-shadow: 0 4px 8px rgba(0,0,0,0.3);">')
                .replace(/&lt;img([^&]*?)&gt;/g, '<img$1 style="max-width: 100%; height: auto; border-radius: 8px; margin: 8px 0; box-shadow: 0 4px 8px rgba(0,0,0,0.3);">')
                // Audio elements
                .replace(/&lt;audio([^&]*?)&gt;(.*?)&lt;\/audio&gt;/gs, '<audio$1 style="width: 100%; margin: 8px 0; border-radius: 8px;">$2</audio>')
                .replace(/&lt;source([^&]*?)&gt;/g, '<source$1>')
                // Video elements
                .replace(/&lt;video([^&]*?)&gt;(.*?)&lt;\/video&gt;/gs, '<video$1 style="max-width: 100%; height: auto; border-radius: 8px; margin: 8px 0; box-shadow: 0 4px 8px rgba(0,0,0,0.3);">$2</video>')
                // Links
                .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" style="color: #3f83f8; text-decoration: none; border-bottom: 1px dotted #3f83f8;">$1</a>')
                // Emoji enhancement for better visibility
                .replace(/(📊|🖼️|🎥|🎵|✅|❌|🤔|🧹|⚙️|🔑)/g, '<span style="font-size: 1.1em;">$1</span>');

            return formatted;
        }

        performCleanup() {
            // Simple page cleanup
            const elementsToHide = [
                '[class*="ad"]', '[class*="advertisement"]', '[class*="banner"]',
                '[class*="popup"]', '[class*="modal"]:not(.ai-browsing-agent-modal)',
                '[class*="cookie"]', '[class*="consent"]', '[class*="newsletter"]'
            ];

            let hiddenCount = 0;
            elementsToHide.forEach(selector => {
                document.querySelectorAll(selector).forEach(el => {
                    if (!el.closest('.ai-browsing-agent-modal, #ai-browsing-agent-btn')) {
                        el.style.display = 'none';
                        hiddenCount++;
                    }
                });
            });

            this.addChatMessage('assistant', `🧹 Page cleanup complete! Hidden ${hiddenCount} distracting elements.`);
        }

        showSettings() {
            const chat = this.modal.querySelector('#ai-agent-chat');
            const geminiClient = STATE.geminiClient;

            const settingsHtml = `
                <div style="background: rgba(255, 255, 255, 0.04); padding: 24px; border-radius: 16px; margin-bottom: 20px; border: 1px solid rgba(255, 255, 255, 0.08);">
                    <h3 style="margin: 0 0 24px; color: #ffffff; font-size: 18px; font-weight: 600; display: flex; align-items: center; gap: 8px;">⚙️ Settings</h3>
                    
                    <div style="margin-bottom: 24px;">
                        <label style="display: block; color: #e1e5e9; font-size: 14px; font-weight: 500; margin-bottom: 8px;">Gemini API Key</label>
                        <input type="password" id="api-key-input" placeholder="Enter your Gemini API key" value="${geminiClient.apiKey}" style="
                            width: 100%;
                            padding: 12px 16px;
                            background: rgba(255, 255, 255, 0.04);
                            border: 1px solid rgba(255, 255, 255, 0.12);
                            border-radius: 10px;
                            color: #ffffff;
                            font-size: 14px;
                            outline: none;
                            transition: all 0.2s ease;
                            font-family: inherit;
                        ">
                        <div style="font-size: 12px; color: #a0aec0; margin-top: 6px; line-height: 1.4;">
                            Get your free API key at <a href="https://aistudio.google.com/app/apikey" target="_blank" style="color: #3f83f8; text-decoration: none; border-bottom: 1px dotted #3f83f8;">Google AI Studio</a>
                        </div>
                    </div>
                    
                    <div style="margin-bottom: 24px;">
                        <label style="display: block; color: #e1e5e9; font-size: 14px; font-weight: 500; margin-bottom: 8px;">Model Selection</label>
                        <select id="model-select" class="ai-agent-scrollable" style="
                            width: 100%;
                            padding: 12px 16px;
                            background: rgba(255, 255, 255, 0.04);
                            border: 1px solid rgba(255, 255, 255, 0.12);
                            border-radius: 10px;
                            color: #ffffff;
                            font-size: 14px;
                            outline: none;
                            transition: all 0.2s ease;
                            font-family: inherit;
                            max-height: 200px;
                        ">
                        <style>
                            #model-select option {
                                background: #27282b !important;
                                color: #ffffff !important;
                                padding: 8px !important;
                            }
                            #model-select optgroup {
                                background: #1a1b1e !important;
                                color: #3f83f8 !important;
                                font-weight: 600 !important;
                                padding: 4px 8px !important;
                            }
                            #model-select:focus {
                                border-color: #3f83f8 !important;
                                box-shadow: 0 0 0 3px rgba(63, 131, 248, 0.1) !important;
                                background: rgba(63, 131, 248, 0.05) !important;
                            }
                        </style>
                            ${this.generateModelOptions(geminiClient.selectedModel)}
                        </select>
                        <div style="font-size: 12px; color: #a0aec0; margin-top: 6px; line-height: 1.4;">
                            Choose the model that best fits your use case and budget
                        </div>
                    </div>
                    
                    <div style="display: flex; gap: 12px;">
                        <button id="save-settings" style="
                            flex: 1;
                            padding: 12px 20px;
                            background: linear-gradient(135deg, #31c48d 0%, #10b981 100%);
                            border: none;
                            border-radius: 10px;
                            color: white;
                            cursor: pointer;
                            font-size: 14px;
                            font-weight: 500;
                            transition: all 0.2s ease;
                            box-shadow: 0 4px 12px rgba(49, 196, 141, 0.2);
                        ">Save Settings</button>
                        <button id="test-api" style="
                            padding: 12px 20px;
                            background: rgba(63, 131, 248, 0.08);
                            border: 1px solid rgba(63, 131, 248, 0.2);
                            border-radius: 10px;
                            color: #3f83f8;
                            cursor: pointer;
                            font-size: 14px;
                            font-weight: 500;
                            transition: all 0.2s ease;
                        ">Test API</button>
                    </div>
                </div>
            `;

            chat.innerHTML = settingsHtml;
            this.setupSettingsEvents();
        }

        generateModelOptions(selectedModel) {
            const categories = {
                'Primary': [],
                'Audio': [],
                'Multimodal': [],
                'Live': [],
                'Image Generation': [],
                'Video Generation': [],
                'Gemma': [],
                'Embedding': [],
                'Specialized': []
            };

            // Group models by category
            Object.entries(CONFIG.models).forEach(([value, model]) => {
                const category = model.category || 'Primary';
                categories[category].push({ value, ...model });
            });

            let optionsHtml = '';
            Object.entries(categories).forEach(([categoryName, models]) => {
                if (models.length > 0) {
                    optionsHtml += `<optgroup label="${categoryName} Models" style="color: #a0aec0;">`;
                    models.forEach(model => {
                        const isSelected = model.value === selectedModel ? 'selected' : '';
                        optionsHtml += `<option value="${model.value}" ${isSelected}>${model.name} - ${model.description}</option>`;
                    });
                    optionsHtml += '</optgroup>';
                }
            });

            return optionsHtml;
        }

        setupSettingsEvents() {
            const saveBtn = this.modal.querySelector('#save-settings');
            const testBtn = this.modal.querySelector('#test-api');
            const apiKeyInput = this.modal.querySelector('#api-key-input');
            const modelSelect = this.modal.querySelector('#model-select');

            // Model selection change feedback
            modelSelect.addEventListener('change', () => {
                const selectedModel = modelSelect.value;
                const modelInfo = CONFIG.models[selectedModel];

                // Visual feedback in dropdown
                modelSelect.style.borderColor = '#31c48d';
                modelSelect.style.background = 'rgba(49, 196, 141, 0.05)';

                // Show model info below dropdown
                let modelInfoDiv = this.modal.querySelector('#model-info-display');
                if (!modelInfoDiv) {
                    modelInfoDiv = document.createElement('div');
                    modelInfoDiv.id = 'model-info-display';
                    modelSelect.parentNode.insertBefore(modelInfoDiv, modelSelect.nextSibling);
                }

                modelInfoDiv.innerHTML = `
                    <div style="
                        margin-top: 8px;
                        padding: 8px 12px;
                        background: rgba(49, 196, 141, 0.1);
                        border: 1px solid rgba(49, 196, 141, 0.2);
                        border-radius: 8px;
                        font-size: 12px;
                        color: #31c48d;
                        animation: fadeIn 0.3s ease;
                    ">
                        ✓ Selected: <strong>${modelInfo.name}</strong> (${modelInfo.category})
                        <br><span style="color: #a0aec0; font-size: 11px;">${modelInfo.description}</span>
                    </div>
                `;

                // Reset border color after delay
                setTimeout(() => {
                    modelSelect.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                    modelSelect.style.background = 'rgba(255, 255, 255, 0.04)';
                }, 2000);
            });

            saveBtn.addEventListener('click', () => {
                const apiKey = apiKeyInput.value.trim();
                const selectedModel = modelSelect.value;

                if (!apiKey) {
                    alert('Please enter an API key');
                    return;
                }

                STATE.geminiClient.setApiKey(apiKey);
                STATE.geminiClient.setModel(selectedModel);

                this.showWelcomeMessage();
                this.addChatMessage('assistant', '✅ Settings saved successfully!');
            });

            testBtn.addEventListener('click', async () => {
                const apiKey = apiKeyInput.value.trim();
                if (!apiKey) {
                    alert('Please enter an API key first');
                    return;
                }

                // Temporarily set API key for testing
                const originalKey = STATE.geminiClient.apiKey;
                STATE.geminiClient.setApiKey(apiKey);
                STATE.geminiClient.setModel(modelSelect.value);

                try {
                    testBtn.textContent = 'Testing...';
                    testBtn.disabled = true;

                    await STATE.geminiClient.sendMessage('Hello! Please respond with a brief confirmation that the API is working.');

                    testBtn.textContent = '✅ Success!';
                    testBtn.style.color = '#31c48d';
                    testBtn.style.borderColor = 'rgba(49, 196, 141, 0.2)';

                } catch (error) {
                    testBtn.textContent = '❌ Failed';
                    testBtn.style.color = '#f87171';
                    testBtn.style.borderColor = 'rgba(248, 113, 113, 0.2)';

                    // Restore original key if test failed
                    STATE.geminiClient.setApiKey(originalKey);

                    alert('API test failed: ' + error.message);
                } finally {
                    setTimeout(() => {
                        testBtn.textContent = 'Test API';
                        testBtn.disabled = false;
                        testBtn.style.color = '#3f83f8';
                        testBtn.style.borderColor = 'rgba(63, 131, 248, 0.2)';
                    }, 2000);
                }
            });
        }
    }

    // Initialization
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        if (STATE.isInitialized) return;

        // Initialize components
        STATE.geminiClient = new GeminiClient();
        STATE.uiManager = new UIManager();

        // Create global browsing agent instance
        window.BrowsingAgent = {
            geminiClient: STATE.geminiClient,
            uiManager: STATE.uiManager,
            version: CONFIG.version
        };

        // Initialize UI
        STATE.uiManager.init();

        STATE.isInitialized = true;
        utils.log('AI Browsing Agent v' + CONFIG.version + ' initialized successfully');
    }

    // Start initialization
    init();

})(); 