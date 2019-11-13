const loginPage = require("../pages/login.page");

class Actions {
    initializeBrowser() {
        loginPage.open();
        return this.cleanSession() 
    };

    cleanSession() {
        browser.deleteCookies;
        return browser.refresh();
    };
            
    scrollToElement(element) {
        return browser.scroll(element.selector);
    };
    
    getClassesForElement(element) {
        return $(element.selector).getAttribute("class").split(" ");
    };
    
    getPageTitle() {
        return browser.getTitle();
    };
    
    getCurrentUrl() {
        return browser.url();
    };
    
    getElementAttribute(element, nameOfAttribute) {
        return $(element.selector).getAttribute(nameOfAttribute);
    };
};

module.exports = new Actions;