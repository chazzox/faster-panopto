
var pageTitle = "";
var leftVideoURL = "";
var rightVideoURL = "";


chrome.runtime.onInstalled.addListener(function() {
  // Setup local storage
  chrome.storage.local.set({"speed": 1.0}, function(){});
  
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      // Condition to only enable the extension on panopto sites
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostContains: '.panopto.com', pathContains: 'Viewer'},
      })],
        actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

/**
 * Handles messaging between the injected script on the page and the extension
 */
chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
    if (message.greeting == "injected") {
      leftVideoURL = message.leftVideoURL;
      pageTitle = message.pageTitle;
      sendResponse({farewell: "DOM data transferred successfully"});
    }
});

/**
 * This downloads the prof's cam on the left side of the page
 *  */ 
function downloadLeft() {
  chrome.downloads.download({
    url: leftVideoURL,
    filename: pageTitle + " [BOARD].mp4",
    saveAs: true
  });
}

/**
 * Downloads the main video, which has slides.
 */
// function downloadRight() {
//   chrome.downloads.download({
//     url: rightVideoURL,
//     filename: pageTitle + " [SLIDES].mp4",
//     saveAs: true
//   });
// };

