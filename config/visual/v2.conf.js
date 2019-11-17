const templateConfig = require("../wdio.template.conf").config;

const v2Config = {
    ...templateConfig,
    baseUrl: "https://demo.applitools.com",
    specs: [
        "./tests/hackathon/VisualAITests.spec.js"
    ],
    services: ["chromedriver","applitools"],
    applitoolsKey: process.env.APPLITOOLS_KEY
};

exports.config = v2Config;