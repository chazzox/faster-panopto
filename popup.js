let changeSpeed = document.getElementById('changeSpeed');

let videoPlayer1 = document.getElementsByTagName("video")[0];
let videoPlayer2 = document.getElementsByTagName("video")[1];
let playerSpeed = document.getElementById('speedVal');

// // Get the saved player speed from storage
// chrome.storage.sync.get('speed', function(data) {
//     playerSpeed = data.speed;
// });

playerSpeed.setAttribute("autocomplete", "off");


changeSpeed.onclick = function(element) {
    console.log(playerSpeed);
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, {code: 'document.getElementsByTagName("video")[0].playbackRate = ' + playerSpeed.value});
        chrome.tabs.executeScript(tabs[0].id, {code: 'document.getElementsByTagName("video")[1].playbackRate = ' + playerSpeed.value});
    });
}
