# AI Browsing Agent (Gemini-Powered) v4.3.0

A sophisticated userscript that transforms your browsing experience with Google Gemini AI integration. Features **intelligent orchestration**, real-time DOM manipulation, multi-turn function calling, and a **Windows 11-inspired dark theme design**.

## ✨ Key Features

### 🧠 **Intelligent Orchestration System (NEW in v4.3.0)**
- **Multi-Turn Function Calling**: Automatically chains operations across multiple AI calls to complete complex tasks
- **Intent Analysis**: Smart detection of user goals (modify, create, remove, analyze) with automatic workflow planning
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
- **Automatic URL Browsing**: AI detects and fetches content from URLs mentioned in conversations
- **Enhanced Page Summarization**: Comprehensive analysis with key topics, statistics, and structured summaries
- **Context-Aware Responses**: AI understands the website you're viewing with deep content analysis
- **Cross-Site Analysis**: Browse and analyze multiple websites in one conversation
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
4. **Start Chatting**: Begin asking questions about any webpage content

### Interface Overview
- **Chat Area**: Interactive conversation with intelligent multi-turn function calling
- **Input Field**: Auto-resizing textarea (like v.chat) with Enter to send, Shift+Enter for new line
- **Quick Actions**: Summarize, Clean Page, DOM Demo, Settings buttons with descriptive tooltips
- **Progress Indicators**: Real-time feedback showing orchestration progress and task completion

### Enhanced Commands (v4.3.0)

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

## 🔧 Enhanced Function Calling System (v4.3.0)

### Orchestration Intelligence
The AI now features sophisticated orchestration logic that automatically chains function calls to complete complex tasks:

1. **Intent Analysis**: Automatically detects what the user wants to accomplish
2. **Workflow Planning**: Determines the optimal sequence of functions to execute
3. **Multi-Turn Execution**: Continues working across multiple AI responses until task completion
4. **Progress Tracking**: Monitors discovery, analysis, and modification phases
5. **Smart Continuation**: Knows when to keep working vs when the task is finished

### Available Functions
1. **discoverElements** - Intelligent page structure analysis with categorized results
2. **browseUrl** - Fetch and analyze content from external URLs
3. **createElement** - Create new HTML elements with styling and positioning
4. **removeElement** - Remove elements using CSS selectors with fallback strategies
5. **modifyElement** - Modify existing elements with intelligent selector fallbacks
6. **addStyles** - Inject custom CSS into the page
7. **analyzeContent** - Comprehensive content analysis with topic extraction

### Orchestration Example
**User**: *"Edit the Wikipedia title and add '(Real-time Demo)' to it"*

**Orchestration Flow**:
```
🧠 Intent Analysis: Action=modify, Target=title/heading
🔍 Iteration 1: Discovering page elements...
✅ Found title element: #firstHeading "Machine learning"
🔄 Continuing to complete your request...
⚡ Iteration 2: Modifying title element...
✅ Modified title to "Machine learning (Real-time Demo)"
🎉 Task completed successfully!
```

### Enhanced Function Call Format
```json
[FUNCTION_CALL]
{
  "function": "discoverElements",
  "focus": "headings",
  "limit": 10,
  "description": "Finding page headings for modification"
}
[/FUNCTION_CALL]

[FUNCTION_CALL]
{
  "function": "modifyElement",
  "selector": "#firstHeading",
  "text": "Machine learning (Real-time Demo)",
  "description": "Adding demo text to Wikipedia title"
}
[/FUNCTION_CALL]
```

## 🛡️ Robust Error Handling & Recovery

### Intelligent Fallback System
- **Automatic Selector Alternatives**: When target elements aren't found, generates intelligent fallbacks
- **Pattern Matching**: If `.mw-notice` fails, tries `[class*="notice"]`, `.notification`, `.alert`
- **Suggestion Engine**: Provides actionable alternatives when elements can't be located
- **Graceful Degradation**: Tasks continue with best-effort approaches rather than hard failures

