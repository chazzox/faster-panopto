// UI references
const changeSpeed = document.getElementById('changeSpeed');
const  playerSpeedField = document.getElementById('speedValField');
const dlButtonLeft = document.getElementById('dlButtonLeft');
const dlButtonRight = document.getElementById('dlButtonRight');

var pageHTML = "";

chrome.storage.local.get('speed', function(result){
    playerSpeedField.value = result.speed;
});

// Takes the value of the speed field and sets it in the player
function setSpeed() {
    var fieldVal = playerSpeedField.value;

    chrome.storage.local.set({'speed': fieldVal}, function(){});

    // Gets the tab context to execute scripts in.
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, {code: 'document.getElementById("playButton").click()'});
        chrome.tabs.executeScript(tabs[0].id, {code: 'document.getElementsByTagName("video")[0].playbackRate = ' + fieldVal});
        chrome.tabs.executeScript(tabs[0].id, {code: 'document.getElementsByTagName("video")[1].playbackRate = ' + fieldVal});
        chrome.tabs.executeScript(tabs[0].id, {code: 'document.getElementById("playButton").click()'});
    });
};

// Autocomplete is really annoying because it covers up the button
playerSpeedField.setAttribute("autocomplete", "off");

// Disable enter key on the field
playerSpeedField.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        setSpeed();
    }
});

// Button logic assignment
changeSpeed.onclick = setSpeed;
dlButtonLeft.onclick = function() {
    chrome.extension.getBackgroundPage().downloadLeft();
};
// dlButtonRight.onclick = function() {
//     chrome.extension.getBackgroundPage().downloadRight();
// };
