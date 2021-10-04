import browser from 'webextension-polyfill';

browser.runtime.onInstalled.addListener((_event) => {
	browser.storage.local.set(
		{ speed: 1.0, pageTitle: '', mainVideoURL: '' },
		() => {}
	);
});

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.greeting == 'injected') {
		browser.storage.local.set({
			mainVideoURL: message.leftVideoURL,
			pageTitle: pageTitle
		});
		sendResponse({ farewell: 'DOM data transferred successfully' });
	}
});
