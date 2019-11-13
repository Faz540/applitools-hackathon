const templateConfig = require("../wdio.template.conf").config;

const v2Config = {
    ...templateConfig,
    baseUrl: "https://demo.applitools.com/hackathonV2.html",
    specs: [
        "./tests/hackathon/VisualAITests.spec.js"
    ],
    services: ["chromedriver","applitools"],
    applitoolsKey: "DRkCQ6ENng107BH9wIN5LLGIwkoZ4OimGtjmrH1039nnwN0110",
};

exports.config = v2Config;