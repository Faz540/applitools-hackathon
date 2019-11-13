const waitUntil = require("../../utils/waits");
const loginPage = require("../../pages/login.page");
const mainDashboard = require("../../pages/mainDashboard.page");

describe("Visual AI with Applitools - Login Page:", function() {

    beforeEach(function() {
        // Reload the Login Page for each test to reset any validation shown.
        loginPage.open();
    });

    describe("Login Page UI Elements Test", function() {

        it("Logo is displayed", function() {
            browser.takeRegionSnapshot("Login Form - Logo", loginPage.$logoImageLink.selector);
        });

        it("Form Header is displayed", function() {
            browser.takeRegionSnapshot("Login Form - Form Header", loginPage.$formHeader.selector);
        });

        it("'Username' icon is displayed", function() {
            browser.takeRegionSnapshot("Login Form - Username Icon", loginPage.$usernameIcon.selector);
        });

        it("'Username' field label is displayed", function() {
            browser.takeRegionSnapshot("Login Form - Username Field Label", loginPage.$usernameLabel.selector);
        });

        it("'Username' input field is displayed", function() {
            browser.takeRegionSnapshot("Login Form - Username Input Field", loginPage.$username.selector);
        });

        it("'Password' icon is displayed", function() {
            browser.takeRegionSnapshot("Login Form - Password Icon", loginPage.$passwordIcon.selector);
        });

        it("'Password' field label is displayed", function() {
            browser.takeRegionSnapshot("Login Form - Password Field Label", loginPage.$passwordLabel.selector);
        });

        it("'Password' input field is displayed", function() {
            browser.takeRegionSnapshot("Login Form - Password Input Field", loginPage.$password.selector);
        });

        it("'Log In' submit button is displayed", function() {
            browser.takeRegionSnapshot("Login Form - Log In Submit Button", loginPage.$loginButton.selector);
        });

        it("'Remember Me' checkbox is displayed", function() {
            browser.takeRegionSnapshot("Login Form - Remember me Checkbox", loginPage.$rememberMeCheckbox.selector);
        });

        it("Twitter Image Link is displayed", function() {
            browser.takeRegionSnapshot("Login Form - Twitter Icon", loginPage.$twitterImageLink.selector);
        });

        it("Facebook Image Link is displayed", function() {
            browser.takeRegionSnapshot("Login Form - Facebook Icon", loginPage.$facebookImageLink.selector);
        });

        it("LinkedIn Image Link is displayed", function() {
            browser.takeRegionSnapshot("Login Form - TwiLinkedIntter Icon", loginPage.$linkedInImageLink.selector);
        });
    });
  
    describe("Data-Driven Test", function() {

        beforeEach(function() {
            // Reload the Login Page for each test to reset any validation shown.
            loginPage.open();
        });

        it("Blank Username & Password - Validation is displayed when submitted", function() {
            loginPage.submitForm("", "");
            browser.takeRegionSnapshot("Login Form - Blank Username & Password Validation", loginPage.$loginValidation.selector);
        });

        it("Blank Password - Validation is displayed when submitted", function() {
            loginPage.submitForm("test@test.com", "");
            browser.takeRegionSnapshot("Login Form - Blank Password Validation", loginPage.$loginValidation.selector);
        });

        it("Blank Username - Validation is displayed when submitted", function() {
            loginPage.submitForm("", "password123");
            browser.takeRegionSnapshot("Login Form - Blank User Validation", loginPage.$loginValidation.selector);
        });

        it.skip("Successful Login - User is taken to the desired page", function() {
            loginPage.submitForm("test@test.com", "password123");
            waitUntil.elementIsDisplayed(mainDashboard.$transactionTable);
            browser.takeSnapshot("Main Dashboard", ".full-screen");
        });
    });
});