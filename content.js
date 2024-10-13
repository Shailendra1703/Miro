let observer = new MutationObserver((mutations) => {
  console.log("MutationObserver callback triggered");
  mutations.forEach((mutation) => {
    if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
      let addedNode = mutation.addedNodes[0];
      if (addedNode.nodeType === 1 && addedNode.matches(".markdown")) {
        console.log("Added node is an element and matches .markdown class");

        // Ensure chrome.runtime.sendMessage is available and then send the message
        if (chrome.runtime && chrome.runtime.sendMessage) {
          console.log("Attempting to send message to background script...");
          chrome.runtime.sendMessage(
            { message: "responseComplete" },
            (response) => {
              if (chrome.runtime.lastError) {
                console.error(
                  "Error sending message:",
                  chrome.runtime.lastError
                );
              } else {
                console.log("Message sent successfully, response:", response);
              }
            }
          );
        } else {
          console.error("chrome.runtime.sendMessage is not available.");
        }
      } else {
        console.log(
          "Added node does not match .markdown class or is not an element"
        );
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
