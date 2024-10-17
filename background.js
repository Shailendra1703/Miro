const CONVERSATION_URL = "https://chatgpt.com/backend-api/conversation";
const RESPONSE_REQUESTED = "responseRequested";
const RESPONSE_STREAMING = "responseStreaming";
const RESPONSE_COMPLETED = "responseCompleted";
const filters = {
    urls: ["https://chatgpt.com/*", "https://chat.openai.com/*"],
};

function sendNotification(details) {
    chrome.notifications.create({
        type: "basic",
        ...details,
    });
}

function sendMessage(message) {
    chrome.runtime.sendMessage({ message }, (response) => {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
        } else {
            console.log("Response received:", response);
        }
    });
}

function messageHandler(request, sender, sendResponse) {
    // Notify user when response is streaming and completed
    if (request.message === RESPONSE_STREAMING) {
        console.log("Miro: Reponse is being streamed");
        sendNotification({
            iconUrl: "images/icon128.png",
            title: "ChatGPT Response Streaming",
            message: "ChatGPT is streaming its response.",
        });
    } else if (request.message === RESPONSE_COMPLETED) {
        console.log("Miro: Response is completed");
        sendNotification({
            iconUrl: "images/icon128.png",
            title: "ChatGPT Response Complete",
            message: "ChatGPT has finished its response.",
        });
    } else if (request.message === RESPONSE_REQUESTED) {
        console.log("Miro: Question asked by user");
    } else {
        console.error("Miro: Unrecognized message:", request.message);
    }
}

// Notify when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
    sendNotification({
        iconUrl: "images/icon128.png",
        title: "Test Notification",
        message: "ChatGPT Notifier is Installed and Working!",
    });
});

// Listening network request for conversation
chrome.webRequest.onBeforeSendHeaders.addListener(
    (details) => {
        if (details.url === CONVERSATION_URL) {
            messageHandler({ message: RESPONSE_REQUESTED });
        }
    },
    filters,
    ["requestHeaders"]
);

chrome.webRequest.onResponseStarted.addListener((details) => {
    if (details.url === CONVERSATION_URL) {
        messageHandler({ message: RESPONSE_STREAMING });
    }
}, filters);

chrome.webRequest.onCompleted.addListener((details) => {
    if (details.url === CONVERSATION_URL) {
        messageHandler({ message: RESPONSE_COMPLETED });
    }
}, filters);
