import browser from 'webextension-polyfill';

const metas = document.getElementsByTagName('meta');
const pageTitle = document.querySelector('#HeadNode > title').textContent;
var leftVideoURL = '';

/**
 * Parse desired info out of this page's meta elements
 * Modifies this script's fields
 */
function metaParse() {
	for (let i = 0; i < metas.length; i++) {
		// Parses out the left video's URL from the meta fields then formats it properly as well
		if (metas[i].getAttribute('property') === 'og:video') {
			leftVideoURL = metas[i].getAttribute('content');
			leftVideoURL = leftVideoURL.substring(0, leftVideoURL.indexOf('?'));
		}
	}
}

metaParse();

// Once the page gets loaded this sends parsed information from the DOM.
browser.runtime.sendMessage(
	{
		greeting: 'injected',
		leftVideoURL: leftVideoURL,
		pageTitle: pageTitle
	},
	(_response) => {}
);
