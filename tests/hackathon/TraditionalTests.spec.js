const _ = require('lodash');

const actions = require("../../utils/common-actions");
const waitUntil = require("../../utils/waits");
const loginPage = require("../../pages/login.page");
const mainDashboard = require("../../pages/mainDashboard.page");
const compareExpensesPage = require("../../pages/compareExpenses.page");

describe("Traditional Tests - Login Page:", function() {

    describe("Login Page UI Elements Test", function() {

        before(function() {
            loginPage.open();
        });

        it("Logo is displayed", function() {
            expect(loginPage.$logoImageLink.selector).to.be.displayed()
        });

        it("Form Header is displayed and correct", function() {
            expect(loginPage.$formHeader.selector).to.be.displayed();
            expect(loginPage.$formHeader.selector).to.have.text("Login Form");
        });

        it("'Username' icon is displayed", function() {
            expect(loginPage.$usernameIcon.selector).to.be.displayed();
        });

        it("'Username' field label is displayed", function() {
            expect(loginPage.$usernameLabel.selector).to.be.displayed();
        });
    
        it("'Username' input field is displayed", function() {
            expect(loginPage.$username.selector).to.be.displayed();
        });

        it("'Username' input field contains the desired placeholder text", function() {
            const placeholderText = actions.getElementAttribute(loginPage.$username, "placeholder");
            expect(placeholderText).to.equal("Enter your username");
        });

        it("'Password' icon is displayed", function() {
            expect(loginPage.$passwordIcon.selector).to.be.displayed();
        });

        it("'Password' field label is displayed", function() {
            expect(loginPage.$passwordLabel.selector).to.be.displayed();
        });

        it("'Password' input field is displayed", function() {
            expect(loginPage.$password.selector).to.be.displayed();
        });

        it("'Password' input field contains the desired placeholder text", function() {
            const placeholderText = actions.getElementAttribute(loginPage.$password, "placeholder");
            expect(placeholderText).to.equal("Enter your password");
        });

        it("'Log In' submit button is displayed", function() {
            expect(loginPage.$loginButton.selector).to.be.displayed();
        });
    
        it("'Remember Me' checkbox is displayed", function() {
            expect(loginPage.$rememberMeCheckbox.selector).to.be.displayed();
        });
    
        it("Twitter Image Link is displayed", function() {
            expect(loginPage.$twitterImageLink.selector).to.be.displayed();
        });
    
        it("Facebook Image Link is displayed", function() {
            expect(loginPage.$facebookImageLink.selector).to.be.displayed();
        });
    
        it("LinkedIn Image Link is displayed", function() {
            expect(loginPage.$linkedInImageLink.selector).to.be.displayed();
        });
    });   

    describe("Data-Driven Test", function() {

        beforeEach(function() {
            // Reload the Login Page before each test to reset and validation displayed.
            loginPage.open();
        });

        it("Blank Username & Password - Validation is displayed when submitted", function() {
            loginPage.submitForm("", "");
            expect(loginPage.$loginValidation.selector).to.be.displayed();
            expect(loginPage.$loginValidation.selector).to.have.text("Both Username and Password must be present");
        });

        it("Blank Password - Validation is displayed when submitted", function() {
            loginPage.submitForm("test@test.com", "");
            expect(loginPage.$loginValidation.selector).to.be.displayed();
            expect(loginPage.$loginValidation.selector).to.have.text("Password must be present");
        });

        it("Blank Username - Validation is displayed when submitted", function() {
            loginPage.submitForm("", "password123");
            expect(loginPage.$loginValidation.selector).to.be.displayed();
            expect(loginPage.$loginValidation.selector).to.have.text("Username must be present");
        });

        it("Successful Login - User is taken to the desired page", function() {
            loginPage.submitForm("test@test.com", "password123");
            waitUntil.pageURLIsNoLonger("/hackathon.html");
            expect(mainDashboard.$transactionTable.selector).to.be.displayed();
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

        it("Clicking 'Amounts' sorts the values in ascending order", function() {
            // Our getNumericalAmountValues function returns us all the numerical values from the Amounts column in their current order
            const amountsBeforeSorting = mainDashboard.getNumericalAmountValues();
            // For simplicity, I'm using Lodash (A JavaScript Utility Library) to sort the amountsBeforeSorting array into ascending order 
            const expectedResult = _.sortBy(amountsBeforeSorting);
            
            // Click the Amounts Table Header to sort the amounts in ascending order
            mainDashboard.$amountTableHeader.click();
            // Use our getNumericalAmountValues function again, but this time against the sorted amounts displayed
            const amountsAfterSorting = mainDashboard.getNumericalAmountValues();
            
            // Now we compare the two arrays.
            // The order of the amounts displayed should match the order we expected
            expect(amountsAfterSorting).to.deep.equal(expectedResult);
        });

        it("Starbucks Coffee: Sorting by 'Amounts' keeps the table's data in tact", function() {
            // Save all the data for "Starbucks" into an object
            const tableDataBeforeSorting = mainDashboard.getAllTableData("Starbucks");
            // Sort the Table by amount
            mainDashboard.$amountTableHeader.click();
            // Save all the sorted data for "Starbucks" into a new object
            const tableDataAfterSorting = mainDashboard.getAllTableData("Starbucks");
            // Compare the contents of each object. They should match.
            expect(tableDataBeforeSorting).to.deep.equal(tableDataAfterSorting);
        });

        it("Stripe Payment Processing: Sorting by 'Amounts' keeps the table's data in tact", function() {
            // Save all the data for "Stripe Payment Processing" into an object
            const tableDataBeforeSorting = mainDashboard.getAllTableData("Stripe");
            // Sort the Table by amount
            mainDashboard.$amountTableHeader.click();
            // Save all the sorted data for "Stripe Payment Processing" into a new object
            const tableDataAfterSorting = mainDashboard.getAllTableData("Stripe");
            // Compare the contents of each object. They should match.
            expect(tableDataBeforeSorting).to.deep.equal(tableDataAfterSorting);
        });

        it("MailChimp Services: Sorting by 'Amounts' keeps the table's data in tact", function() {
            // Save all the data for "MailChimp Services" into an object
            const tableDataBeforeSorting = mainDashboard.getAllTableData("MailChimp");
            // Sort the Table by amount
            mainDashboard.$amountTableHeader.click();
            // Save all the sorted data for "c" into a new object
            const tableDataAfterSorting = mainDashboard.getAllTableData("MailChimp");
            // Compare the contents of each object. They should match.
            expect(tableDataBeforeSorting).to.deep.equal(tableDataAfterSorting);
        });

        it("Shopify Product: Sorting by 'Amounts' keeps the table's data in tact", function() {
            // Save all the sorted data for "Shopify Product" into an object
            const tableDataBeforeSorting = mainDashboard.getAllTableData("Shopify");
            // Sort the Table by amount
            mainDashboard.$amountTableHeader.click();
            // Save all the sorted data for "Shopify Product" into a new object
            const tableDataAfterSorting = mainDashboard.getAllTableData("Shopify");
            // Compare the contents of each object. They should match.
            expect(tableDataBeforeSorting).to.deep.equal(tableDataAfterSorting);
        });

        it("Ebay Marketplace: Sorting by 'Amounts' keeps the table's data in tact", function() {
            // Save all the sorted data for "Ebay Marketplace" into an object
            const tableDataBeforeSorting = mainDashboard.getAllTableData("Ebay");
            // Sort the Table by amount
            mainDashboard.$amountTableHeader.click();
            // Save all the sorted data for "Ebay Marketplace" into a new object
            const tableDataAfterSorting = mainDashboard.getAllTableData("Ebay");
            // Compare the contents of each object. They should match.
            expect(tableDataBeforeSorting).to.deep.equal(tableDataAfterSorting);
        });

        it("Templates Inc: Sorting by 'Amounts' keeps the table's data in tact", function() {
            // Save all the sorted data for "Templates Inc." into an object
            const tableDataBeforeSorting = mainDashboard.getAllTableData("Templates");
            // Sort the Table by amount
            mainDashboard.$amountTableHeader.click();
            // Save all the sorted data for "Templates Inc." into a new object
            const tableDataAfterSorting = mainDashboard.getAllTableData("Templates");
            // Compare the contents of each object. They should match.
            expect(tableDataBeforeSorting).to.deep.equal(tableDataAfterSorting);
        });
    });

    describe.skip("Canvas Chart Test", function() {

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

        it("Validating the number of bars and their heights", function() {
            // Ideally, this chart data would be coming from a request which I could perform validation on.
            // I can see the JavaScript tag below "#container"...
            // But I honestly have no idea how to do this using the 'traditional' way.
        });

        it("Clicking 'Show Data For Next Year' adds the desired data to the chart", function() {
            compareExpensesPage.$showDataForNextYearButton.click();
            // Ideally, this chart data would be coming from a request which I could perform validation on.
            // I can see the JavaScript tag below "#container"...
            // But I honestly have no idea how to do this using the 'traditional' way.
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

        it("Cyber Monday: Expects the correct gif to be displayed", function() {
            const image = mainDashboard.$gifCyberMondayFlashSale.selector;
            expect(image).to.be.displayed();
            const imagePath = actions.getElementAttribute(image, "src");
            expect(imagePath, "The actual image displayed is not the expected image").to.contain("/flashSale.gif");
        });

        it("Flash Sale: Expects the correct gif to be displayed", function() {
            const image = mainDashboard.$gifFlashSale.selector;
            expect(image).to.be.displayed();
            const imagePath = actions.getElementAttribute(image, "src");
            expect(imagePath, "The actual image displayed is not the expected image").to.contain("/flashSale2.gif");
        });
        
    });

});