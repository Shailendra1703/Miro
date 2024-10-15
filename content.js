let observer = new MutationObserver((mutations) => {
  console.log("MutationObserver callback triggered");
  mutations.forEach((mutation) => {
    if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
      let addedNode = mutation.addedNodes[0];
      if (
        addedNode.nodeType === 1 &&
        (addedNode.matches(".markdown") || addedNode.querySelector("[data-is-streaming='false']"))
      ) {
        console.log("Added node is an element and matches ChatGPT or Claude selector");

        // To Ensure chrome.runtime.sendMessage is available and then send the message
        if (chrome.runtime && chrome.runtime.sendMessage) {
          console.log("Attempting to send message to background script...");
          try {
            chrome.runtime.sendMessage(
              { message: addedNode.matches(".markdown") ? "responseComplete" : "claudeResponseComplete" },
              (response) => {
                if (chrome.runtime.lastError) {
                  console.error("Error sending message:", chrome.runtime.lastError);
                } else {
                  console.log("Message sent successfully, response:", response);
                }
              }
            );
          } catch (error) {
            console.error("Failed to send message:", error);
          }
        } else {
          console.error("chrome.runtime.sendMessage is not available.");
        }
      } else {
        console.log("Added node does not match ChatGPT or Claude class");
      }
    } else {
      console.log("Mutation is not a childList type or no nodes were added");
    }
  });
});

console.log("Starting observer");
observer.observe(document.body, {
  childList: true,
  subtree: true,
});
console.log("Observer started");
