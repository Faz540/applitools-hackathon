const waitUntil = require("../../utils/async/waits");
const loginPage = require("../../pages/async/login.page");
const mainDashboard = require("../../pages/async/mainDashboard.page");
const compareExpensesPage = require("../../pages/async/compareExpenses.page");
const version = process.env.VERSION || "";

const { Eyes, Target } = require('@applitools/eyes-webdriverio');

const eyes = new Eyes();
eyes.setApiKey(process.env.APPLITOOLS_KEY);
const viewPortSize =  { width: 1400, height: 1900 }
let appName;

describe("WebdriverIO v5 with Official Applitools Eyes SDK:", function () {
    this.timeout(600000); // 10 seconds
    
    before(async function () {
        await loginPage.open();
        await eyes.setBatch("Hackathon");
    });
    
    afterEach(async function() {
        await eyes.closeAsync();
    });
    
    after(async function() {
        await eyes.abortIfNotClosed();
    })
    
    describe("Login Page UI Elements Test", function() {
        
        before(async function() {
            appName = "Login Page";
            await loginPage.open();
            eyes.setMatchLevel("Strict");
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
        
        before(async function() {
            appName = "Login Page";
            eyes.setMatchLevel("Strict");
        });

        beforeEach(async function() {
            // Reload the Login Page before each test to reset any validation displayed.
            await loginPage.open();
        });
        
        it("Blank Username & Password - Validation is displayed when submitted", async function() {
            await eyes.open(browser, appName, this.test.title, viewPortSize);
            await loginPage.submitForm("", "");
            const formValidation = await loginPage.$loginValidation;
            await eyes.check("Login Form - Blank Username & Password Validation", Target.region(formValidation.selector));
        });
        
        it("Blank Password - Validation is displayed when submitted", async function() {
            await eyes.open(browser, appName, this.test.title, viewPortSize);
            await loginPage.submitForm("test@test.com", "");
            const formValidation = await loginPage.$loginValidation;
            await eyes.check("Login Form - Blank Password Validation", Target.region(formValidation.selector));
        });
        
        it("Blank Username - Validation is displayed when submitted", async function() {
            await eyes.open(browser, appName, this.test.title, viewPortSize);
            await loginPage.submitForm("", "password123");
            const formValidation = await loginPage.$loginValidation;
            await eyes.check("Login Form - Blank User Validation", Target.region(formValidation.selector));
        });
        
        it("Successful Login - User is taken to the desired page", async function() {
            await eyes.open(browser, appName, this.test.title, viewPortSize);
            await loginPage.submitForm("test@test.com", "password123");
            const transactionsTable = await mainDashboard.$transactionTable;
            await waitUntil.elementIsDisplayed(transactionsTable);
            const pageContent = await mainDashboard.$content;
            await eyes.check("Main Dashboard", Target.region(pageContent.selector));
        });
    });
    
    describe("Table Sort Test", function() {
        
        before(async function() {
            appName = "Dashboard";
            eyes.setMatchLevel("Strict");
            await loginPage.open();
            await loginPage.submitForm("test@test.com", "password123");
            await waitUntil.pageURLIsNoLonger(`/hackathon${version}.html?showAd=true`);
        });
        
        afterEach(async function() {
            // Refresh the Dashboard to reset any 'Sorting' that is applied
            await browser.refresh();
        });
        
        it("Pre-Sorted Amounts - Table is displayed with the correct data", async function() {
            await eyes.open(browser, appName, this.test.title, viewPortSize);
            const transactionTable = await mainDashboard.$transactionTable;
            await eyes.check("Pre-Sorted Recent Transactions - Table is displayed", Target.region(transactionTable.selector));
        });
        
        it("Sorted Amounts - Table is displayed with the correct data", async function() {
            await eyes.open(browser, appName, this.test.title, viewPortSize);
            const sortByAmount = await mainDashboard.$amountTableHeader;
            await sortByAmount.click();
            const transactionTable = await mainDashboard.$transactionTable;
            await eyes.check("Sorted Recent Transactions - Table is displayed", Target.region(transactionTable.selector));
        });
    });

    describe("Canvas Chart Test", function() {

        before(async function() {
            appName = "Expenses Bar Chart";
            eyes.setMatchLevel("Strict");
            await loginPage.open();
            await loginPage.submitForm("test@test.com", "password123");
            await waitUntil.pageURLIsNoLonger("/hackathon.html");
            const compareExpenses = await mainDashboard.$compareExpensesButton;
            await compareExpenses.click();
            await waitUntil.pageURLIncludes("/hackathonChart.html");
            const barChart = await compareExpensesPage.$canvasChart;
            await waitUntil.elementIsDisplayed(barChart);
        });

        afterEach(async function() {
            // Refresh the Dashboard to reset any 'Sorting' that is applied
            await browser.refresh();
            const barChart = await compareExpensesPage.$canvasChart;
            await waitUntil.elementIsDisplayed(barChart);
        });

        it("Compare Expenses Bar Chart - Chart is displayed", async function() {
            await eyes.open(browser, appName, this.test.title, viewPortSize);
            const barChart = await compareExpensesPage.$canvasChart;
            await eyes.check("2017 > 2018 Bar Chart - Table is displayed", Target.region(barChart.selector));
        });

        it("Clicking 'Show Data For Next Year' adds the desired data to the chart", async function() {
            await eyes.open(browser, appName, this.test.title, viewPortSize);
            const showDataForNextYear = await compareExpensesPage.$showDataForNextYearButton;
            await showDataForNextYear.click();
            await browser.pause(2000); // Wait for animated bar chart to update
            const barChart = await compareExpensesPage.$canvasChart;
            await eyes.check("2017 > 2019 Bar Chart - Table is displayed With Updated Values", Target.region(barChart.selector));
        });
    });

    describe("Dynamic Content Test", function() {
        
        before(async function() {
            appName = "Dashboard";
            eyes.setMatchLevel("Layout");
            await loginPage.open();
            await loginPage.submitForm("test@test.com", "password123");
            await waitUntil.pageURLIsNoLonger("/hackathon.html");
        });

        afterEach(async function() {
            await browser.refresh();
        });

        it("Dynamic Content - The correct gifs are displayed", async function() {
            await eyes.open(browser, appName, this.test.title, viewPortSize);
            const financialOverviewSection = await mainDashboard.$finanicalOverviewSection;
            await eyes.check("Gifs - The correct gifs are displayed", Target.region(financialOverviewSection.selector));
        });
    });
    
});