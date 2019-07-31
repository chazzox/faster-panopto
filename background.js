
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