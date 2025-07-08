# AI Browsing Agent (Gemini-Powered) v4.4.0

A sophisticated userscript that transforms your browsing experience with Google Gemini AI integration. Features **intelligent URL browsing**, **conversation memory**, **multi-source content integration**, real-time DOM manipulation, and a **Windows 11-inspired dark theme design**.

## ✨ Key Features

### 🌐 **Intelligent URL Browsing System (NEW in v4.4.0)**
- **Smart URL Detection**: Automatically detects and browses URLs mentioned in conversations
- **Multi-Source Integration**: Intelligently combines content from multiple websites into coherent summaries
- **AI-Driven Decisions**: Uses AI to determine if additional URLs need to be browsed for complete answers
- **Progressive Summarization**: Builds comprehensive understanding across multiple browsed sources
- **Context-Aware Analysis**: Provides summaries that work regardless of your current page context
- **Adaptive Content Handling**: Manages large content with progressive reduction strategies

### 💬 **Conversation Memory & Context Management (NEW in v4.4.0)**
- **Persistent History**: Remembers conversations across browser sessions and page refreshes
- **Smart Context Management**: Automatically summarizes older messages to maintain relevant context
- **Token Optimization**: Intelligent token estimation and management for optimal performance
- **Cross-Session Continuity**: Maintains conversation flow when switching between models or pages
- **Memory-Aware Responses**: Uses conversation history for more contextual and intelligent answers
- **Clear History Function**: Convenient reset option to start fresh conversations

### 🧠 **Enhanced Orchestration System**
- **Dual-Flow Intelligence**: Separate optimized handling for URL browsing vs. standard DOM manipulation
- **Multi-Turn Function Calling**: Automatically chains operations across multiple AI calls to complete complex tasks
- **Intent Analysis**: Smart detection of user goals (modify, create, remove, analyze, browse) with automatic workflow planning
- **Task Completion Intelligence**: Knows when to continue working vs when the task is truly finished
- **Context Preservation**: Maintains conversation context and previous results across iterations
- **Progress Tracking**: Real-time feedback showing discovery → analysis → modification workflows
- **Automatic Follow-Through**: No more stopping at discovery - completes the full requested action

### 🔍 **Advanced DOM Manipulation with Discovery**
- **Element Discovery System**: Intelligent page structure analysis before manipulation attempts
- **Smart Fallback Strategies**: Automatic alternative selector generation when targets aren't found
- **Wikipedia-Aware**: Includes MediaWiki-specific selectors (`.mw-content-text`, `#firstHeading`, etc.)
- **Robust Error Recovery**: Provides actionable suggestions when elements can't be found
- **Categorized Discovery**: Find headings, content areas, navigation, and interactive elements
- **Selector Generation**: Automatic CSS selector creation based on element hierarchy and attributes

### 🎯 **Real-Time Web Manipulation**
- **Live DOM Control**: AI can directly create, modify, and remove webpage elements in real-time
- **Intelligent Element Targeting**: Discovers available elements before attempting modifications
- **Style Manipulation**: Change colors, fonts, sizes, and positioning on-the-fly
- **Smart Element Creation**: Ask AI to add buttons, divs, text, or any HTML element with proper positioning
- **Wikipedia Integration**: Successfully handles complex sites like Wikipedia with intelligent selectors
- **Action History**: Track all DOM changes with detailed logging and feedback

### 🎨 **Modern UI Design**
- **Windows 11 Dark Theme**: Sleek interface matching modern Windows design principles
- **Fluent Design Elements**: Backdrop blur, rounded corners, and smooth animations
- **Custom Scrollbars**: Beautiful styled scrollbars matching v.recipes design aesthetic
- **Optimized Floating Button**: Compact 46px button with sparkle (✨) icon
- **Responsive Modal**: Beautiful popup interface with generous spacing and proper typography
- **Enhanced Layout**: Improved spacing, better visual hierarchy, and refined animations
- **Conversation Indicators**: Shows message count and browsing capabilities in status display

