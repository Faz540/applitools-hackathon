class WaitUntil { 
    pageURLIncludes(expectedURL) {
        return browser.waitUntil(function() {
            return browser.getUrl().includes(expectedURL)
        }, 15000, `Waited 15 secs and page URL does not include "${expectedURL}"`);
    };
    
    async pageURLIsNoLonger(currentURL) {
        return browser.waitUntil(function() {
            return browser.getUrl() !== currentURL;
        }, 15000, "Waited 15 secs and page URL has not changed.");
    };
            
    async elementIsDisplayed(element) {
        return await element.waitForDisplayed(10000, false, `Waited 10 seconds for "${element}" to be displayed, but it was not there.`);
    };
}

module.exports = new WaitUntil;