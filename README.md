# Language-Converter
Language Converter (YouTube Auto-Translate Captions)

## Overview

This project is a Chrome extension + local proxy server that intercepts YouTube captions and automatically translates them in real-time using the Google Translation API.

At its current stage, the extension supports basic functionality between English ⇄ Spanish. The goal is to expand support for more languages and improve performance so the extension can eventually scale into a user-ready product.

## How It Works

**Chrome Extension**: Captures YouTube captions from the DOM.

## How it works
- **Extension**: finds captions in the YouTube player, sends them to the proxy, then swaps in the translated text.  
- **Proxy (`server.mjs`)**: a small Node/Express app that forwards text to the Google Translate API and returns the result.  
- **Google Translate API**: does the actual translation.
- Currently configured for English ⇄ Spanish.

📂 Project Structure
LanguageConversion/
├── youtube-auto-translate-extension/
│   ├── background.js
│   ├── content.js
│   ├── manifest.json
│   ├── popup.html
│   ├── popup.js
│   ├── styles.css
│   └── icons/
│
├── youtube-translate-proxy/
│   ├── package.json
│   ├── package-lock.json
│   ├── server.mjs   (ignored in .gitignore – contains API key)
│   └── node_modules/
│
└── Unused Material/   (ignored in .gitignore)


Getting Started
1. Clone the repo
git clone https://github.com/michaelxie1/Language-Converter.git
cd LanguageConversion

2. Set up the proxy server
cd youtube-translate-proxy
npm install
node server.mjs

3. Load the Chrome extension

- Open chrome://extensions/
- Enable Developer mode
- Click Load unpacked
- Select the **youtube-auto-translate-extension** folder

4. Try it out

- Open a YouTube video with captions enabled
- Select translation direction (English ⇄ Spanish) from the popup
- Watch captions auto-translate 

**Notes on Security**:
- The Google API key in server.mjs is .gitignore’d and not pushed to GitHub.
- Future versions should migrate API keys to a .env file and use environment variables.

## **Roadmap**
- Add support for more languages
- Improve caption update speed
- Better error handling and user feedback
- Package for the Chrome Web Store


License
MIT License – feel free to use, modify, and share.