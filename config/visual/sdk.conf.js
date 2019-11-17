const templateConfig = require("../wdio.template.conf").config;

const sdkConfig = {
    ...templateConfig,
    baseUrl: "https://demo.applitools.com",
    specs: [
        "./tests/hackathon/sdk.spec.js"
    ],
    services: ["chromedriver",],
    applitoolsKey: process.env.APPLITOOLS_KEY,
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
};

exports.config = sdkConfig;