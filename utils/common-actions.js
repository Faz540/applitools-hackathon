const fs = require("fs-extra");
const loginPage = require("../pages/login.page");

class Actions {
    removeAllFilesFromDirectory(directoryName) {
        const directory = fs.readdirSync(`./${directoryName}`);
        const screenshots = directory.filter(function(file) {
            return !file.includes(".ignoreMe");
        })
        return screenshots.forEach(function(screenshot) {
            return fs.removeSync(`./${directoryName}/${screenshot}`);
        });
    };

    initializeBrowser() {
        loginPage.open();
        return this.cleanSession() 
    };

    cleanSession() {
        browser.deleteCookies;
        return browser.refresh();
    };
            
    scrollToElement(element) {
        return browser.scroll(element);
    };
    
    getClassesForElement(element) {
        return $(element).getAttribute("class").split(" ");
    };
    
    getPageTitle() {
        return browser.getTitle();
    };
    
    getCurrentUrl() {
        return browser.url();
    };
    
    getElementAttribute(element, nameOfAttribute) {
        return $(element).getAttribute(nameOfAttribute);
    };
};

module.exports = new Actions;