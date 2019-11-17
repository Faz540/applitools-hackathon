// Allows us to use a ".env" file at the root of our project to store Env Variables
require('dotenv').config();

exports.config = {
    runner: "local",
    //
    // Override default path ("/wd/hub") for chromedriver service.
    path: "/",
     // ============
    // Capabilities
    // ============
    capabilities: [{
        // maxInstances can get overwritten per capability. So if you have an in-house Selenium
        // grid with only 5 firefox instances available you can make sure that not more than
        // 5 instances get started at a time.
        maxInstances: 5,
        browserName: "chrome",
    }],
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: "silent",
    // Default timeout for all waitFor* commands.
    waitforTimeout: 10000,
    // Default timeout in milliseconds for request
    // if Selenium Grid doesn"t send response
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    framework: "mocha",
    reporters: ["spec"],
    // Options to be passed to Mocha.
    // See the full list at http://mochajs.org/
    mochaOpts: {
        ui: "bdd",
        timeout: 30000
    },
    // =====
    // Hooks
    // =====
    before: function (capabilities, specs) {
        chai = require('chai');
        expect = require('chai').expect;
        chaiWebdriver = require('chai-webdriverio').default;
        chai.use(chaiWebdriver(browser));
        browser.maximizeWindow();
    }
}
