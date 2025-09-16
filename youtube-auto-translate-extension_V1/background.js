chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { text, from, to } = message;

  console.log(`[DEBUG] Proxy request: ${text} (${from} → ${to})`);

  fetch('http://localhost:3000/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ q: text, source: from, target: to })
  })
    .then(res => res.json())
    .then(data => {
      const translated = data?.data?.translations?.[0]?.translatedText;
      sendResponse({ translatedText: translated || text });
    })
    .catch(err => {
      console.error("❌ Proxy translation failed:", err);
      sendResponse({ translatedText: text });
    });

  return true;
});
