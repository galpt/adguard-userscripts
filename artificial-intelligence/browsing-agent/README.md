# AI Browsing Agent (Gemini-Powered)

A sophisticated userscript that transforms your browsing experience with Google Gemini AI integration. Features a **Windows 11-inspired dark theme design**, real-time content analysis, intelligent DOM manipulation, and seamless authentication.

## ✨ Key Features

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

### 🧠 **Intelligent Content Analysis & Function Calling**
- **Function-Calling System**: AI can automatically execute browser functions through structured responses
- **Automatic URL Browsing**: AI detects and fetches content from URLs mentioned in conversations
- **Page Summarization**: Instant analysis of current page content
- **Context-Aware Responses**: AI understands the website you're viewing
- **Multimedia Generation**: Create images with Imagen, videos with Veo, audio with TTS
- **Rich Content Display**: Properly formatted text, embedded images/videos/audio
- **Embedding Vectors**: Generate text embeddings for semantic search
- **Real-time Stats**: Live word count, link analysis, and image detection
- **Smart Recommendations**: Personalized suggestions based on page content
- **Cross-Site Analysis**: Browse and analyze multiple websites in one conversation

### 🛠️ **Advanced DOM Manipulation**
- **Real-time DOM Control**: AI can directly create, modify, and remove webpage elements
- **Intelligent Element Creation**: Ask AI to add buttons, divs, text, or any HTML element
- **Style Manipulation**: Change colors, fonts, sizes, and positioning on-the-fly
- **Smart Element Targeting**: AI understands page structure to place elements correctly
- **Ad Blocking**: Removes advertisements and sponsored content
- **Popup Elimination**: Clears intrusive popups and overlays
- **Cookie Notice Removal**: Hides GDPR and cookie consent banners
- **Social Widget Cleanup**: Removes social sharing buttons and widgets
- **Newsletter Signup Removal**: Eliminates email capture forms
- **Smart Restore**: One-click restoration of all hidden elements
- **Action History**: Track all DOM changes with ability to review and undo

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
1. **Get API Key**: Visit [Google AI Studio](https://makersuite.google.com/app/apikey) to get your free Gemini API key
2. **Activate Agent**: Look for the sparkle (✨) button in the bottom-right corner of any webpage
3. **Configure Settings**: Click the floating button → Settings → Enter your API key and select your preferred model
4. **Start Chatting**: Begin asking questions about any webpage content

### Interface Overview
- **Status Panel**: Shows page statistics and AI service connection status
- **Chat Area**: Interactive conversation with the AI about the current page
- **Input Field**: Type questions or commands for the AI assistant

### Common Commands

#### Content Analysis
- **"Summarize this page"** - Get an intelligent summary of the current content
- **"What are the main points?"** - Extract key information from the page
- **"Help me understand this"** - Get explanations of complex content

#### DOM Manipulation
- **"Add a red button that says Click me"** - Create custom buttons with specific styling
- **"Remove all ads from this page"** - Eliminate advertisement elements
- **"Change the background color to blue"** - Modify page styling
- **"Hide all images on this page"** - Selectively hide content types
- **"Add a text box next to the search button"** - Create and position new elements

#### Page Cleanup
- **"Clean up this page"** - Remove ads, popups, and distracting elements
- **"Restore page"** - Bring back any hidden elements

#### URL Browsing
- **"Summarize https://example.com"** - Automatically browse and analyze external URLs
- **"Compare this page with https://competitor.com"** - Cross-site content analysis
- **"What's the latest on https://news-site.com?"** - Real-time web content fetching

## 🔧 Function Calling System

### How It Works
The AI can execute browser functions by including structured JSON commands in its responses. This enables seamless integration between conversation and action.

### Available Functions
1. **browseUrl** - Fetch and analyze content from external URLs
2. **createElement** - Create new HTML elements with styling and positioning
3. **removeElement** - Remove elements using CSS selectors
4. **modifyElement** - Modify existing elements (text, styles, attributes)
5. **addStyles** - Inject custom CSS into the page
6. **analyzeContent** - Perform deep content analysis

### Example Function Call
When you ask "Add a blue button next to the search box", the AI responds with:

```
I'll add a blue button next to the search box for you.

[FUNCTION_CALL]
{"function": "createElement", "element": "button", "text": "Click me", "styles": {"backgroundColor": "blue", "color": "white", "padding": "10px"}, "target": "input[type='search']", "position": "after", "description": "Creating blue button next to search box"}
[/FUNCTION_CALL]

The button has been added successfully!
```

The function call is automatically detected and executed, then the AI receives feedback about the result.

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
  - Accent Color: `#0078d4` (Windows blue)
  - Text: `#ffffff` (Pure white) with `#a0aec0` (Light gray) for secondary text

- **Smooth Interactions**: Gentle animations and transitions
- **Rounded Geometry**: Modern 8px and 12px border radius
- **Backdrop Effects**: Subtle blur effects for depth

### Visual Hierarchy
- **Typography**: Uses system fonts (Segoe UI Variable on Windows)
- **Spacing**: Consistent 8px grid system
- **Shadows**: Soft drop shadows for elevation
- **Icons**: Emoji-based icons for universal recognition

## 🛠️ Technical Details

### Architecture
- **Modular Design**: Separate classes for UI, Gemini client, and utilities
- **Event-Driven**: Reactive interface responding to user interactions
- **Error Handling**: Comprehensive error management with user-friendly messages
- **Performance Optimized**: Minimal resource usage and fast response times

### Gemini Integration
```javascript
class GeminiClient {
    // Real web API integration
    // Session management
    // Token extraction
    // Response parsing
}
```

### DOM Manipulation
```javascript
class UIManager {
    // Element hiding/showing
    // Style preservation
    // Restore functionality
    // Visual feedback
}
```

## 🔄 Updates & Maintenance

### Auto-Updates
The userscript automatically checks for updates from the GitHub repository. Manual updates can be triggered through your userscript manager.

### Version History
- **v4.0.0**: 🚀 Complete orchestration overhaul - AI now has function-calling capabilities, automatic URL browsing, intelligent action execution, and seamless integration with browser functions
- **v3.3.0**: 🛠️ Major DOM manipulation overhaul - AI can now directly create, modify, and remove webpage elements in real-time with intelligent targeting
- **v3.2.3**: 🔧 Fixed API key URL, enhanced Send button styling, improved model selection with visual feedback and proper dark theme
- **v3.2.2**: 🎨 Major UI overhaul - improved spacing, custom scrollbars like v.recipes, better typography, enhanced animations
- **v3.2.1**: 🔄 Updated to Gemma 3 models (deprecated Gemma 2), includes 3n E2B/E4B and 3 series variants
- **v3.2.0**: 🚀 Comprehensive AI model ecosystem (25+ models), Imagen/Veo support, multimedia handling, enhanced response formatting
- **v3.1.0**: 🆕 Complete model support (18+ models), official API integration, organized model categories
- **v3.0.0**: 🎨 Windows 11 design overhaul, authentication system, bottom-right positioning
- **v2.1.0**: Enhanced DOM manipulation features, cleanup improvements 
- **v2.0.0**: Chat interface implementation, real-time messaging
- **v1.0.0**: Initial release with basic AI integration

### Semantic Versioning
- **Major** (X.0.0): Breaking changes that require user action
- **Minor** (0.X.0): New features and improvements (backward compatible)
- **Patch** (0.0.X): Bug fixes and small improvements

## 🐛 Troubleshooting

### Common Issues

**AI Service Unavailable**
- Verify your API key is correctly entered in Settings
- Check your internet connection
- Try testing the API key using the "Test API" button
- Ensure you haven't exceeded your API quota

**Authentication Errors**
- Double-check your API key from Google AI Studio
- Make sure the API key has proper permissions
- Try generating a new API key if issues persist
- Check if the selected model is available in your region

**UI Not Appearing**
- Check if other userscripts are conflicting
- Ensure the script is enabled in your userscript manager
- Try disabling ad blockers temporarily

**Performance Issues**
- Close unnecessary browser tabs
- Check available system memory
- Update your userscript manager

### Debug Mode
Enable debug logging by setting `CONFIG.debug = true` in the script for detailed console output.

## 📞 Support

### Getting Help
- **Issues**: Report bugs on [GitHub Issues](https://github.com/galpt/adguard-userscripts/issues)
- **Discussions**: Community support and feature requests
- **Updates**: Follow the repository for the latest improvements

### Contributing
Contributions are welcome! Please feel free to submit pull requests or suggest improvements.

## ⚖️ License

This project is open source and available under standard open source licenses. Please use responsibly and in accordance with Google's Terms of Service.

## 🙏 Acknowledgments

- **Google Gemini**: For providing the AI capabilities
- **HanaokaYuzu/Gemini-API**: Inspiration for authentication approach
- **Microsoft Design**: Windows 11 design principles and Fluent Design
- **Community**: Feedback and feature suggestions

---

**Made with ❤️ for the browsing community**

*Transform your web experience with intelligent AI assistance* 