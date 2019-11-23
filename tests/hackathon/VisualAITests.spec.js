const waitUntil = require("../../utils/waits");
const loginPage = require("../../pages/login.page");
const mainDashboard = require("../../pages/mainDashboard.page");
const compareExpensesPage = require("../../pages/compareExpenses.page");

describe("WebdriverIO v5 with Applitools WDIO Service", function() {

    describe("Login Page UI Elements Test", function() {

        before(function() {
            loginPage.open();
        });
        
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
            browser.takeRegionSnapshot("Login Form - LinkedIn Icon", loginPage.$linkedInImageLink.selector);
        });
    });
  
    describe("Data-Driven Test", function() {

        beforeEach(function() {
            // Reload the Login Page before each test to reset any validation displayed.
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

        it("Successful Login - User is taken to the desired page", function() {
            loginPage.submitForm("test@test.com", "password123");
            waitUntil.elementIsDisplayed(mainDashboard.$transactionTable.selector);
            browser.takeSnapshot("Main Dashboard", ".full-screen");
        });
    });

    describe("Table Sort Test", function() {

        before(function() {
            loginPage.open();
            loginPage.submitForm("test@test.com", "password123");
            waitUntil.pageURLIsNoLonger("/hackathon.html");
        });

        afterEach(function() {
            // Refresh the Dashboard to reset any 'Sorting' that is applied
            browser.refresh();
        })

        it("Pre-Sorted Amounts - Table is displayed with the correct data", function() {
            browser.takeRegionSnapshot("Pre-Sorted Recent Transactions - Table is displayed", mainDashboard.$transactionTable.selector);
        });

        it("Sorted Amounts - Table is displayed with the correct data", function() {
            mainDashboard.$amountTableHeader.click();
            browser.takeRegionSnapshot("Sorted Recent Transactions - Table is displayed", mainDashboard.$transactionTable.selector);
        });
    });

    describe("Canvas Chart Test", function() {

        before(function() {
            loginPage.open();
            loginPage.submitForm("test@test.com", "password123");
            waitUntil.pageURLIsNoLonger("/hackathon.html");
            mainDashboard.$compareExpensesButton.click();
            waitUntil.elementIsDisplayed(compareExpensesPage.$canvasChart.selector);
        });

        afterEach(function() {
            // Refresh the Dashboard to reset any 'Sorting' that is applied
            browser.refresh();
            waitUntil.elementIsDisplayed(compareExpensesPage.$canvasChart.selector);
        });

        it("Compare Expenses Bar Chart - Chart is displayed", function() {
            browser.takeRegionSnapshot("2017 > 2018 Bar Chart - Table is displayed", compareExpensesPage.$canvasChart.selector);
        });

        it("Clicking 'Show Data For Next Year' adds the desired data to the chart", function() {
            compareExpensesPage.$showDataForNextYearButton.click();
            browser.pause(2000); // Wait for animated bar chart to update
            browser.takeRegionSnapshot("2017 > 2019 Bar Chart - Table is displayed With Updated Values", compareExpensesPage.$canvasChart.selector);
        });
    });

    describe("Dynamic Content Test", function() {
        
        before(function() {
            loginPage.open();
            loginPage.submitForm("test@test.com", "password123");
            waitUntil.pageURLIsNoLonger("/hackathon.html");
        });

        afterEach(function() {
            browser.refresh();
        });

        it("Dynamic Content - The correct gifs are displayed", function() {
            browser.takeRegionSnapshot("Gifs - The correct gifs are displayed", mainDashboard.$finanicalOverviewSection.selector);
        });
    });
});