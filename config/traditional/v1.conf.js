const templateConfig = require("../wdio.template.conf").config;

const v1Config = {
    ...templateConfig,
    baseUrl: "https://demo.applitools.com/hackathon.html",
    specs: [
        "./tests/hackathon/TraditionalTests.spec.js"
    ],
    services: ["chromedriver"]
};

exports.config = v1Config;