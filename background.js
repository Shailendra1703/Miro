chrome.runtime.onInstalled.addListener(() => {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "images/icon128.png",
    title: "Test Notification",
    message: "ChatGPT Notifier is Installed and Working!",
  });
});

// Listener for runtime messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "responseComplete") {
    console.log("Received message in background script");
    chrome.notifications.create({
      type: "basic",
      iconUrl: "images/icon128.png",
      title: "ChatGPT Response Complete",
      message: "ChatGPT has finished its response.",
    });
    sendResponse({ status: "notification sent" });
  } else {
    sendResponse({ status: "unknown message" });
  }
});
