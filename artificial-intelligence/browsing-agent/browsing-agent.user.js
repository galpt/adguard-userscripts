// ==UserScript==
// @name         AI Browsing Agent (Gemini-Powered)
// @namespace    https://github.com/galpt/adguard-userscripts
// @version      4.4.0
// @description  Intelligent browsing assistant powered by Google Gemini API with function-calling, URL browsing, real-time DOM manipulation, and advanced content analysis
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
        version: '4.4.0',
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

    // Add conversation management
    const CONVERSATION_CONFIG = {
        maxHistoryPairs: 10, // Maximum conversation pairs to keep in direct context
        maxTokens: 8000, // Approximate token limit for context
        summaryThreshold: 5, // Number of pairs before considering summarization
        maxBrowsingDepth: 3, // Maximum URLs to browse in one turn
        maxExistingSummaryLength: 2000 // Max chars for existing summary in prompts
    };

    // Utilities
    const utils = {
        log: (...args) => {
            if (CONFIG.debug) console.log('[AI Browsing Agent]', ...args);
        },

        // Estimate token count (rough approximation)
        estimateTokens: (text) => {
            if (typeof text !== 'string') return 0;
            // Rough approximation: 1 token ≈ 4 characters for English text
            return Math.ceil(text.length / 4);
        },

        // Safe HTML setter to handle TrustedHTML requirements
        safeSetHTML: (element, html) => {
            try {
                // For userscripts, we often need to bypass TrustedHTML restrictions
                // Try direct innerHTML assignment first
                element.innerHTML = html;
            } catch (error) {
                console.warn('Direct innerHTML failed, trying TrustedHTML policy:', error);
                try {
                    // Try to create a TrustedHTML policy if available
                    if (window.trustedTypes && window.trustedTypes.createPolicy) {
                        if (!window.aiAgentHTMLPolicy) {
                            window.aiAgentHTMLPolicy = window.trustedTypes.createPolicy('ai-agent-html', {
                                createHTML: (string) => string
                            });
                        }
                        element.innerHTML = window.aiAgentHTMLPolicy.createHTML(html);
                    } else {
                        // Last resort - create elements manually
                        console.warn('Creating DOM elements manually due to security restrictions');
                        const tempContainer = document.createElement('div');
                        tempContainer.innerHTML = html;
                        element.innerHTML = '';
                        while (tempContainer.firstChild) {
                            element.appendChild(tempContainer.firstChild);
                        }
                    }
                } catch (secondError) {
                    console.error('All HTML insertion methods failed:', secondError);
                    // Only fall back to textContent as absolute last resort
                    element.textContent = 'Failed to load interface. Please refresh the page.';
                }
            }
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

    // Function Orchestrator - handles all browser function calls
    class FunctionOrchestrator {
        constructor() {
            this.actionHistory = [];
            this.browsedUrls = new Set();
        }

        generateSystemPrompt(pageContext) {
            return `You are an intelligent browser assistant with access to various functions. You can analyze content, manipulate DOM elements, browse URLs, and more.

CURRENT PAGE CONTEXT:
Title: ${pageContext.title}
URL: ${pageContext.url}
Content Preview: ${pageContext.text.slice(0, 1000)}...

AVAILABLE FUNCTIONS:
You can call browser functions by including JSON function calls in your response. Functions available:

1. **discoverElements** - Discover page structure and available elements BEFORE manipulation
   {"function": "discoverElements", "focus": "all", "limit": 20, "description": "Discovering page structure"}
   Focus options: "all", "headings", "content", "navigation", "interactive"

2. **browseUrl** - Fetch and analyze content from URLs
   {"function": "browseUrl", "url": "https://example.com", "description": "Fetching example.com"}

3. **createElement** - Create new DOM elements
   {"function": "createElement", "element": "button", "text": "Click me", "styles": {"color": "red"}, "target": "body", "position": "append", "description": "Creating a red button"}

4. **removeElement** - Remove DOM elements (use discoverElements first!)
   {"function": "removeElement", "selector": ".ads, [id*='ad']", "description": "Removing advertisements"}

5. **modifyElement** - Modify existing DOM elements (use discoverElements first!)
   {"function": "modifyElement", "selector": "h1", "styles": {"color": "blue"}, "description": "Making headers blue"}

6. **addStyles** - Add CSS styles to page
   {"function": "addStyles", "css": "body { background: black; }", "description": "Adding dark background"}

7. **analyzeContent** - Deep analysis of current page
   {"function": "analyzeContent", "focus": "main content", "description": "Analyzing page content"}

FUNCTION CALL FORMAT:
To call functions, include them in your response like this:

Regular response text here...

[FUNCTION_CALL]
{"function": "functionName", "param1": "value1", "param2": "value2", "description": "What this does"}
[/FUNCTION_CALL]

More response text...

[FUNCTION_CALL]
{"function": "anotherFunction", "param1": "value1", "description": "What this does"}
[/FUNCTION_CALL]

FUNCTION EXECUTION RULES:
1. You can mix regular text responses with function calls
2. Function calls will be executed automatically and results will be available
3. Always include a "description" field explaining what the function does
4. If a user mentions URLs, automatically browse them using browseUrl
5. For DOM manipulation requests, ALWAYS use discoverElements FIRST to understand page structure
6. Multiple function calls in one response are allowed and encouraged

DOM MANIPULATION BEST PRACTICES:
- NEVER attempt to modify elements without first discovering what's available
- Use discoverElements to find valid selectors before modifyElement or removeElement
- If elements aren't found, the system will suggest alternatives automatically
- Start with broad discovery (focus: "all") then narrow down (focus: "content", "headings", etc.)
- Test modifications on safe elements first

RESPONSE GUIDELINES:
- Be conversational and helpful
- Use function calls when they would enhance your response
- Don't ask permission to use functions - just use them when appropriate
- Explain what you're doing as you do it
- If functions fail, handle errors gracefully and suggest alternatives
- For DOM tasks: Discover → Analyze → Modify (in that order)

ORCHESTRATION INTELLIGENCE:
- This system supports multi-turn function calling - you can chain operations
- If a user asks to "edit the title", discover elements first, then modify in a follow-up
- Don't just discover and stop - complete the full task the user requested
- The system will automatically continue your work across multiple AI calls
- Be proactive: if you see discovered elements that match the user's intent, use them

Remember: You are not just a text assistant - you are an active browser agent that can actually perform actions! Complete tasks end-to-end automatically.`;
        }

        extractFunctionCalls(responseText) {
            const functionCallRegex = /\[FUNCTION_CALL\](.*?)\[\/FUNCTION_CALL\]/gs;
            const calls = [];
            let match;

            while ((match = functionCallRegex.exec(responseText)) !== null) {
                try {
                    const functionData = JSON.parse(match[1].trim());
                    if (functionData.function) {
                        calls.push(functionData);
                    }
                } catch (error) {
                    console.warn('Failed to parse function call:', match[1], error);
                }
            }

            return calls;
        }

        removeFunctionCallsFromText(responseText) {
            return responseText.replace(/\[FUNCTION_CALL\].*?\[\/FUNCTION_CALL\]/gs, '').trim();
        }

        async executeFunctionCall(functionCall) {
            console.log('🚀 Executing function:', functionCall.function, functionCall);

            try {
                switch (functionCall.function) {
                    case 'browseUrl':
                        return await this.browseUrl(functionCall);
                    case 'createElement':
                        return await this.createElement(functionCall);
                    case 'removeElement':
                        return await this.removeElement(functionCall);
                    case 'modifyElement':
                        return await this.modifyElement(functionCall);
                    case 'addStyles':
                        return await this.addStyles(functionCall);
                    case 'analyzeContent':
                        return await this.analyzeContent(functionCall);
                    case 'discoverElements':
                        return await this.discoverElements(functionCall);
                    default:
                        throw new Error(`Unknown function: ${functionCall.function}`);
                }
            } catch (error) {
                console.error('Function execution error:', error);
                return {
                    success: false,
                    error: error.message,
                    function: functionCall.function
                };
            }
        }

        async browseUrl(params) {
            const geminiClient = STATE.geminiClient;

            if (geminiClient.currentTurnBrowsedURLs.has(params.url)) {
                return {
                    success: true,
                    result: 'URL already browsed in this turn',
                    cached: true
                };
            }

            try {
                // Use GM_xmlhttpRequest to fetch URL content
                const response = await new Promise((resolve, reject) => {
                    GM_xmlhttpRequest({
                        method: 'GET',
                        url: params.url,
                        timeout: 15000,
                        onload: resolve,
                        onerror: reject,
                        ontimeout: () => reject(new Error('Request timeout'))
                    });
                });

                if (response.status === 200) {
                    geminiClient.currentTurnBrowsedURLs.add(params.url);
                    const content = this.extractTextFromHTML(response.responseText);
                    const title = this.extractTitleFromHTML(response.responseText);

                    this.actionHistory.push({
                        action: 'browse',
                        url: params.url,
                        timestamp: Date.now(),
                        description: params.description
                    });

                    // Intelligent content summarization for this URL
                    await this.summarizeUrlContent(params.url, content, params.description || 'user request');

                    return {
                        success: true,
                        result: `Successfully browsed ${params.url}. Content summarized and added to context.`,
                        content: content,
                        title: title,
                        summarized: true
                    };
                } else {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
            } catch (error) {
                // Add failed URL to browsed set to avoid retrying
                geminiClient.currentTurnBrowsedURLs.add(params.url);
                geminiClient.currentTurnAccumulatedSummary += `\n\n[Failed to fetch content from ${params.url}: ${error.message}]`;

                return {
                    success: false,
                    error: `Failed to browse ${params.url}: ${error.message}`
                };
            }
        }

        async summarizeUrlContent(url, content, userQuery) {
            const geminiClient = STATE.geminiClient;

            if (!content || content.trim().length === 0) {
                geminiClient.currentTurnAccumulatedSummary += `\n\n[No content found at ${url}]`;
                return;
            }

            // Progressive content reduction if too large
            let contentToSummarize = content;
            if (contentToSummarize.length > 50000) {
                contentToSummarize = contentToSummarize.substring(0, 50000);
            }

            // Further reduce based on accumulated summary size
            let existingSummary = geminiClient.currentTurnAccumulatedSummary;
            const maxTotalLength = 15000; // Target total length

            if (existingSummary.length + contentToSummarize.length > maxTotalLength) {
                const remainingSpace = maxTotalLength - existingSummary.length;
                contentToSummarize = contentToSummarize.substring(0, Math.max(remainingSpace * 0.7, 1000));
            }

            const summarizePrompt = `Please summarize the following web content in relation to this user query: "${userQuery}"

${existingSummary ? `Existing summary: ${existingSummary}\n\n` : ''}

New content from ${url}:
${contentToSummarize}

Provide a comprehensive summary that:
1. Integrates with any existing summary
2. Focuses on information relevant to the user query
3. Maintains important details and context
4. Is concise but thorough

Format as: Updated comprehensive summary covering all browsed content so far.`;

            try {
                const summary = await geminiClient.sendRawMessage(summarizePrompt);
                geminiClient.currentTurnAccumulatedSummary = summary || `Content from ${url}: ${contentToSummarize.substring(0, 1000)}...`;
            } catch (error) {
                console.warn('Failed to summarize content from:', url, error);
                // Fallback to basic content inclusion
                if (geminiClient.currentTurnAccumulatedSummary) {
                    geminiClient.currentTurnAccumulatedSummary += `\n\nContent from ${url}: ${contentToSummarize.substring(0, 1000)}...`;
                } else {
                    geminiClient.currentTurnAccumulatedSummary = `Content from ${url}: ${contentToSummarize.substring(0, 1000)}...`;
                }
            }
        }

        async intelligentBrowsingFlow(userMessage) {
            const geminiClient = STATE.geminiClient;
            const urls = this.extractURLs(userMessage);

            if (urls.length === 0) return false;

            // Reset browsing state for new turn
            geminiClient.resetTurnBrowsingState();

            // Browse first URL
            const firstUrl = urls[0];
            await this.browseUrl({ url: firstUrl, description: userMessage });

            // Intelligent decision-making for additional URLs
            while (geminiClient.currentTurnBrowsingDepth < CONVERSATION_CONFIG.maxBrowsingDepth && urls.length > 1) {
                const shouldBrowseMore = await this.shouldBrowseAdditionalUrls(userMessage, urls.slice(1));

                if (!shouldBrowseMore.continue) break;

                const nextUrl = shouldBrowseMore.nextUrl || urls[geminiClient.currentTurnBrowsingDepth + 1];
                if (nextUrl && !geminiClient.currentTurnBrowsedURLs.has(nextUrl)) {
                    geminiClient.currentTurnBrowsingDepth++;
                    await this.browseUrl({ url: nextUrl, description: userMessage });
                } else {
                    break;
                }
            }

            return true;
        }

        async shouldBrowseAdditionalUrls(userQuery, remainingUrls) {
            const geminiClient = STATE.geminiClient;

            if (remainingUrls.length === 0) return { continue: false };

            const decisionPrompt = `Based on the user query and current browsed content, should I browse additional URLs?

User Query: "${userQuery}"

Current Summary: ${geminiClient.currentTurnAccumulatedSummary}

Already Browsed: ${Array.from(geminiClient.currentTurnBrowsedURLs).join(', ')}

Remaining URLs: ${remainingUrls.join(', ')}

Respond with JSON:
{
  "is_sufficient": boolean,
  "next_urls_to_browse": ["url1", "url2"],
  "reasoning": "explanation"
}`;

            try {
                const response = await geminiClient.sendRawMessage(decisionPrompt);
                const decision = JSON.parse(response.replace(/```json\n?|\n?```/g, ''));

                return {
                    continue: !decision.is_sufficient && decision.next_urls_to_browse?.length > 0,
                    nextUrl: decision.next_urls_to_browse?.[0],
                    reasoning: decision.reasoning
                };
            } catch (error) {
                console.warn('Failed to get browsing decision:', error);
                // Default to browse one more URL if we have space
                return {
                    continue: geminiClient.currentTurnBrowsingDepth < 2,
                    nextUrl: remainingUrls[0]
                };
            }
        }

        extractTextFromHTML(html) {
            // Create a temporary DOM element to parse HTML
            const tempDiv = document.createElement('div');
            utils.safeSetHTML(tempDiv, html);

            // Remove script and style elements
            const scripts = tempDiv.querySelectorAll('script, style, nav, header, footer, aside');
            scripts.forEach(el => el.remove());

            return tempDiv.textContent || tempDiv.innerText || '';
        }

        extractTitleFromHTML(html) {
            const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
            return titleMatch ? titleMatch[1].trim() : 'Untitled';
        }

        async createElement(params) {
            const element = document.createElement(params.element || 'div');

            if (params.text) element.textContent = params.text;
            if (params.innerHTML) utils.safeSetHTML(element, params.innerHTML);
            if (params.id) element.id = params.id;
            if (params.className) element.className = params.className;

            if (params.attributes) {
                Object.entries(params.attributes).forEach(([key, value]) => {
                    element.setAttribute(key, value);
                });
            }

            if (params.styles) {
                Object.entries(params.styles).forEach(([key, value]) => {
                    element.style[key] = value;
                });
            }

            // Find target element
            let target = document.body;
            if (params.target) {
                const targetElement = document.querySelector(params.target);
                if (targetElement) {
                    target = targetElement;
                } else {
                    console.warn(`Target not found: ${params.target}, using body instead`);
                }
            }

            // Insert element based on position
            const position = params.position || 'append';
            switch (position) {
                case 'prepend':
                    target.insertBefore(element, target.firstChild);
                    break;
                case 'after':
                    if (target.parentNode) {
                        target.parentNode.insertBefore(element, target.nextSibling);
                    } else {
                        document.body.appendChild(element);
                    }
                    break;
                case 'before':
                    if (target.parentNode) {
                        target.parentNode.insertBefore(element, target);
                    } else {
                        document.body.appendChild(element);
                    }
                    break;
                default:
                    target.appendChild(element);
            }

            this.actionHistory.push({
                action: 'create',
                element,
                timestamp: Date.now(),
                description: params.description
            });

            return {
                success: true,
                result: params.description || `Created ${params.element || 'div'} element`,
                element
            };
        }

        async removeElement(params) {
            const elements = document.querySelectorAll(params.selector);
            if (elements.length === 0) {
                return {
                    success: false,
                    error: `No elements found with selector: ${params.selector}`
                };
            }

            const removedElements = [];
            elements.forEach(element => {
                removedElements.push({
                    tag: element.tagName,
                    id: element.id,
                    className: element.className
                });
                element.remove();
            });

            this.actionHistory.push({
                action: 'remove',
                selector: params.selector,
                removedElements,
                timestamp: Date.now(),
                description: params.description
            });

            return {
                success: true,
                result: params.description || `Removed ${elements.length} element(s)`,
                removedCount: elements.length
            };
        }

        async modifyElement(params) {
            let elements = document.querySelectorAll(params.selector);
            let actualSelector = params.selector;
            let fallbackUsed = false;

            // If no elements found, try intelligent fallbacks
            if (elements.length === 0) {
                const fallbacks = this.generateFallbackSelectors(params.selector);

                for (const fallback of fallbacks) {
                    elements = document.querySelectorAll(fallback);
                    if (elements.length > 0) {
                        actualSelector = fallback;
                        fallbackUsed = true;
                        break;
                    }
                }

                // If still no elements, provide helpful suggestions
                if (elements.length === 0) {
                    const suggestions = await this.suggestAlternativeSelectors(params.selector);
                    return {
                        success: false,
                        error: `No elements found with selector: ${params.selector}`,
                        suggestions: suggestions,
                        fallbacksAttempted: fallbacks
                    };
                }
            }

            elements.forEach(element => {
                if (params.text !== undefined) element.textContent = params.text;
                if (params.innerHTML !== undefined) utils.safeSetHTML(element, params.innerHTML);

                if (params.attributes) {
                    Object.entries(params.attributes).forEach(([key, value]) => {
                        element.setAttribute(key, value);
                    });
                }

                if (params.styles) {
                    Object.entries(params.styles).forEach(([key, value]) => {
                        element.style[key] = value;
                    });
                }
            });

            this.actionHistory.push({
                action: 'modify',
                selector: actualSelector,
                originalSelector: params.selector,
                fallbackUsed: fallbackUsed,
                timestamp: Date.now(),
                description: params.description
            });

            let resultMessage = params.description || `Modified ${elements.length} element(s)`;
            if (fallbackUsed) {
                resultMessage += ` (used fallback selector: ${actualSelector})`;
            }

            return {
                success: true,
                result: resultMessage,
                modifiedCount: elements.length,
                selectorUsed: actualSelector,
                fallbackUsed: fallbackUsed
            };
        }

        generateFallbackSelectors(originalSelector) {
            const fallbacks = [];

            // If it's a class selector, try variations
            if (originalSelector.startsWith('.')) {
                const className = originalSelector.substring(1);
                fallbacks.push(`[class*="${className}"]`);
                fallbacks.push(`[class^="${className}"]`);
                fallbacks.push(`[class$="${className}"]`);
            }

            // If it's an ID selector, try variations
            if (originalSelector.startsWith('#')) {
                const idName = originalSelector.substring(1);
                fallbacks.push(`[id*="${idName}"]`);
                fallbacks.push(`[id^="${idName}"]`);
                fallbacks.push(`[id$="${idName}"]`);
            }

            // Try common element patterns
            if (originalSelector.includes('notice')) {
                fallbacks.push('.notice', '.notification', '.alert', '.message', '[class*="notice"]');
            }

            if (originalSelector.includes('content')) {
                fallbacks.push('main', 'article', '.content', '.main-content', '#content', '[class*="content"]');
            }

            if (originalSelector.includes('nav')) {
                fallbacks.push('nav', '.nav', '.navigation', '.menu', '[class*="nav"]');
            }

            if (originalSelector.includes('header')) {
                fallbacks.push('header', '.header', '.page-header', '[class*="header"]');
            }

            if (originalSelector.includes('footer')) {
                fallbacks.push('footer', '.footer', '.page-footer', '[class*="footer"]');
            }

            return [...new Set(fallbacks)]; // Remove duplicates
        }

        async suggestAlternativeSelectors(failedSelector) {
            // Analyze the page structure to suggest alternatives
            try {
                const suggestions = [];

                // Find similar elements based on the failed selector
                if (failedSelector.includes('notice') || failedSelector.includes('alert')) {
                    const alerts = document.querySelectorAll('.alert, .notice, .notification, .message, .warning, .info');
                    alerts.forEach(el => {
                        suggestions.push({
                            selector: this.generateSelector(el),
                            type: 'similar element',
                            text: el.textContent.slice(0, 50)
                        });
                    });
                }

                if (failedSelector.includes('content')) {
                    const contentAreas = document.querySelectorAll('main, article, .content, #content, .main-content');
                    contentAreas.forEach(el => {
                        suggestions.push({
                            selector: this.generateSelector(el),
                            type: 'content area',
                            text: el.textContent.slice(0, 50)
                        });
                    });
                }

                // If no specific suggestions, find the most common elements
                if (suggestions.length === 0) {
                    const commonElements = document.querySelectorAll('div, section, article, main, p, h1, h2, h3');
                    Array.from(commonElements).slice(0, 5).forEach(el => {
                        suggestions.push({
                            selector: this.generateSelector(el),
                            type: 'common element',
                            text: el.textContent.slice(0, 50)
                        });
                    });
                }

                return suggestions.slice(0, 5); // Limit to 5 suggestions

            } catch (error) {
                return [{ error: 'Could not generate suggestions' }];
            }
        }

        async addStyles(params) {
            const styleId = params.id || `ai-agent-styles-${Date.now()}`;
            let styleElement = document.getElementById(styleId);

            if (!styleElement) {
                styleElement = document.createElement('style');
                styleElement.id = styleId;
                document.head.appendChild(styleElement);
            }

            styleElement.textContent += '\n' + params.css;

            this.actionHistory.push({
                action: 'styles',
                css: params.css,
                styleId,
                timestamp: Date.now(),
                description: params.description
            });

            return {
                success: true,
                result: params.description || 'Added CSS styles'
            };
        }

        async analyzeContent(params) {
            const content = utils.extractPageContent();
            const focus = params.focus || 'main content';

            // Extract key information for analysis
            const textLength = content.text.length;
            const words = content.text.split(/\s+/).filter(word => word.length > 0);
            const wordCount = words.length;

            // Generate actual content summary
            let summary = '';

            if (textLength > 100) {
                // Extract sentences and find the most relevant ones
                const sentences = content.text.split(/[.!?]+/).filter(s => s.trim().length > 20);
                const firstFewSentences = sentences.slice(0, 3).join('. ').trim();

                // Create structured analysis
                summary = `**Page Summary:**\n\n`;
                summary += `**Title:** ${content.title}\n\n`;
                summary += `**Main Content:** ${firstFewSentences}${firstFewSentences.endsWith('.') ? '' : '.'}\n\n`;
                summary += `**Key Statistics:**\n`;
                summary += `- Word count: ${wordCount.toLocaleString()} words\n`;
                summary += `- Links found: ${content.links.length}\n`;
                summary += `- Images found: ${content.images.length}\n\n`;

                // Extract some key topics based on frequent words
                const commonWords = words
                    .filter(word => word.length > 4)
                    .filter(word => !/^(this|that|with|from|they|them|have|been|will|were|would|could|should|there|their|these|those)$/i.test(word))
                    .reduce((acc, word) => {
                        const normalized = word.toLowerCase().replace(/[^a-z]/g, '');
                        acc[normalized] = (acc[normalized] || 0) + 1;
                        return acc;
                    }, {});

                const topWords = Object.entries(commonWords)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 5)
                    .map(([word]) => word);

                if (topWords.length > 0) {
                    summary += `**Key Topics:** ${topWords.join(', ')}\n\n`;
                }

                // Add specific focus analysis
                if (focus === 'main content') {
                    const mainElements = document.querySelectorAll('main, article, .content, .post, .entry');
                    if (mainElements.length > 0) {
                        summary += `**Main Content Areas:** Found ${mainElements.length} primary content section(s)\n\n`;
                    }
                }

                summary += `*Analysis completed at ${new Date().toLocaleTimeString()}*`;
            } else {
                summary = `**Brief Page Analysis:**\n\nThis appears to be a short page with limited content (${wordCount} words). The page title is "${content.title}" and contains ${content.links.length} links and ${content.images.length} images.`;
            }

            this.actionHistory.push({
                action: 'analyze',
                focus: focus,
                timestamp: Date.now(),
                description: params.description
            });

            return {
                success: true,
                result: summary,
                analysis: {
                    title: content.title,
                    url: content.url,
                    wordCount: wordCount,
                    linkCount: content.links.length,
                    imageCount: content.images.length,
                    focus: focus
                }
            };
        }

        async discoverElements(params) {
            const focus = params.focus || 'all';
            const limit = params.limit || 20;

            let discovery = {
                timestamp: new Date().toISOString(),
                focus: focus,
                elements: []
            };

            try {
                let selectors = [];

                if (focus === 'all' || focus === 'headings') {
                    // Find headings
                    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
                    headings.forEach((el, i) => {
                        if (i < limit) {
                            selectors.push({
                                type: 'heading',
                                tagName: el.tagName.toLowerCase(),
                                text: el.textContent.slice(0, 100),
                                selector: this.generateSelector(el),
                                id: el.id || null,
                                className: el.className || null
                            });
                        }
                    });
                }

                if (focus === 'all' || focus === 'content') {
                    // Find main content areas
                    const contentSelectors = [
                        'main', 'article', '.content', '.main-content', '.post', '.entry',
                        '.mw-content-text', '.page-content', '#content', '#main'
                    ];

                    contentSelectors.forEach(selector => {
                        const elements = document.querySelectorAll(selector);
                        elements.forEach((el, i) => {
                            if (i < 3) { // Limit content elements
                                selectors.push({
                                    type: 'content-area',
                                    tagName: el.tagName.toLowerCase(),
                                    text: el.textContent.slice(0, 150),
                                    selector: selector,
                                    id: el.id || null,
                                    className: el.className || null,
                                    childCount: el.children.length
                                });
                            }
                        });
                    });
                }

                if (focus === 'all' || focus === 'navigation') {
                    // Find navigation elements
                    const navElements = document.querySelectorAll('nav, .nav, .navigation, .menu, #menu');
                    navElements.forEach((el, i) => {
                        if (i < 5) {
                            selectors.push({
                                type: 'navigation',
                                tagName: el.tagName.toLowerCase(),
                                text: el.textContent.slice(0, 100),
                                selector: this.generateSelector(el),
                                id: el.id || null,
                                className: el.className || null
                            });
                        }
                    });
                }

                if (focus === 'all' || focus === 'interactive') {
                    // Find buttons, links, forms
                    const interactive = document.querySelectorAll('button, input, a, form, .btn, .button');
                    interactive.forEach((el, i) => {
                        if (i < 10) {
                            selectors.push({
                                type: 'interactive',
                                tagName: el.tagName.toLowerCase(),
                                text: (el.textContent || el.value || el.placeholder || '').slice(0, 50),
                                selector: this.generateSelector(el),
                                id: el.id || null,
                                className: el.className || null,
                                href: el.href || null
                            });
                        }
                    });
                }

                discovery.elements = selectors.slice(0, limit);
                discovery.totalFound = selectors.length;

                this.actionHistory.push({
                    action: 'discover',
                    focus: focus,
                    timestamp: Date.now(),
                    description: params.description
                });

                let result = `**Element Discovery Results:**\n\n`;
                result += `**Focus:** ${focus}\n`;
                result += `**Found:** ${discovery.totalFound} elements (showing ${discovery.elements.length})\n\n`;

                discovery.elements.forEach((elem, i) => {
                    result += `${i + 1}. **${elem.type}** (${elem.tagName})\n`;
                    result += `   - Selector: \`${elem.selector}\`\n`;
                    if (elem.text) result += `   - Text: "${elem.text}${elem.text.length >= 50 ? '...' : ''}"\n`;
                    if (elem.id) result += `   - ID: ${elem.id}\n`;
                    if (elem.className) result += `   - Classes: ${elem.className}\n`;
                    result += '\n';
                });

                return {
                    success: true,
                    result: result,
                    discovery: discovery
                };

            } catch (error) {
                return {
                    success: false,
                    error: `Element discovery failed: ${error.message}`
                };
            }
        }

        generateSelector(element) {
            // Generate a robust CSS selector for an element
            if (element.id) {
                return `#${element.id}`;
            }

            if (element.className) {
                const classes = element.className.split(' ').filter(c => c.trim());
                if (classes.length > 0) {
                    return `.${classes[0]}`;
                }
            }

            let selector = element.tagName.toLowerCase();
            let parent = element.parentElement;

            if (parent && parent !== document.body) {
                const siblings = Array.from(parent.children).filter(child =>
                    child.tagName === element.tagName
                );

                if (siblings.length > 1) {
                    const index = siblings.indexOf(element) + 1;
                    selector += `:nth-of-type(${index})`;
                }
            }

            return selector;
        }

        extractURLs(text) {
            if (typeof text !== 'string') return [];
            const urlRegex = /(https?:\/\/[^\s!"'<>()\[\]{}]+)/g;
            const matches = text.match(urlRegex);
            return matches ? Array.from(new Set(matches)) : [];
        }

        getActionHistory() {
            return this.actionHistory.slice();
        }

        clearHistory() {
            this.actionHistory = [];
            this.browsedUrls.clear();
        }
    }

    // Legacy DOM manipulation methods for compatibility
    class DOMManipulator extends FunctionOrchestrator {
        async executeActions(actionsData) {
            if (!actionsData.isDOMRequest || !actionsData.actions) {
                return { success: false, error: 'Invalid DOM actions data' };
            }

            const results = [];

            for (const action of actionsData.actions) {
                try {
                    const result = await this.executeAction(action);
                    results.push(result);
                } catch (error) {
                    results.push({ success: false, error: error.message, action });
                }
            }

            const successCount = results.filter(r => r.success).length;
            const totalCount = results.length;

            return {
                success: successCount > 0,
                results,
                message: actionsData.successMessage || `Executed ${successCount}/${totalCount} actions successfully`,
                executedCount: successCount,
                totalCount
            };
        }

        executeAction(action) {
            console.log('🔧 Executing DOM action:', action);

            switch (action.type) {
                case 'createElement':
                    return this.createElement(action);
                case 'removeElement':
                    return this.removeElement(action);
                case 'modifyElement':
                    return this.modifyElement(action);
                case 'addStyles':
                    return this.addStyles(action);
                default:
                    throw new Error(`Unknown action type: ${action.type}`);
            }
        }

        createElement(action) {
            const element = document.createElement(action.element || 'div');

            if (action.text) element.textContent = action.text;
            if (action.innerHTML) utils.safeSetHTML(element, action.innerHTML);
            if (action.id) element.id = action.id;
            if (action.className) element.className = action.className;

            if (action.attributes) {
                Object.entries(action.attributes).forEach(([key, value]) => {
                    element.setAttribute(key, value);
                });
            }

            if (action.styles) {
                Object.entries(action.styles).forEach(([key, value]) => {
                    element.style[key] = value;
                });
            }

            // Find target element
            let target = document.body;
            if (action.target) {
                const targetElement = document.querySelector(action.target);
                if (targetElement) {
                    target = targetElement;
                } else {
                    console.warn(`Target not found: ${action.target}, using body instead`);
                }
            }

            // Insert element based on position
            const position = action.position || 'append';
            switch (position) {
                case 'prepend':
                    target.insertBefore(element, target.firstChild);
                    break;
                case 'after':
                    if (target.parentNode) {
                        target.parentNode.insertBefore(element, target.nextSibling);
                    } else {
                        document.body.appendChild(element);
                    }
                    break;
                case 'before':
                    if (target.parentNode) {
                        target.parentNode.insertBefore(element, target);
                    } else {
                        document.body.appendChild(element);
                    }
                    break;
                default:
                    target.appendChild(element);
            }

            this.actionHistory.push({
                action: 'create',
                element,
                timestamp: Date.now(),
                description: action.description
            });

            return {
                success: true,
                element,
                message: action.description || `Created ${action.element || 'div'} element`
            };
        }

        removeElement(action) {
            const elements = document.querySelectorAll(action.selector);
            if (elements.length === 0) {
                return {
                    success: false,
                    error: `No elements found with selector: ${action.selector}`
                };
            }

            const removedElements = [];
            elements.forEach(element => {
                removedElements.push({
                    tag: element.tagName,
                    id: element.id,
                    className: element.className
                });
                element.remove();
            });

            this.actionHistory.push({
                action: 'remove',
                selector: action.selector,
                removedElements,
                timestamp: Date.now(),
                description: action.description
            });

            return {
                success: true,
                message: action.description || `Removed ${elements.length} element(s)`,
                removedCount: elements.length
            };
        }

        modifyElement(action) {
            const elements = document.querySelectorAll(action.selector);
            if (elements.length === 0) {
                return {
                    success: false,
                    error: `No elements found with selector: ${action.selector}`
                };
            }

            elements.forEach(element => {
                if (action.text !== undefined) element.textContent = action.text;
                if (action.innerHTML !== undefined) utils.safeSetHTML(element, action.innerHTML);

                if (action.attributes) {
                    Object.entries(action.attributes).forEach(([key, value]) => {
                        element.setAttribute(key, value);
                    });
                }

                if (action.styles) {
                    Object.entries(action.styles).forEach(([key, value]) => {
                        element.style[key] = value;
                    });
                }
            });

            this.actionHistory.push({
                action: 'modify',
                selector: action.selector,
                timestamp: Date.now(),
                description: action.description
            });

            return {
                success: true,
                message: action.description || `Modified ${elements.length} element(s)`,
                modifiedCount: elements.length
            };
        }

        addStyles(action) {
            const styleId = action.id || `ai-agent-styles-${Date.now()}`;
            let styleElement = document.getElementById(styleId);

            if (!styleElement) {
                styleElement = document.createElement('style');
                styleElement.id = styleId;
                document.head.appendChild(styleElement);
            }

            styleElement.textContent += '\n' + action.css;

            this.actionHistory.push({
                action: 'styles',
                css: action.css,
                styleId,
                timestamp: Date.now(),
                description: action.description
            });

            return {
                success: true,
                message: action.description || 'Added CSS styles'
            };
        }

        getActionHistory() {
            return this.actionHistory.slice(); // Return copy
        }

        clearHistory() {
            this.actionHistory = [];
        }
    }

    // Gemini API Client
    class GeminiClient {
        constructor() {
            this.apiKey = GM_getValue(CONFIG.storage.apiKey, '');
            this.selectedModel = GM_getValue(CONFIG.storage.selectedModel, CONFIG.defaultModel);
            this.isInitialized = false;
            this.functionOrchestrator = new FunctionOrchestrator();
            // Keep legacy reference for backward compatibility
            this.domManipulator = this.functionOrchestrator;

            // Conversation history management
            this.conversationHistory = this.loadConversationHistory();
            this.conversationSummary = "";
            this.currentDetectedLanguage = 'en';

            // URL browsing state
            this.currentTurnBrowsedURLs = new Set();
            this.currentTurnAccumulatedSummary = "";
            this.currentTurnBrowsingDepth = 0;
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

        // Conversation History Management
        loadConversationHistory() {
            try {
                const stored = GM_getValue(CONFIG.storage.conversationHistory, '[]');
                return JSON.parse(stored);
            } catch (error) {
                console.warn('Failed to load conversation history:', error);
                return [];
            }
        }

        saveConversationHistory() {
            try {
                GM_setValue(CONFIG.storage.conversationHistory, JSON.stringify(this.conversationHistory));
            } catch (error) {
                console.warn('Failed to save conversation history:', error);
            }
        }

        addToConversationHistory(role, content, isInternal = false) {
            this.conversationHistory.push({
                role,
                content,
                timestamp: Date.now(),
                isInternal
            });
            this.saveConversationHistory();
        }

        getRecentConversationHistory(maxPairs = CONVERSATION_CONFIG.maxHistoryPairs) {
            // Filter out internal messages and get recent user/assistant pairs
            const directHistory = this.conversationHistory.filter(msg => !msg.isInternal);
            return directHistory.slice(-maxPairs * 2); // 2 messages per pair
        }

        clearConversationHistory() {
            this.conversationHistory = [];
            this.conversationSummary = "";
            this.saveConversationHistory();
        }

        async manageConversationContext(currentUserQuery) {
            const directHistory = this.getRecentConversationHistory();
            let historyTokens = 0;

            for (const msg of directHistory) {
                historyTokens += utils.estimateTokens(msg.content);
            }

            // If history is too long, summarize older messages
            if (historyTokens > CONVERSATION_CONFIG.maxTokens && this.conversationHistory.length > CONVERSATION_CONFIG.summaryThreshold * 2) {
                await this.summarizeOlderMessages();
            }
        }

        async summarizeOlderMessages() {
            const directHistory = this.conversationHistory.filter(msg => !msg.isInternal);
            if (directHistory.length <= 4) return; // Keep at least 2 pairs

            const messagesToSummarize = directHistory.slice(0, -6); // Keep last 3 pairs unsummarized
            if (messagesToSummarize.length === 0) return;

            const summaryPrompt = `Please provide a concise summary of this conversation history:
${messagesToSummarize.map(msg => `${msg.role}: ${msg.content.substring(0, 500)}`).join('\n')}

Provide a brief summary that captures the key points and context.`;

            try {
                const summary = await this.sendRawMessage(summaryPrompt);
                this.conversationSummary = summary;

                // Remove summarized messages from history
                this.conversationHistory = this.conversationHistory.filter(msg =>
                    msg.isInternal || !messagesToSummarize.includes(msg)
                );
                this.saveConversationHistory();
            } catch (error) {
                console.warn('Failed to summarize conversation history:', error);
            }
        }

        resetTurnBrowsingState() {
            this.currentTurnBrowsedURLs.clear();
            this.currentTurnAccumulatedSummary = "";
            this.currentTurnBrowsingDepth = 0;
        }

        async sendMessage(prompt, context = '') {
            if (!this.apiKey) {
                throw new Error('API key not configured. Please add your Gemini API key in settings.');
            }

            const modelInfo = CONFIG.models[this.selectedModel];
            if (!modelInfo) {
                throw new Error(`Unknown model: ${this.selectedModel}`);
            }

            // Build conversation context
            let conversationContext = '';
            if (this.conversationSummary) {
                conversationContext += `Previous conversation summary: ${this.conversationSummary}\n\n`;
            }

            const recentHistory = this.getRecentConversationHistory();
            if (recentHistory.length > 0) {
                conversationContext += 'Recent conversation:\n';
                conversationContext += recentHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n') + '\n\n';
            }

            const fullPrompt = context ?
                `${conversationContext}${context}\n\nUser query: ${prompt}` :
                `${conversationContext}User query: ${prompt}`;

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

        async sendRawMessage(prompt) {
            // For internal operations like summarization, without conversation context
            if (!this.apiKey) {
                throw new Error('API key not configured.');
            }

            const modelInfo = CONFIG.models[this.selectedModel];
            if (!modelInfo) {
                throw new Error(`Unknown model: ${this.selectedModel}`);
            }

            return new Promise((resolve, reject) => {
                const requestData = this.buildRequestData(modelInfo, prompt);
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
                    onerror: () => reject(new Error('Network error occurred')),
                    ontimeout: () => reject(new Error('Request timed out')),
                    timeout: 30000
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
            // Use low temperature for function calling and instruction following
            // This makes the AI more deterministic and better at following exact instructions
            const isInstructionFollowing = prompt.includes('[FUNCTION_CALL]') ||
                prompt.includes('executeActions') ||
                prompt.includes('browseUrl') ||
                prompt.includes('createElement') ||
                prompt.includes('modifyElement') ||
                prompt.includes('removeElement') ||
                prompt.includes('addStyles') ||
                prompt.includes('analyzeContent') ||
                prompt.includes('You have access to the following browser functions:');

            const temperature = isInstructionFollowing ? 0.1 : 0.3;

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
                            temperature: temperature,
                            topK: 40,
                            topP: 0.8,
                            maxOutputTokens: 8000 // Increased for more comprehensive responses
                        }
                    };

                case 'image':
                    return {
                        prompt: prompt,
                        generationConfig: {
                            temperature: temperature,
                            seed: Math.floor(Math.random() * 1000000)
                        }
                    };

                case 'video':
                    return {
                        prompt: prompt,
                        generationConfig: {
                            temperature: temperature
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
            let data;
            try {
                data = JSON.parse(responseText);
            } catch (parseError) {
                throw new Error(`Failed to parse JSON response: ${parseError.message}`);
            }

            switch (modelInfo.type) {
                case 'text':
                case 'text-image':
                case 'audio':
                case 'tts':
                    // Enhanced response validation
                    if (!data.candidates || !Array.isArray(data.candidates) || data.candidates.length === 0) {
                        console.error('Invalid API response structure:', data);
                        throw new Error('No candidates found in API response');
                    }

                    const candidate = data.candidates[0];
                    if (!candidate.content) {
                        console.error('No content in candidate:', candidate);
                        throw new Error('No content found in API response');
                    }

                    const parts = candidate.content.parts;
                    if (!parts || !Array.isArray(parts)) {
                        console.error('Parts is not an array:', parts);
                        throw new Error('Invalid parts structure in API response');
                    }

                    let result = '';
                    for (const part of parts) {
                        if (part.text) {
                            result += part.text;
                        } else if (part.inlineData) {
                            // Handle inline data (images, audio)
                            const mimeType = part.inlineData.mimeType;
                            const dataContent = part.inlineData.data;

                            if (mimeType.startsWith('image/')) {
                                result += `\n\n🖼️ **Generated Image:**\n![Generated Image](data:${mimeType};base64,${dataContent})\n\n`;
                            } else if (mimeType.startsWith('audio/')) {
                                result += `\n\n🎵 **Generated Audio:**\n<audio controls><source src="data:${mimeType};base64,${dataContent}" type="${mimeType}"></audio>\n\n`;
                            }
                        }
                    }

                    return result || 'Response generated successfully but no text content received.';


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
            this.floatingBtn.textContent = '✨';
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

            // Add CSS first
            const style = document.createElement('style');
            style.textContent = `
                .ai-agent-scrollable::-webkit-scrollbar { width: 8px; }
                .ai-agent-scrollable::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.05); border-radius: 4px; }
                .ai-agent-scrollable::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #3f83f8 0%, #1a56db 100%); border-radius: 4px; border: 1px solid rgba(255, 255, 255, 0.1); }
                .ai-agent-scrollable::-webkit-scrollbar-thumb:hover { background: linear-gradient(180deg, #2563eb 0%, #1d4ed8 100%); }
                .ai-agent-scrollable { scrollbar-width: thin; scrollbar-color: #3f83f8 rgba(255, 255, 255, 0.05); }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
            `;
            document.head.appendChild(style);

            // Build HTML content
            modalContent.innerHTML = `
                <div style="padding: 28px 32px 24px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); flex-shrink: 0;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <h2 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 600; letter-spacing: -0.5px;">AI Browsing Agent</h2>
                            <p style="margin: 6px 0 0; color: #a0aec0; font-size: 14px; opacity: 0.8;">Powered by Gemini API</p>
                        </div>
                        <button id="ai-agent-close" style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); color: #a0aec0; font-size: 20px; cursor: pointer; padding: 8px; border-radius: 8px; transition: all 0.2s ease; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;">&times;</button>
                    </div>
                </div>
                
                <div style="flex: 1; display: flex; flex-direction: column; overflow: hidden; padding: 24px 32px; gap: 20px;">
                    <div id="ai-agent-chat" style="flex: 1; min-height: 240px; overflow-y: auto; padding-right: 8px; margin-right: -8px;" class="ai-agent-scrollable"></div>
                    
                    <div style="flex-shrink: 0; border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 20px; margin-top: 8px;">
                        <div style="display: flex; gap: 12px; margin-bottom: 16px;">
                            <textarea id="ai-agent-input" placeholder="Ask me anything about this page..." style="flex: 1; padding: 14px 16px; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 12px; color: #ffffff; font-size: 14px; outline: none; transition: all 0.2s ease; font-family: inherit; resize: none; min-height: 46px; max-height: 200px; overflow-y: hidden; line-height: 1.4;"></textarea>
                            <button id="ai-agent-send" style="padding: 14px 24px; background: linear-gradient(135deg, #3f83f8 0%, #2563eb 50%, #1d4ed8 100%); border: none; border-radius: 12px; color: white; cursor: pointer; font-size: 14px; font-weight: 600; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 4px 16px rgba(63, 131, 248, 0.3), 0 2px 8px rgba(63, 131, 248, 0.1); border: 1px solid rgba(255, 255, 255, 0.1); text-transform: uppercase; letter-spacing: 0.5px; min-width: 80px;">Send</button>
                        </div>
                        
                        <div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;">
                            <button class="quick-action" data-action="summarize" title="Analyze and summarize the main content, key points, and topics of this page" style="padding: 8px 16px; background: rgba(63, 131, 248, 0.08); border: 1px solid rgba(63, 131, 248, 0.2); border-radius: 8px; color: #3f83f8; cursor: pointer; font-size: 13px; font-weight: 500; transition: all 0.2s ease; display: flex; align-items: center; gap: 6px;">📋 Summarize</button>
                            <button class="quick-action" data-action="clean" title="Remove ads, popups, and distracting elements to clean up the page layout" style="padding: 8px 16px; background: rgba(49, 196, 141, 0.08); border: 1px solid rgba(49, 196, 141, 0.2); border-radius: 8px; color: #31c48d; cursor: pointer; font-size: 13px; font-weight: 500; transition: all 0.2s ease; display: flex; align-items: center; gap: 6px;">🧹 Clean Page</button>
                            <button class="quick-action" data-action="dom-demo" title="Demonstrate AI's ability to modify web pages by adding a sample button" style="padding: 8px 16px; background: rgba(168, 85, 247, 0.08); border: 1px solid rgba(168, 85, 247, 0.2); border-radius: 8px; color: #a855f7; cursor: pointer; font-size: 13px; font-weight: 500; transition: all 0.2s ease; display: flex; align-items: center; gap: 6px;">🔧 DOM Demo</button>
                            <button class="quick-action" data-action="clear-history" title="Clear conversation history and start fresh" style="padding: 8px 16px; background: rgba(248, 113, 113, 0.08); border: 1px solid rgba(248, 113, 113, 0.2); border-radius: 8px; color: #f87171; cursor: pointer; font-size: 13px; font-weight: 500; transition: all 0.2s ease; display: flex; align-items: center; gap: 6px;">🗑️ Clear History</button>
                            <button class="quick-action" data-action="settings" title="Configure your Gemini API key, model selection, and other preferences" style="padding: 8px 16px; background: rgba(246, 173, 85, 0.08); border: 1px solid rgba(246, 173, 85, 0.2); border-radius: 8px; color: #f6ad55; cursor: pointer; font-size: 13px; font-weight: 500; transition: all 0.2s ease; display: flex; align-items: center; gap: 6px;">⚙️ Settings</button>
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

        // Auto-resize textarea function (like v.chat)
        resizeTextarea() {
            const textarea = this.modal.querySelector('#ai-agent-input');
            if (!textarea) return;

            // Reset height to auto to get correct scrollHeight
            textarea.style.height = 'auto';
            let newHeight = textarea.scrollHeight;

            // Apply max/min height constraints
            if (newHeight > 200) {
                newHeight = 200;
                textarea.style.overflowY = 'auto';
            } else {
                textarea.style.overflowY = 'hidden';
            }

            textarea.style.height = `${Math.max(46, newHeight)}px`;
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

            // Auto-resize textarea input
            const textarea = this.modal.querySelector('#ai-agent-input');
            if (textarea) {
                textarea.addEventListener('input', () => {
                    this.resizeTextarea();
                });

                textarea.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        this.sendMessage();
                    }
                });

                // Initial resize
                this.resizeTextarea();
            }

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
                const historyCount = geminiClient.conversationHistory.length;
                statusText = `✅ Ready with intelligent browsing & conversation memory`;

                const historyBadge = historyCount > 0 ? `
                    <div style="
                        display: inline-flex;
                        align-items: center;
                        gap: 6px;
                        background: rgba(49, 196, 141, 0.1);
                        border: 1px solid rgba(49, 196, 141, 0.2);
                        border-radius: 8px;
                        padding: 6px 12px;
                        margin-top: 8px;
                        margin-right: 8px;
                        font-size: 12px;
                        color: #31c48d;
                        font-weight: 500;
                    ">
                        💬 ${historyCount} message${historyCount === 1 ? '' : 's'} in history
                    </div>` : '';

                modelBadge = `
                    ${historyBadge}
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

            utils.safeSetHTML(chat, `
                <div style="color: #a0aec0; font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
                    <div style="margin-bottom: 16px;">
                        <h3 style="margin: 0; color: #ffffff; font-size: 18px; font-weight: 600;">Welcome to AI Browsing Agent!</h3>
                    </div>
                    <div style="margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                        <span>${statusText}</span>
                    </div>
                    ${modelBadge}
                    <div style="font-size: 13px; color: #64748b; margin-top: 16px; line-height: 1.5;">
                        I'm your intelligent browsing assistant with conversation memory! I can analyze pages, browse URLs intelligently, summarize content from multiple sources, and remember our conversation context. Try asking me about this page, give me URLs to analyze, or use the quick actions below.
                    </div>
                </div>
            `);
        }

        async handleQuickAction(action) {
            switch (action) {
                case 'summarize':
                    await this.processMessage('Please provide a comprehensive summary of this page, including key points and main topics.');
                    break;
                case 'clean':
                    this.performCleanup();
                    break;
                case 'dom-demo':
                    await this.processMessage('Add a purple button that says "AI Created!" in the top right corner of the page with nice styling');
                    break;
                case 'clear-history':
                    this.clearConversationHistory();
                    break;
                case 'settings':
                    this.showSettings();
                    break;
            }
        }

        clearConversationHistory() {
            const geminiClient = STATE.geminiClient;
            geminiClient.clearConversationHistory();

            // Clear chat UI
            const chat = this.modal.querySelector('#ai-agent-chat');
            chat.innerHTML = '';

            // Show confirmation message
            this.addChatMessage('system', '🧹 Conversation history cleared. Starting fresh!', false, 'normal');

            // Show welcome message again
            setTimeout(() => {
                this.showWelcomeMessage();
            }, 1000);
        }

        async sendMessage() {
            const input = this.modal.querySelector('#ai-agent-input');
            const message = input.value.trim();
            if (!message) return;

            input.value = '';
            this.resizeTextarea(); // Reset textarea size after clearing
            await this.processMessage(message);
        }

        async processMessage(message) {
            if (!message.trim()) return;

            const geminiClient = STATE.geminiClient;

            // Add user message to chat and conversation history
            this.addChatMessage('user', message);
            geminiClient.addToConversationHistory('user', message);

            try {
                // Manage conversation context
                await geminiClient.manageConversationContext(message);

                // Check for URLs and use intelligent browsing flow
                const orchestrator = geminiClient.functionOrchestrator;
                const hasUrls = orchestrator.extractURLs(message).length > 0;

                if (hasUrls) {
                    await this.intelligentBrowsingOrchestration(message);
                } else {
                    await this.standardOrchestration(message);
                }

            } catch (error) {
                this.addChatMessage('assistant', `❌ Error: ${error.message}`, false, 'error');
                console.error('Process message error:', error);
            }
        }

        async intelligentBrowsingOrchestration(message) {
            const geminiClient = STATE.geminiClient;
            const orchestrator = geminiClient.functionOrchestrator;

            // Show browsing status
            const browsingId = this.addChatMessage('assistant', '🌐 Intelligently browsing URLs...', true);

            try {
                // Intelligent URL browsing
                await orchestrator.intelligentBrowsingFlow(message);
                this.removeChatMessage(browsingId);

                // Generate final response with browsed content
                await this.generateBrowsingResponse(message);
            } catch (error) {
                this.removeChatMessage(browsingId);
                this.addChatMessage('assistant', `❌ Browsing error: ${error.message}`, false, 'error');
                console.error('Browsing orchestration error:', error);
            }
        }

        async generateBrowsingResponse(userMessage) {
            const geminiClient = STATE.geminiClient;
            const content = utils.extractPageContent();

            // Build enhanced context with browsed content
            const systemPrompt = geminiClient.functionOrchestrator.generateSystemPrompt(content);
            const browsingContext = geminiClient.currentTurnAccumulatedSummary ?
                `\n\nBROWSED CONTENT SUMMARY:\n${geminiClient.currentTurnAccumulatedSummary}\n\nBrowsed URLs: ${Array.from(geminiClient.currentTurnBrowsedURLs).join(', ')}` : '';

            const finalPrompt = `${systemPrompt}${browsingContext}

Please provide a comprehensive response to the user's query based on the current page and any browsed content. Focus on:
1. Directly answering the user's question
2. Integrating information from all browsed sources
3. Providing actionable insights
4. Being clear and concise

Remember: You are analyzing content from multiple sources. Make sure to synthesize the information effectively.`;

            try {
                const response = await geminiClient.sendMessage(userMessage, finalPrompt);
                this.addChatMessage('assistant', response);
                geminiClient.addToConversationHistory('assistant', response);
            } catch (error) {
                this.addChatMessage('assistant', `❌ Failed to generate response: ${error.message}`, false, 'error');
                console.error('Response generation error:', error);
            }
        }

        async standardOrchestration(message) {
            // Use existing orchestration logic but with conversation history
            await this.orchestrateResponse(message);

            // Add assistant response to conversation history
            const lastAssistantMessage = Array.from(this.modal.querySelectorAll('.ai-agent-message.assistant')).pop();
            if (lastAssistantMessage) {
                const responseText = lastAssistantMessage.textContent || '';
                if (responseText && !responseText.includes('❌')) {
                    STATE.geminiClient.addToConversationHistory('assistant', responseText);
                }
            }
        }

        async orchestrateResponse(userMessage, continuationContext = null, maxIterations = 3) {
            const content = utils.extractPageContent();
            const geminiClient = STATE.geminiClient;
            const orchestrator = geminiClient.functionOrchestrator;

            // Analyze user intent for better orchestration
            const userIntent = this.analyzeUserIntent(userMessage);

            let currentIteration = 0;
            let conversationContext = continuationContext || '';
            let lastDiscoveryResult = null;

            while (currentIteration < maxIterations) {
                currentIteration++;

                // Add loading message for this iteration
                const loadingId = this.addChatMessage('assistant',
                    currentIteration === 1 ? '🤔 Analyzing your request...' :
                        `🔄 Planning next steps (${currentIteration}/${maxIterations})...`, true);

                try {
                    // Check for URLs in the message and browse them first (only on first iteration)
                    if (currentIteration === 1) {
                        const urls = orchestrator.extractURLs(userMessage);
                        if (urls.length > 0) {
                            this.removeChatMessage(loadingId);
                            const browsingId = this.addChatMessage('assistant', `🌐 Browsing ${urls.length} URL(s)...`, true);

                            for (const url of urls) {
                                try {
                                    const browseResult = await orchestrator.browseUrl({ url, description: `Browsing ${url}` });
                                    if (browseResult.success && browseResult.content) {
                                        conversationContext += `\n\nContent from ${url}:\n${browseResult.content.slice(0, 1500)}...`;
                                    }
                                } catch (error) {
                                    console.warn('Failed to browse URL:', url, error);
                                }
                            }
                            this.removeChatMessage(browsingId);
                        }
                    }

                    // Build enhanced context for this iteration
                    const systemPrompt = orchestrator.generateSystemPrompt(content);

                    let iterationContext = `${systemPrompt}

ORCHESTRATION CONTEXT:
- Current iteration: ${currentIteration}/${maxIterations}
- User's original request: "${userMessage}"
- This is ${currentIteration === 1 ? 'the initial analysis' : 'a follow-up to continue the task'}

INTENT ANALYSIS:
- Detected action: ${userIntent.action}
- Target: ${userIntent.target || 'unspecified'}
- Priority: ${userIntent.priority}
- Suggested workflow: ${userIntent.suggestedWorkflow.join(' → ')}

${conversationContext}

${lastDiscoveryResult ? `
PREVIOUS DISCOVERY RESULTS:
${JSON.stringify(lastDiscoveryResult, null, 2)}

Now use these discovered elements to complete the user's request. You should:
1. Select appropriate elements from the discovery results
2. Use modifyElement/createElement/removeElement to make the requested changes
3. Provide clear feedback about what was accomplished
` : ''}

Page content: ${content.text.slice(0, 8000)}...

SMART TASK COMPLETION:
- If user wants to "edit/modify/change" something, FIRST discover elements, THEN modify them
- If you discover elements but don't modify them, you haven't completed the task
- Always follow through with the actual changes the user requested
- Be proactive and complete the full workflow automatically`;

                    // Get AI response for this iteration
                    const aiResponse = await geminiClient.sendMessage(
                        currentIteration === 1 ? userMessage : "Continue with the task based on previous results",
                        iterationContext
                    );

                    // Extract and execute function calls
                    const functionCalls = orchestrator.extractFunctionCalls(aiResponse);
                    const cleanResponse = orchestrator.removeFunctionCallsFromText(aiResponse);

                    // Display response
                    this.removeChatMessage(loadingId);
                    if (cleanResponse.trim()) {
                        this.addChatMessage('assistant', cleanResponse);
                    }

                    // Execute function calls with smart chaining
                    if (functionCalls.length > 0) {
                        const executingId = this.addChatMessage('assistant', `⚡ Executing ${functionCalls.length} function(s)...`, true);

                        let hasDiscovery = false;
                        let hasModification = false;
                        let discoveryResults = null;
                        let taskCompleted = false;

                        for (const functionCall of functionCalls) {
                            try {
                                const result = await orchestrator.executeFunctionCall(functionCall);

                                // Track what types of operations were performed
                                if (functionCall.function === 'discoverElements') {
                                    hasDiscovery = true;
                                    discoveryResults = result.discovery;
                                    lastDiscoveryResult = result.discovery;
                                } else if (['modifyElement', 'createElement', 'removeElement', 'addStyles'].includes(functionCall.function)) {
                                    hasModification = true;
                                    if (result.success) taskCompleted = true;
                                }

                                // Add result feedback
                                if (result.success) {
                                    this.addChatMessage('assistant', `✅ ${result.result}`, false, 'normal');
                                    conversationContext += `\nFunction ${functionCall.function} succeeded: ${result.result}`;
                                } else {
                                    this.addChatMessage('assistant', `❌ ${functionCall.function} failed: ${result.error}`, false, 'error');
                                    if (result.suggestions) {
                                        this.addChatMessage('assistant', `💡 Suggestions: ${JSON.stringify(result.suggestions)}`, false, 'normal');
                                    }
                                }
                            } catch (error) {
                                console.error('Function execution error:', error);
                                this.addChatMessage('assistant', `❌ Error executing ${functionCall.function}: ${error.message}`, false, 'error');
                            }
                        }

                        this.removeChatMessage(executingId);

                        // Intelligent task completion analysis
                        const needsContinuation = this.analyzeTaskCompletion(userMessage, hasDiscovery, hasModification, discoveryResults, taskCompleted);

                        if (taskCompleted && !needsContinuation) {
                            this.addChatMessage('assistant', '🎉 Task completed successfully!', false, 'normal');
                            break; // Task is done
                        } else if (needsContinuation && currentIteration < maxIterations) {
                            this.addChatMessage('assistant', `🔄 Continuing to complete your request...`, false, 'normal');
                            continue; // Continue to next iteration
                        } else {
                            this.addChatMessage('assistant', `🎯 Completed ${functionCalls.length} action(s). Let me know if you need anything else!`, false, 'normal');
                            break; // Stop here
                        }
                    } else {
                        // No function calls, we're done
                        break;
                    }

                } catch (error) {
                    this.removeChatMessage(loadingId);
                    this.addChatMessage('assistant', `❌ Iteration ${currentIteration} failed: ${error.message}`, false, 'error');
                    break;
                }
            }

            if (currentIteration >= maxIterations) {
                this.addChatMessage('assistant', '⏱️ Reached maximum iterations. Task may require manual completion.', false, 'normal');
            }
        }

        analyzeTaskCompletion(userMessage, hasDiscovery, hasModification, discoveryResults, taskCompleted) {
            // Analyze if the task needs continuation based on user intent and current progress

            const modificationKeywords = ['edit', 'change', 'modify', 'update', 'replace', 'add', 'remove', 'delete'];
            const userWantsModification = modificationKeywords.some(keyword =>
                userMessage.toLowerCase().includes(keyword)
            );

            // If user wanted modification but we only discovered elements, continue
            if (userWantsModification && hasDiscovery && !hasModification) {
                return true;
            }

            // If discovery found elements but we haven't used them yet, continue
            if (hasDiscovery && discoveryResults && discoveryResults.elements.length > 0 && !hasModification) {
                return true;
            }

            // If modification failed but we have alternative suggestions, continue
            if (hasModification && !taskCompleted && discoveryResults) {
                return true;
            }

            return false;
        }

        analyzeUserIntent(userMessage) {
            // Analyze user intent to provide better context to AI
            const intent = {
                action: 'unknown',
                target: null,
                priority: 'normal',
                suggestedWorkflow: []
            };

            const message = userMessage.toLowerCase();

            // Action detection
            if (message.includes('edit') || message.includes('change') || message.includes('modify') || message.includes('update')) {
                intent.action = 'modify';
                intent.suggestedWorkflow = ['discoverElements', 'modifyElement'];
            } else if (message.includes('add') || message.includes('create') || message.includes('insert')) {
                intent.action = 'create';
                intent.suggestedWorkflow = ['discoverElements', 'createElement'];
            } else if (message.includes('remove') || message.includes('delete') || message.includes('hide')) {
                intent.action = 'remove';
                intent.suggestedWorkflow = ['discoverElements', 'removeElement'];
            } else if (message.includes('style') || message.includes('color') || message.includes('css')) {
                intent.action = 'style';
                intent.suggestedWorkflow = ['discoverElements', 'addStyles'];
            } else if (message.includes('clean') || message.includes('remove ads')) {
                intent.action = 'clean';
                intent.suggestedWorkflow = ['discoverElements', 'removeElement'];
            } else if (message.includes('analyze') || message.includes('summarize') || message.includes('what')) {
                intent.action = 'analyze';
                intent.suggestedWorkflow = ['analyzeContent'];
            }

            // Target detection
            if (message.includes('title') || message.includes('heading') || message.includes('h1')) {
                intent.target = 'title/heading';
            } else if (message.includes('content') || message.includes('article') || message.includes('main')) {
                intent.target = 'content';
            } else if (message.includes('nav') || message.includes('menu')) {
                intent.target = 'navigation';
            } else if (message.includes('button') || message.includes('link')) {
                intent.target = 'interactive';
            }

            // Priority detection
            if (message.includes('important') || message.includes('urgent') || message.includes('immediately')) {
                intent.priority = 'high';
            }

            return intent;
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

            utils.safeSetHTML(messageDiv, this.formatMessage(content));
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
                            ${this.generateModelOptions(geminiClient.model)}
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

            // Add dropdown styles to document head
            if (!document.querySelector('#ai-agent-dropdown-styles')) {
                const style = document.createElement('style');
                style.id = 'ai-agent-dropdown-styles';
                style.textContent = `
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
                `;
                document.head.appendChild(style);
            }

            utils.safeSetHTML(chat, settingsHtml);
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
            Object.entries(CONFIG.models).forEach(([modelKey, model]) => {
                const category = model.category || 'Primary';
                categories[category].push({
                    value: modelKey,
                    name: model.name,
                    description: model.description,
                    category: model.category,
                    type: model.type,
                    endpoint: model.endpoint
                });
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

                utils.safeSetHTML(modelInfoDiv, `
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
                `);

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