### 🤖 **Complete Gemini API Integration**
- **Official REST API**: Direct integration with Google's Gemini API endpoints (`generativelanguage.googleapis.com`)
- **Comprehensive Model Support**: All 25+ available models across 9 categories:
  - **Primary Models**: Gemini 2.5 Pro, 2.5 Flash, 2.0 Flash, 1.5 Flash, 1.5 Pro variants
  - **Audio Models**: Native Audio, TTS (Text-to-Speech), Thinking Audio
  - **Multimodal**: Image generation and editing capabilities
  - **Live API**: Real-time voice and video interactions
  - **Image Generation**: Imagen 3.0, Imagen 4.0 Standard, Imagen 4.0 Ultra
  - **Video Generation**: Veo 2.0 for high-quality video creation
  - **Gemma Models**: Open-source alternatives (3n E2B, 3n E4B, 3 1B, 3 4B, 3 12B, 3 27B)
  - **Embedding**: Text similarity and search capabilities
  - **Specialized**: AQA (Attributed Question-Answering)
- **Smart Model Selection**: Organized dropdown with category grouping
- **Secure API Key Storage**: Persistent settings with secure local storage

### 🧪 **Intelligent Content Analysis & Function Calling**
- **Function-Calling System**: AI can automatically execute browser functions through structured responses
- **Intelligent URL Browsing**: AI detects URLs and decides optimal browsing strategy for comprehensive answers
- **Multi-Source Summarization**: Combines information from current page and multiple external URLs
- **Enhanced Page Summarization**: Comprehensive analysis with key topics, statistics, and structured summaries
- **Context-Aware Responses**: AI understands both current page and browsed external content
- **Cross-Site Analysis**: Browse and analyze multiple websites in one conversation with intelligent decision making
- **Real-time Stats**: Live word count, link analysis, and image detection

## 🔧 Installation

