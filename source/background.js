import browser from 'webextension-polyfill';
var tabTimeout;

// setup storage
browser.runtime.onInstalled.addListener(() => {
	browser.storage.local.set({ speed: 1, active: false, urls: [] });
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
				currentWindow: true
			})
			.then(([first, ..._]) => {
				// bit of an annoying fix... but url schemes are annoying
				if (first.url.includes('panopto')) {
					browser.storage.local.set({ active: true });
					browser.browserAction.setIcon({
						path: './images/enabled.png'
					});
				} else {
					browser.storage.local.set({ active: false });
					browser.browserAction.setIcon({
						path: './images/disabled.png'
					});
				}
			});

		// clearing the timeout
		tabTimeout = undefined;
	}, 200);
}

// NOT WORKING CHROME
browser.webRequest.onBeforeRequest.addListener(
	(e) => {
		const url = new URL(e.url);
		if (e?.originUrl?.includes('panopto') && e?.url?.includes('.m3u8'))
			browser.storage.local.get(['urls']).then((res) =>
				browser.storage.local.set({
					urls: [...res.urls, url.origin + url.pathname]
				})
			);
	},
	{
		urls: ['<all_urls>']
	},
	['requestBody']
);

