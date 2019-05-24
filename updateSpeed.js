
(function() {
    let playerSpeed = 1.0;
    // gets the var from the previous js file
    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        playerSpeed = message;
    });
    console.log("speed set");
    document.getElementsByTagName("video")[0].playbackRate = playerSpeed;
    document.getElementsByTagName("video")[1].playbackRate = playerSpeed;
})();