### Method 1: Direct Install
1. Ensure you have a userscript manager installed (Tampermonkey, Greasemonkey, or Violentmonkey)
2. Click this link to install: [Install AI Browsing Agent](https://raw.githubusercontent.com/galpt/adguard-userscripts/main/artificial-intelligence/browsing-agent/browsing-agent.user.js)
3. Confirm installation in your userscript manager

### Method 2: Manual Installation
1. Copy the script from `browsing-agent.user.js`
2. Create a new userscript in your manager
3. Paste the code and save

### AdGuard Desktop Integration
The script is designed to work seamlessly with AdGuard Desktop, providing AI-powered browsing enhancement alongside ad blocking.

## 🚀 Usage

### Getting Started
1. **Get API Key**: Visit [Google AI Studio](https://aistudio.google.com/app/apikey) to get your free Gemini API key
2. **Activate Agent**: Look for the sparkle (✨) button in the bottom-right corner of any webpage
3. **Configure Settings**: Click the floating button → Settings → Enter your API key and select your preferred model
4. **Start Chatting**: Begin asking questions about any webpage content or provide URLs to analyze

### Interface Overview
- **Chat Area**: Interactive conversation with intelligent multi-turn function calling and conversation memory
- **Input Field**: Auto-resizing textarea (like v.chat) with Enter to send, Shift+Enter for new line
- **Quick Actions**: Summarize, Clean Page, DOM Demo, Clear History, Settings buttons with descriptive tooltips
- **Progress Indicators**: Real-time feedback showing orchestration progress, URL browsing, and task completion
- **Memory Indicators**: Shows conversation history count and browsing capabilities in status display

### Enhanced Commands (v4.4.0)

#### Intelligent URL Browsing & Analysis
- **"Summarize this Wikipedia article about Time Complexity"** *(while on any unrelated page)* - Automatically browses and summarizes the URL
- **"Compare information from https://example1.com and https://example2.com"** - Browses multiple URLs and provides comparative analysis
- **"What does this research paper say about AI? https://arxiv.org/abs/..."** - Analyzes external content regardless of current page
- **"Please analyze these three articles: [URL1] [URL2] [URL3]"** - Intelligently decides which URLs to browse for comprehensive understanding
- **"Summarize the main points from https://news-site.com while I'm reading this Wikipedia page"** - Multi-source content integration

#### Conversation Memory & Context
- **"What did we discuss about machine learning earlier?"** - References previous conversation history
- **"Based on our previous conversation about APIs..."** - Uses stored context for more intelligent responses
- **"Can you expand on the point you made about neural networks in our last chat?"** - Leverages conversation memory across sessions

#### Intelligent DOM Manipulation
- **"Edit the Wikipedia title and add '(Real-time Manipulation)' to it"** - Automatically discovers page structure and modifies titles
- **"Change the main heading color to blue"** - Finds headings intelligently and applies styling
- **"Add a green button next to the search box"** - Discovers page layout and positions elements correctly
- **"Remove the navigation menu"** - Identifies navigation elements and removes them
- **"Make the article content larger"** - Finds main content areas and adjusts styling

#### Content Analysis
- **"Summarize this Wikipedia article"** - Get comprehensive summaries with key topics and statistics
- **"What are the main points about machine learning?"** - Extract structured information from content
- **"Analyze the page structure"** - Discover available elements for manipulation

#### Advanced Workflows
- **"Clean up this page and then highlight the main content"** - Multi-step operations completed automatically
- **"Find all the headings and make them green"** - Discovery followed by batch modifications
- **"Create a table of contents from the headings"** - Complex DOM manipulation with intelligent structure analysis

## 🌐 Enhanced Intelligent Browsing System (v4.4.0)

### Smart URL Detection & Decision Making
The AI now features sophisticated URL browsing intelligence that works seamlessly regardless of your current page:

1. **Automatic URL Detection**: Instantly identifies URLs in your messages
2. **Content Accumulation**: Builds comprehensive summaries across multiple sources
3. **AI-Driven Decisions**: Determines if additional URLs need browsing for complete answers
4. **Progressive Summarization**: Intelligently combines information from all sources
5. **Context Integration**: Merges current page content with external browsed content

### Browsing Flow Example
**User**: *"Can you summarize this article about neural networks: https://example.com/neural-networks"* *(while browsing Wikipedia about cats)*

**Intelligent Browsing Flow**:
```
🌐 Intelligently browsing URLs...
✅ Browsed https://example.com/neural-networks - Content summarized
🧠 AI Decision: Sufficient information gathered
📋 Generating comprehensive response...
✅ Response: [Detailed neural networks summary with integration of any relevant current page context]
```

### Multi-Source Analysis Example
**User**: *"Compare the information from these two sources: https://source1.com and https://source2.com"*

**Advanced Browsing Flow**:
```
🌐 Intelligently browsing URLs...
✅ Browsed https://source1.com - Added to accumulated summary
🤔 AI evaluating need for additional browsing...
✅ AI Decision: Browsing second URL for comprehensive comparison
✅ Browsed https://source2.com - Integrated with existing analysis
📊 Generating comparative analysis...
✅ Response: [Detailed comparison with insights from both sources]
```

### Conversation Memory Integration
The browsing system now works seamlessly with conversation memory:

- **Context Awareness**: Remembers what you've previously discussed and browsed
- **Reference Integration**: Can refer back to previously browsed content in new conversations
- **Smart Summarization**: Automatically manages conversation length while preserving important browsed content
- **Cross-Session Continuity**: Maintains browsing context across browser sessions

## 🔧 Enhanced Function Calling System

### Orchestration Intelligence
The AI now features sophisticated orchestration logic that automatically chains function calls to complete complex tasks:

1. **Intent Analysis**: Automatically detects what the user wants to accomplish
2. **Workflow Planning**: Determines the optimal sequence of functions to execute
3. **Multi-Turn Execution**: Continues working across multiple AI responses until task completion
4. **Progress Tracking**: Monitors discovery, analysis, and modification phases
5. **Smart Continuation**: Knows when to keep working vs when the task is finished
6. **Dual-Flow Processing**: Separate optimized paths for URL browsing vs DOM manipulation

### Available Functions
1. **intelligentBrowsingFlow** - Smart URL detection and multi-source content integration
2. **discoverElements** - Intelligent page structure analysis with categorized results
3. **browseUrl** - Fetch and analyze content from external URLs with summarization
4. **createElement** - Create new HTML elements with styling and positioning
5. **removeElement** - Remove elements using CSS selectors with fallback strategies
6. **modifyElement** - Modify existing elements with intelligent selector fallbacks
7. **addStyles** - Inject custom CSS into the page
8. **analyzeContent** - Comprehensive content analysis with topic extraction

### Enhanced Browsing Function Format
```json
[FUNCTION_CALL]
{
  "function": "browseUrl",
  "url": "https://example.com/article",
  "description": "Analyzing external article about machine learning"
}
[/FUNCTION_CALL]
```

The AI automatically handles:
- Content fetching and parsing
- Progressive summarization
- Integration with existing context
- Decision making for additional browsing

## 💾 Conversation History & Memory Management

### Persistent Storage
- **Cross-Session Memory**: Conversations persist across browser restarts and page changes
- **Intelligent Summarization**: Older messages automatically summarized to maintain context while managing memory
- **Token Management**: Smart token estimation and context trimming for optimal performance
- **Secure Storage**: Uses browser's secure storage mechanisms (GM_setValue/GM_getValue)

### Memory Features
- **Conversation Continuity**: References previous discussions naturally
- **Context Preservation**: Maintains important information while optimizing for performance
- **Smart Summarization**: AI-powered conversation summarization when history grows large
- **Clear History Option**: Convenient reset button to start fresh when needed

### Memory Integration Example
```
User Session 1: "Tell me about machine learning"
AI Response: [Detailed explanation about ML]

User Session 2 (next day): "What types of neural networks did we discuss?"
AI Response: "Based on our previous conversation about machine learning, we covered..." [References stored conversation history]
```

## 🛡️ Robust Error Handling & Recovery

### Intelligent Fallback System
- **Automatic Selector Alternatives**: When target elements aren't found, generates intelligent fallbacks
- **Pattern Matching**: If `.mw-notice` fails, tries `[class*="notice"]`, `.notification`, `.alert`
- **Suggestion Engine**: Provides actionable alternatives when elements can't be located
- **Graceful Degradation**: Tasks continue with best-effort approaches rather than hard failures
- **Browsing Resilience**: Handles failed URL fetches with graceful error messages

### Smart Continuation Logic
- **Task Completion Analysis**: Determines if user goals have been met vs need more work
- **Progress-Based Decisions**: Only continues when it makes sense based on current progress
- **Iteration Limits**: Prevents infinite loops with intelligent stopping conditions
- **Context Preservation**: Maintains discovery results and conversation context across attempts
- **Browsing Recovery**: Continues with available content when some URLs fail to load

## 🔒 Authentication & Security

### How Authentication Works
1. **Official API Integration**: Uses Google's official Gemini API with proper authentication
2. **API Key Security**: Securely stores your API key locally using GM_setValue
3. **Direct Communication**: All requests go directly to `generativelanguage.googleapis.com`
4. **No Intermediaries**: No third-party services or proxy servers involved

### Privacy Features
- **Local Storage Only**: API keys, settings, and conversation history stored only in your browser
- **No Data Collection**: Zero telemetry or usage tracking
- **Secure Transport**: All API calls use HTTPS encryption
- **User Control**: You can clear settings, history, and data at any time
- **Conversation Privacy**: Your conversation history never leaves your browser

## 🎨 Design Philosophy

### Windows 11 Inspiration
The interface follows Microsoft's Fluent Design principles:

- **Calm Technology**: Subtle, non-intrusive design that fades into the background
- **Consistent Colors**: Dark theme with proper contrast ratios
  - Primary Background: `#1a1b1e` (Deep charcoal)
  - Secondary Background: `#27282b` (Lighter charcoal)
  - Accent Color: `#3f83f8` (Modern blue)
  - Success Color: `#31c48d` (Green)
  - Text: `#ffffff` (Pure white) with `#a0aec0` (Light gray) for secondary text

- **Smooth Interactions**: Gentle animations and transitions with cubic-bezier easing
- **Rounded Geometry**: Modern 8px, 10px, and 12px border radius
- **Backdrop Effects**: Subtle blur effects for depth and modern layering

### Enhanced UX (v4.4.0)
- **Auto-Resizing Input**: Textarea grows/shrinks like v.chat (46px-200px)
- **Keyboard Shortcuts**: Enter to send, Shift+Enter for new line
- **Progress Indicators**: Clear feedback during multi-step operations and URL browsing
- **Descriptive Tooltips**: Helpful explanations for all quick action buttons
- **Visual Feedback**: Different colors for success/error/progress states
- **Memory Indicators**: Shows conversation history count and current capabilities
- **Browsing Status**: Real-time updates during URL analysis and content integration

## 🛠️ Technical Architecture

### Enhanced Conversation Management
```javascript
class GeminiClient {
    // Conversation history with persistent storage
    loadConversationHistory() { /* Load from browser storage */ }
    addToConversationHistory(role, content) { /* Add with timestamp */ }
    manageConversationContext(userQuery) { /* Smart context management */ }
    summarizeOlderMessages() { /* AI-powered summarization */ }
}
```

### Intelligent Browsing System
```javascript
class FunctionOrchestrator {
    async intelligentBrowsingFlow(userMessage) {
        // Smart URL detection and extraction
        // Progressive browsing with AI decision making
        // Content accumulation and summarization
    }
    
    async shouldBrowseAdditionalUrls(userQuery, remainingUrls) {
        // AI-driven decision making for comprehensive analysis
        // Evaluates current content sufficiency
        // Determines optimal browsing strategy
    }
}
```

### Enhanced Orchestration System
```javascript
class UIManager {
    async orchestrateResponse(userMessage, maxIterations = 3) {
        // Intent analysis and workflow planning
        // Multi-turn function execution
        // Progress tracking and smart continuation
        // Task completion validation
    }
    
    async intelligentBrowsingOrchestration(message) {
        // Specialized flow for URL browsing
        // Multi-source content integration
        // Intelligent response generation
    }
}
```

## 🚀 What's New in v4.4.0

### Major Features
- ✅ **Intelligent URL Browsing**: AI can now browse and analyze URLs from any page context
- ✅ **Conversation Memory**: Persistent conversation history across sessions with smart summarization
- ✅ **Multi-Source Integration**: Combines content from multiple URLs and current page intelligently
- ✅ **AI-Driven Browsing Decisions**: Determines optimal browsing strategy for comprehensive answers
- ✅ **Enhanced Context Management**: Better token management and conversation flow
- ✅ **Progressive Summarization**: Builds understanding incrementally across multiple sources

### UI Improvements
- ✅ **Clear History Button**: Convenient conversation reset functionality
- ✅ **Memory Indicators**: Shows conversation history count in status display
- ✅ **Enhanced Status Messages**: Better feedback during browsing and processing
- ✅ **Improved Welcome Message**: Reflects new intelligent capabilities

### Technical Enhancements
- ✅ **Dual-Flow Orchestration**: Optimized separate paths for browsing vs DOM manipulation
- ✅ **Smart Token Management**: Intelligent context preservation and memory optimization
- ✅ **Enhanced Error Handling**: Better recovery from browsing failures and API errors
- ✅ **Cross-Session Continuity**: Seamless conversation flow across browser sessions

## 📈 Performance & Limitations

### Optimizations
- **Smart Token Management**: Automatic context optimization to stay within API limits
- **Progressive Content Reduction**: Intelligent content truncation for large web pages
- **Caching Prevention**: Avoids re-browsing the same URLs within a conversation turn
- **Memory Efficiency**: Conversation summarization to maintain performance over long sessions

### Current Limitations
- **URL Access**: Can only browse publicly accessible URLs (no authentication required)
- **Content Size**: Very large pages may be truncated for processing efficiency
- **Rate Limits**: Subject to Google Gemini API rate limiting
- **Browser Permissions**: Requires userscript manager with appropriate permissions

### Future Enhancements
- **Visual Content Analysis**: Potential integration with Gemini's vision capabilities
- **Advanced Caching**: More sophisticated content caching across sessions
- **Batch Processing**: Parallel URL browsing for faster multi-source analysis
- **Enhanced Memory**: More sophisticated conversation history management

---

**Experience the future of AI-powered browsing with intelligent multi-source analysis, conversation memory, and seamless context integration!** 🚀✨ 