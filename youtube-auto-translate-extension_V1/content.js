const translationCache = new Map();
let debounceTimeout = null;

function translateVisibleCaptions() {
  const segments = document.querySelectorAll(".ytp-caption-segment");
  if (!segments.length) return;

  chrome.storage.sync.get(["fromLang", "toLang"], ({ fromLang = "es", toLang = "en" }) => {
    if (fromLang === toLang) return;

    segments.forEach((node) => {
      const original = node.innerText.trim();
      if (!original || node.dataset.translated === "true") return;

      const cacheKey = `${fromLang}:${toLang}:${original}`;
      if (translationCache.has(cacheKey)) {
        node.innerText = translationCache.get(cacheKey);
        node.dataset.translated = "true";
        return;
      }

      chrome.runtime.sendMessage(
        { text: original, from: fromLang, to: toLang },
        (response) => {
          if (response?.translatedText && response.translatedText !== original) {
            translationCache.set(cacheKey, response.translatedText);
            node.innerText = response.translatedText;
            node.dataset.translated = "true";
          }
        }
      );
    });
  });
}

function observeCaptions() {
  const observer = new MutationObserver(() => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => translateVisibleCaptions(), 100);
  });

  const tryObserve = () => {
    const container = document.querySelector(".ytp-caption-window-container");
    if (container) {
      observer.observe(container, { childList: true, subtree: true });
      console.log("✅ Caption observer attached.");
    } else {
      setTimeout(tryObserve, 500);
    }
  };

  tryObserve();
}

observeCaptions();



/*// Utility to support both YouTube caption container variations
function getCaptionsContainer() {
  return document.querySelector(".ytp-caption-window-container") ||
         document.querySelector(".caption-window");
}

// Translates the full block of visible captions
function translateCaptions() {
  const container = getCaptionsContainer();
  if (!container) return;

  const text = container.innerText.trim();
  if (!text) return;

  chrome.storage.sync.get(["fromLang", "toLang"], ({ fromLang = "es", toLang = "en" }) => {
    if (fromLang === toLang) return;
    if (container.dataset.lastTranslated === text) return;

    chrome.runtime.sendMessage(
      { text, from: fromLang, to: toLang },
      (response) => {
        if (response?.translatedText) {
          container.innerText = response.translatedText;
          container.dataset.lastTranslated = text;
        }
      }
    );
  });
}

// Watch for new captions being added
function observeCaptions(container) {
  const observer = new MutationObserver(() => translateCaptions());
  observer.observe(container, { childList: true, subtree: true });
}

// Keep trying until captions container is found (YouTube loads it late)
function waitForCaptionsContainer(retries = 20) {
  const container = getCaptionsContainer();
  if (container) {
    console.log("✅ Captions container found.");
    observeCaptions(container);
  } else if (retries > 0) {
    setTimeout(() => waitForCaptionsContainer(retries - 1), 500);
  } else {
    console.warn("⚠️ YouTube captions container not found.");
  }
}

// Start the whole process
waitForCaptionsContainer();

*/