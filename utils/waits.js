class WaitUntil { 
    pageURLIncludes(expectedURL) {
        return browser.waitUntil(function() {
            return browser.getUrl().includes(expectedURL)
        }, 15000, `Waited 15 secs and page URL does not include "${expectedURL}"`);
    };
    
    pageURLIsNoLonger(currentURL) {
        return browser.waitUntil(function() {
            return browser.getUrl() !== currentURL;
        }, 15000, "Waited 15 secs and page URL has not changed.");
    };
        
    elementHasAttributeValue(element, attribute, expectedValue) {
        return browser.waitUntil(function() {
            return $(element).getAttribute(attribute).split(" ").includes(expectedValue);
        }, 10000, `Waited 10 seconds and "${attribute}" was not "${expectedValue}" for element: "${element}"`);
    };
    
    elementIsDisplayed(element) {
        return $(element).waitForDisplayed(10000, false, `Waited 10 seconds for "${element}" to be displayed, but it was not there.`);
    };
}

module.exports = new WaitUntil;