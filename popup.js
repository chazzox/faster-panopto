// UI references
let changeSpeed = document.getElementById('changeSpeed');
let videoPlayer1 = document.getElementsByTagName("video")[0];
let videoPlayer2 = document.getElementsByTagName("video")[1];
let playerSpeedField = document.getElementById('speedValField');

chrome.storage.local.get('speed', function(result){
    console.log("Got speed, was : " + result.speed);
    playerSpeedField.value = result.speed;
});



// Autocomplete is really annoying because it covers up the button
playerSpeedField.setAttribute("autocomplete", "off");

// Disable enter key on the field
playerSpeedField.addEventListener('submit', function(event) {
    event.preventDefault();
}, false);

// Handles button click logic. 
changeSpeed.onclick = function(element) {
    var fieldVal = playerSpeedField.value;

    chrome.storage.local.set({'speed': fieldVal}, function(){});

    // Gets the tab context to execute scripts in.
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, {code: 'document.getElementsByTagName("video")[0].playbackRate = ' + fieldVal});
        chrome.tabs.executeScript(tabs[0].id, {code: 'document.getElementsByTagName("video")[1].playbackRate = ' + fieldVal});
    });
}
