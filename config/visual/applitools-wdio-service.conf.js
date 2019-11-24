const templateConfig = require("../wdio.template.conf").config;

const applitoolsWdioService = {
    ...templateConfig,
    baseUrl: "https://demo.applitools.com",
    specs: [
        "./tests/hackathon/VisualAITests.spec.js"
    ],
    services: ["chromedriver","applitools"],
    applitools: {
        apiKey: process.env.APPLITOOLS_KEY,
        matchTimeOut: 10000,
        hideScrollbars: true,
        appName: "AppName",
        batch: "BatchName"
    }
};

exports.config = applitoolsWdioService;