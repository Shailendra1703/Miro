chrome.runtime.onInstalled.addListener(() => {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "images/icon128.png",
    title: "Test Notification",
    message: "ChatGPT Notifier is Installed and Working!",
  });
});

// For the Listener for runtime messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "responseComplete") {
    console.log("Received ChatGPT message in background script");
    chrome.notifications.create({
      type: "basic",
      iconUrl: "images/icon128.png",
      title: "ChatGPT Response Complete",
      message: "ChatGPT has finished its response.",
    });
    sendResponse({ status: "notification sent" });
  } else if (request.message === "claudeResponseComplete") {
    console.log("Received Claude message in background script");
    chrome.notifications.create({
      type: "basic",
      iconUrl: "images/icon128.png",
      title: "Claude Response Complete",
      message: "Claude has finished its response.",
    });
    sendResponse({ status: "notification sent" });
  } else {
    sendResponse({ status: "unknown message" });
  }
});
