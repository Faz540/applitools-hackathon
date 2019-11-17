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
    
    pageTitleExists() {
        return browser.waitUntil(function() {
            return browser.getTitle() !== "";
        }, 15000, "Waited 15 secs and page title was empty.");
    };
    
    elementHasClass(element, expectedClass) {
        return browser.waitUntil(function() {
            return element.getAttribute("class").split(" ").includes(expectedClass);
        }, 1000, `Waited 10 seconds and "${element}" did not have the class: "${expectedClass}"`);
    };
    
    elementHasAttributeValue(element, attribute, expectedValue) {
        return browser.waitUntil(function() {
            return element.getAttribute(attribute).split(" ").includes(expectedValue);
        }, 10000, `Waited 10 seconds and "${attribute}" was not "${expectedValue}" for element: "${element}"`);
    };

    elementHasCssProperty(element, cssProperty, expectedValue) {
        return browser.waitUntil(function() {
            return element.getCssProperty(cssProperty).value == expectedValue;
        }, 10000, `Waited 10 seconds and "${cssProperty}" was not "${expectedValue}" for element: "${element}"`);
    };
    
    elementIsDisplayed(element) {
        return $(element).waitForDisplayed(10000, false, `Waited 10 seconds for "${element}" to be displayed, but it was not there.`);
    };
    
    elementIsNoLongerDisplayed(element) {
        return $(element).waitForDisplayed(10000, true, `Waited 10 seconds for "${element}" to no longer be displayed, but it was still there.`);
    };
    
    elementExists(element) {
        return browser.waitForExist(element);
    };
    
    elementNoLongerExists(element) {
        return browser.waitForExist(element, null, true);
    };
}

module.exports = new WaitUntil;