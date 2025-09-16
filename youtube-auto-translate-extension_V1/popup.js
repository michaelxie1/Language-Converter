document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get(["fromLang", "toLang"], ({ fromLang = "es", toLang = "en" }) => {
    document.getElementById("fromLang").value = fromLang;
    document.getElementById("toLang").value = toLang;
  });

  document.getElementById("save").addEventListener("click", () => {
    const from = document.getElementById("fromLang").value;
    const to = document.getElementById("toLang").value;

    chrome.storage.sync.set({ fromLang: from, toLang: to }, () => {
      const status = document.getElementById("status");
      status.textContent = `✅ Saved: ${from} → ${to}`;
      setTimeout(() => (status.textContent = ""), 2000);
    });
  });
});
