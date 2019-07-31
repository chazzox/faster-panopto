// UI references
let changeSpeed = document.getElementById('changeSpeed');
let playerSpeedField = document.getElementById('speedValField');
let dlButtonLeft = document.getElementById('dlButtonLeft');
let dlButtonRight = document.getElementById('dlButtonRight');

chrome.storage.local.get('speed', function(result){
    playerSpeedField.value = result.speed;
});

// Takes the value of the speed field and sets it in the player
function setSpeed() {
    var fieldVal = playerSpeedField.value;

    chrome.storage.local.set({'speed': fieldVal}, function(){});

    // Gets the tab context to execute scripts in.
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, {code: 'document.getElementsByTagName("video")[0].playbackRate = ' + fieldVal});
        chrome.tabs.executeScript(tabs[0].id, {code: 'document.getElementsByTagName("video")[1].playbackRate = ' + fieldVal});
    });
}

// Autocomplete is really annoying because it covers up the button
playerSpeedField.setAttribute("autocomplete", "off");

// Disable enter key on the field
playerSpeedField.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        setSpeed();
    }
});

// Handles speed button click logic. 
changeSpeed.onclick = function(element) {
    setSpeed();
}

// Download button logic
dlButtonLeft.onClick = function(element) {
    console.log("test");
    var videoUrl = "https://uw.hosted.panopto.com/Panopto/ContentCache/635697295014298280/_branding/6f6686d7-bc5c-4787-bdad-9a9594b26fdc/smalllogo.png";
    // TODO: Can modify this to download to a directory with proper filenames
    chrome.downloads.download({
        url: videoUrl
    });
}
