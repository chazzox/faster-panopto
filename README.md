# fast-panopto
Chrome extension to allow for Panopto speeds outside of the given values.
Since version 1.20: Allows downloading of the video of the front of the room.
Unfortunately, due to the nature of the way the side video delivered to users, it is a non-trivial task to implement downloading for it and would take a serious time investment or additional libraries to figure out, so I'm leaving that out at this time.

Considering for future updates:
Ability to download all the slide thumbnails

<img src="https://i.imgur.com/EBTCA0C.png">

<a href="https://chrome.google.com/webstore/detail/fast-panopto/bginlheikaacjjdajifcbakcmfcgmefh">Download</a> and install from the Chrome web store or download the source and import into Chrome extensions locally.

Changelog:
* 1.21
  - Changed donate link to a fancy Paypal button
* 1.20
  - Fixed bug where interface was accessible outside of a video player page
  - Fixed bug where video would stutter if user doesn't pause and unpause after changing speed.
  - Added enter key form entry for the speed field
  - Added a download button for one of the videos
  - Interface aesthetic upgrades
  - Donate button now actually opens a tab when clicked
* 1.15
  - Further improved interface (more compact!)
  - Persistent input value; no longer wipes the value as soon as you exit the popup menu.
  - Disabled enter key for the text field; requires button press to apply setting.
  - Restricted input to number values.
* 1.1
  - Improved interface.
  - Added donation button.
* 1.0:
  - Scuffed but working.