### Smart Continuation Logic
- **Task Completion Analysis**: Determines if user goals have been met vs need more work
- **Progress-Based Decisions**: Only continues when it makes sense based on current progress
- **Iteration Limits**: Prevents infinite loops with intelligent stopping conditions
- **Context Preservation**: Maintains discovery results and conversation context across attempts

## 🔒 Authentication & Security

### How Authentication Works
1. **Official API Integration**: Uses Google's official Gemini API with proper authentication
2. **API Key Security**: Securely stores your API key locally using GM_setValue
3. **Direct Communication**: All requests go directly to `generativelanguage.googleapis.com`
4. **No Intermediaries**: No third-party services or proxy servers involved

### Privacy Features
- **Local Storage Only**: API keys and settings stored only in your browser
- **No Data Collection**: Zero telemetry or usage tracking
- **Secure Transport**: All API calls use HTTPS encryption
- **User Control**: You can clear settings and data at any time

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

### Enhanced UX (v4.3.0)
- **Auto-Resizing Input**: Textarea grows/shrinks like v.chat (46px-200px)
- **Keyboard Shortcuts**: Enter to send, Shift+Enter for new line
- **Progress Indicators**: Clear feedback during multi-step operations
- **Descriptive Tooltips**: Helpful explanations for all quick action buttons
- **Visual Feedback**: Different colors for success/error/progress states

## 🛠️ Technical Architecture

### Enhanced Orchestration System
```javascript
class UIManager {
    async orchestrateResponse(userMessage, maxIterations = 3) {
        // Intent analysis and workflow planning
        // Multi-turn function execution
        // Progress tracking and smart continuation
        // Task completion validation
    }
    
    analyzeUserIntent(userMessage) {
        // Action detection (modify, create, remove, etc.)
        // Target identification (title, content, navigation)
        // Workflow suggestion generation
    }
}
```

### Advanced DOM Manipulation
```javascript
class FunctionOrchestrator {
    async discoverElements(params) {
        // Intelligent page structure analysis
        // Categorized element discovery
        // Robust selector generation
    }
    
    generateFallbackSelectors(originalSelector) {
        // Smart fallback generation
        // Pattern-based alternatives
        // MediaWiki-specific patterns
    }
}
```

### Smart Error Recovery
```javascript
async suggestAlternativeSelectors(failedSelector) {
    // Analyze page structure for alternatives
    // Context-aware suggestions
    // Actionable recommendations
}
```

## 📈 Version History

### v4.3.0 (Latest) - Intelligent Orchestration
- **Multi-Turn Function Calling**: Automatic task completion across multiple AI iterations
- **Intent Analysis System**: Smart detection of user goals and workflow planning
- **Enhanced DOM Discovery**: Robust element discovery with fallback strategies
- **Task Completion Intelligence**: Knows when to continue vs when tasks are finished
- **Progress Tracking**: Real-time feedback during complex operations
- **Improved Error Recovery**: Actionable suggestions when operations fail

### v4.2.0 - DOM Manipulation Intelligence
- **Element Discovery System**: Intelligent page structure analysis before manipulation
- **Smart Fallback Strategies**: Automatic alternative selector generation
- **Enhanced Error Handling**: Better feedback and recovery options
- **Wikipedia Integration**: MediaWiki-specific selector support

### v4.1.0 - Core Functionality
- **Function Calling System**: Structured AI function execution
- **DOM Manipulation**: Real-time webpage modification capabilities
- **Content Analysis**: Enhanced page summarization and analysis
- **Temperature Optimization**: Dynamic temperature for deterministic function calling

## 🔄 Updates & Maintenance

### Auto-Updates
The userscript automatically updates through your userscript manager when new versions are released.

### Manual Updates
Check the [GitHub repository](https://github.com/galpt/adguard-userscripts) for the latest version and changelog.

## 🤝 Contributing

Found a bug or have a feature request? Please open an issue on the [GitHub repository](https://github.com/galpt/adguard-userscripts/issues).

## 📜 License

This project is licensed under the MIT License - see the repository for details.

---

**Transform your browsing experience with AI-powered intelligence and real-time webpage manipulation!** 🚀✨ 