const templateConfig = require("../wdio.template.conf").config;

const v1Config = {
    ...templateConfig,
    baseUrl: "https://demo.applitools.com",
    specs: [
        "./tests/hackathon/VisualAITests.spec.js"
    ],
    services: ["chromedriver","applitools"],
    //applitoolsKey: process.env.APPLITOOLS_KEY,
    applitools: {
        apiKey: process.env.APPLITOOLS_KEY,
        matchTimeOut: 10000,
        hideScrollbars: true,
        appName: "AppName",
        batch: "BatchName"
    }
};

exports.config = v1Config;