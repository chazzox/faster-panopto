import browser from 'webextension-polyfill';

var tabTimeout;

// setup storage
browser.runtime.onInstalled.addListener(() => {
	browser.storage.local.set({ speed: 1, active: false });
	checkTabValid();
});

// when any tab event is fired, check to see if current tab has a valid panopto url
browser.tabs.onActivated.addListener(checkTabValid);
browser.tabs.onUpdated.addListener(checkTabValid);

function checkTabValid() {
	// debouncing the event
	if (tabTimeout) {
		return;
	}

	tabTimeout = setTimeout(() => {
		browser.tabs
			.query({
				active: true,
				currentWindow: true,
				url: '*://*.panopto.com/*/Viewer*'
			})
			.then((tabs) => {
				if (tabs.length > 0) {
					browser.storage.local.set({ active: true });
					browser.browserAction.setIcon({
						path: 'images/enabled.png'
					});
				} else {
					browser.storage.local.set({ active: false });
					browser.browserAction.setIcon({
						path: 'images/disabled.png'
					});
				}
			});
		// clearing the timeout
		tabTimeout = undefined;
	}, 200);
}
