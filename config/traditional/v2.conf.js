const templateConfig = require("../wdio.template.conf").config;

const v2Config = {
    ...templateConfig,
    baseUrl: "https://demo.applitools.com/hackathonV2.html",
    specs: [
        "./tests/hackathon/TraditionalTests.spec.js"
    ],
    services: ["chromedriver"]
};

exports.config = v2Config;