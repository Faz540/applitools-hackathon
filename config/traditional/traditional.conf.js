const templateConfig = require("../wdio.template.conf").config;
const actions = require("../../utils/common-actions");
const fs = require("fs-extra");

const traditionalTemplateConfig = {
    ...templateConfig,
    baseUrl: "https://demo.applitools.com",
    specs: [
        "./tests/hackathon/TraditionalTests.spec.js"
    ],
    // Hooks:
    onPrepare: function() {
        // Removes screenshots from the "screenshots" folder before the tests are ran.
        // This is so there are no screenshots present from previous test runs.
        actions.removeAllFilesFromDirectory('screenshots');
    },
    afterTest: function(test) {
        // If a test fails or errors, take a screenshot.
        // Test Failure = Chai assertion failure
        // Test Error = Trying to interact with an element that doesn't exist etc.
        if(test.passed === false || test.error) {
            if(!fs.existsSync(`./screenshots/${test.parent}`)) {
                fs.mkdirSync(`./screenshots/${test.parent}`);
            }
            const filePath = `./screenshots/${test.parent}/${test.title}.png`;
            browser.saveScreenshot(filePath);
        }
    }
};

exports.config = traditionalTemplateConfig;