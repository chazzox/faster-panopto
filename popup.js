let changeSpeed = document.getElementById('changeSpeed');

let videoPlayer1 = document.getElementsByTagName("video")[0];
let videoPlayer2 = document.getElementsByTagName("video")[1];
let playerSpeed = document.getElementById('speedVal');

// // Get the saved player speed from storage
// chrome.storage.sync.get('speed', function(data) {
//     playerSpeed = data.speed;
// });


changeSpeed.onclick = function(element) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        // Passes the playerSpeed into
        chrome.tabs.executeScript(tabs[0].id, {code: 'var playerSpeed = ' + playerSpeed}, 
        // nested
        function() {
            chrome.tabs.executeScript(tabs[0].id, {file: 'updateSpeed.js'});
        });
    });
}
