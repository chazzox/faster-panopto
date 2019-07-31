
const metas = document.getElementsByTagName('meta');
const pageTitle = document.querySelector("#HeadNode > title").textContent;
var leftVideoURL = "";
var rightVideoURL = ""; //document.getElementById('secondaryVideo').getAttribute('src');

/**
 * Parse desired info out of this page's meta elements
 * Modifies this script's fields
 */
function metaParse() {
    for (let i = 0; i < metas.length; i++) {
        // Parses out the left video's URL from the meta fields then formats it properly as well
        if (metas[i].getAttribute('property') === "og:video") {
            leftVideoURL = metas[i].getAttribute('content');
            leftVideoURL = leftVideoURL.substring(0, leftVideoURL.indexOf('?'));
        }
    }
}
metaParse();

// Once the page gets loaded this sends parsed information from the DOM.
chrome.runtime.sendMessage(
    {
        greeting: "injected",
        leftVideoURL:  leftVideoURL,
        rightVideoURL: rightVideoURL,
        pageTitle: pageTitle
    }, 
    function(response) {
});