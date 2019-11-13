const _ = require('lodash');

const actions = require("../../utils/common-actions");
const waitUntil = require("../../utils/waits");
const loginPage = require("../../pages/login.page");
const mainDashboard = require("../../pages/mainDashboard.page");


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
            // Use Lodash (A JavaScript Utility Library) to sort amountsBeforeSorting in ascending order 
            const expectedResult = _.sortBy(amountsBeforeSorting);
            
            // Click the Amounts Table Header to sort the amounts in ascending order
            mainDashboard.$amountTableHeader.click();
            // Use our getNumericalAmountValues function again, but this time against the sorted amounts displayed
            const amountsAfterSorting = mainDashboard.getNumericalAmountValues();
            
            // Now we compare the two arrays.
            // The order of the amounts displayed should match the order we expected
            expect(amountsAfterSorting).to.deep.equal(expectedResult);
        });

        it("Starbucks: Sorting by 'Amounts' keeps the table's data in tact", function() {
            const tableDataBeforeSorting = mainDashboard.getAllTableData("Starbucks");
            mainDashboard.$amountTableHeader.click();
            const tableDataAfterSorting = mainDashboard.getAllTableData("Starbucks");
            expect(tableDataBeforeSorting).to.deep.equal(tableDataAfterSorting);
        });

        it("Stripe: Sorting by 'Amounts' keeps the table's data in tact", function() {
            const tableDataBeforeSorting = mainDashboard.getAllTableData("Stripe");
            mainDashboard.$amountTableHeader.click();
            const tableDataAfterSorting = mainDashboard.getAllTableData("Stripe");
            expect(tableDataBeforeSorting).to.deep.equal(tableDataAfterSorting);
        });

        it("MailChimp: Sorting by 'Amounts' keeps the table's data in tact", function() {
            const tableDataBeforeSorting = mainDashboard.getAllTableData("MailChimp");
            mainDashboard.$amountTableHeader.click();
            const tableDataAfterSorting = mainDashboard.getAllTableData("MailChimp");
            expect(tableDataBeforeSorting).to.deep.equal(tableDataAfterSorting);
        });

        it("Shopify: Sorting by 'Amounts' keeps the table's data in tact", function() {
            const tableDataBeforeSorting = mainDashboard.getAllTableData("Shopify");
            mainDashboard.$amountTableHeader.click();
            const tableDataAfterSorting = mainDashboard.getAllTableData("Shopify");
            expect(tableDataBeforeSorting).to.deep.equal(tableDataAfterSorting);
        });

        it("Ebay: Sorting by 'Amounts' keeps the table's data in tact", function() {
            const tableDataBeforeSorting = mainDashboard.getAllTableData("Ebay");
            mainDashboard.$amountTableHeader.click();
            const tableDataAfterSorting = mainDashboard.getAllTableData("Ebay");
            expect(tableDataBeforeSorting).to.deep.equal(tableDataAfterSorting);
        });

        it("Templates: Sorting by 'Amounts' keeps the table's data in tact", function() {
            const tableDataBeforeSorting = mainDashboard.getAllTableData("Templates");
            mainDashboard.$amountTableHeader.click();
            const tableDataAfterSorting = mainDashboard.getAllTableData("Templates");
            expect(tableDataBeforeSorting).to.deep.equal(tableDataAfterSorting);
        });
    });
});