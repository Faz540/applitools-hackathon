const waitUntil = require("../../utils/waits");
const loginPage = require("../../pages/login.page");
const mainDashboard = require("../../pages/mainDashboard.page");
const compareExpensesPage = require("../../pages/compareExpenses.page");

const { Eyes, Target } = require('@applitools/eyes-webdriverio');

const eyes = new Eyes();
eyes.setApiKey(process.env.APPLITOOLS_KEY);
const appName = "Applitools Dashboard Demo";
const viewPortSize =  { width: 1400, height: 1900 }

describe("WebdriverIO v5 with Applitools Eyes SDK:", function () {
    this.timeout(600000); // 10 seconds
    
    before(async function () {
        await eyes.setBatch("Hackathon");
    });

    afterEach(async function() {
        await eyes.closeAsync();
    });
        
    describe.skip("Login Page UI Elements Test", function() {
        
        before(function() {
            loginPage.open();
        });

        it("Logo is displayed", async function() {
            await eyes.open(browser, appName, this.test.title, viewPortSize);
            await eyes.check("Login Form - Logo", Target.region(".logo-w img"));
        });
        
        it("Form Header is displayed", async function() {
            await eyes.open(browser, appName, this.test.title, viewPortSize);
            await eyes.check("Login Form - Form Header", Target.region(".auth-header"));
        });
        
        it("'Username' icon is displayed", async function() {
            await eyes.open(browser, appName, this.test.title, viewPortSize);
            await eyes.check("Login Form - Username Icon", Target.region("#username + .pre-icon"));
        });
        
        it("'Username' field label is displayed", async function() {
            await eyes.open(browser, appName, this.test.title, viewPortSize);
            await eyes.check("Login Form - Username Field Label", Target.region("//label[text()='Username']"));
        });
        
        it("'Username' input field is displayed", async function() {
            await eyes.open(browser, appName, this.test.title, viewPortSize);
            await eyes.check("Login Form - Username Input Field", Target.region("#username"));
        });
        
        it("'Password' icon is displayed", async function() {
            await eyes.open(browser, appName, this.test.title, viewPortSize);
            await eyes.check("Login Form - Password Icon", Target.region("#password + .pre-icon"));
        });
        
        it("'Password' field label is displayed", async function() {
            await eyes.open(browser, appName, this.test.title, viewPortSize);
            await eyes.check("Login Form - Password Field Label", Target.region("//label[text()='Password']"));
        });
        
        it("'Password' input field is displayed", async function() {
            await eyes.open(browser, appName, this.test.title, viewPortSize);
            await eyes.check("Login Form - Password Input Field", Target.region("#password"));
        });
        
        it("'Log In' submit button is displayed", async function() {
            await eyes.open(browser, appName, this.test.title, viewPortSize);
            await eyes.check("Login Form - Log In Submit Button", Target.region("#log-in"));
        });
        
        it("'Remember Me' checkbox is displayed", async function() {
            await eyes.open(browser, appName, this.test.title, viewPortSize);
            await eyes.check("Login Form - Remember me Checkbox", Target.region(".form-check-label"));
        });
        
        it("Twitter Image Link is displayed", async function() {
            await eyes.open(browser, appName, this.test.title, viewPortSize);
            await eyes.check("Login Form - Twitter Icon", Target.region("img[src*='twitter']"));
        });
        
        it("Facebook Image Link is displayed", async function() {
            await eyes.open(browser, appName, this.test.title, viewPortSize);
            await eyes.check("Login Form - Facebook Icon", Target.region("img[src*='facebook']"));
        });
        
        it("LinkedIn Image Link is displayed", async function() {
            await eyes.open(browser, appName, this.test.title, viewPortSize);
            await eyes.check("Login Form - LinkedIntter Icon", Target.region("img[src*='linkedin']"));
        });
    });

    describe("Data-Driven Test", function() {

        beforeEach(function() {
            // Reload the Login Page before each test to reset and validation displayed.
            loginPage.open();
        });

        it("Blank Username & Password - Validation is displayed when submitted", async function() {
            await eyes.open(browser, appName, this.test.title, viewPortSize);
            await loginPage.submitForm("", "");
            await eyes.check("Login Form - Blank Username & Password Validation", Target.region(".alert-warning"));
        });

        // it("Blank Password - Validation is displayed when submitted", async function() {
        //     loginPage.submitForm("test@test.com", "");
        //     await eyes.check("Login Form - Blank Password Validation", Target.region(".alert-warning"));
        // });

        // it("Blank Username - Validation is displayed when submitted", async function() {
        //     loginPage.submitForm("", "password123");
        //     await eyes.check("Login Form - Blank User Validation", Target.region(".alert-warning"));
        // });

        // it("Successful Login - User is taken to the desired page", async function() {
        //     loginPage.submitForm("test@test.com", "password123");
        //     await waitUntil.elementIsDisplayed("#transactionsTable");
        //     await eyes.check("Main Dashboard", Target.region(".full-screen"));
        // });
    });
    
});