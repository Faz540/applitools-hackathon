class MainDashboard {
    // Main Dashboard Elements:
    get $compareExpensesButton() { return $("#showExpensesChart") };
    get $finanicalOverviewSection() { return $(".element-balances") };
    get $transactionTable() { return $("#transactionsTable") };
    get $amountTableHeader() { return $("#amount") };
    get $$amounts() { return $$(".text-right") };
    get $$tableRows() { return $$("#transactionsTable tbody tr") };
    get $gifCyberMondayFlashSale() { return $("#flashSale img") };
    get $gifFlashSale() { return $("#flashSale2 img") };
    
    // Main Dashboard Functions:
    getNumericalAmountValues() {
        
        // The below function takes a value from the "AMOUNTS" column (eg. "+ 1,250.00 USD")
        // It removes all characters from a string value that disable us from treating it as a Floating Point Number.
        // This function will be called in the below 'map'
        function removeRedundantDataFromAmount(amount) {
            return amount.getText()
                .replace("+", "") // Remove any "+" symbols
                .replace("USD", "") // Remove "USD" from all values
                .replace(",", "") // Remove commas from larger numbers
                .replace("- ", "-"); // Remove the space after the negative symbol
                //.trim(); // Remove any whitespace before or after the values
        };

        // Get all the text values from the "AMOUNTS" column.
        // Unfortunately the actual Table Header "AMOUNT" is also included in this.
        // So I'm using a 'filter' to give me all the things from the "AMOUNTS" column that DON'T have the text "AMOUNT"
        const rawNumericAmounts = this.$$amounts.filter(function(tableData) {
            return tableData.getText() !== "AMOUNT";
        });
       
        // Now that we have our amount values into an array, we're now ready to call the above "removeRedundantDataFromAmount" function.
        // I'm using a "map" which returns us a new array but uses a function on each element in the array provided.
        return rawNumericAmounts.map(function(amount) {
            // The result of the "removeRedundantDataFromAmount" function is converted to a Floating Point Number  
            return parseFloat(removeRedundantDataFromAmount(amount)); 
        });
    };
    
    getTableRow(description) {
        return this.$$tableRows.find(function(row) {
            return row.getText().includes(description);
        });
    };
    
    getStatus(description) {
        return this.getTableRow(description).$$("td")[0].getText();
    };
    
    getDate(description) {
        return this.getTableRow(description).$$("td")[1].getText();
    };
    
    getCategory(description) {
        return this.getTableRow(description).$$("td")[3].getText();
    };
    
    getAmount(description) {
        return this.getTableRow(description).$$("td")[4].getText();
    };
    
    getAllTableData(description) {
        return {
            "description": description,
            "status": this.getStatus(description),
            "date": this.getDate(description),
            "category": this.getCategory(description),
            "amount": this.getAmount(description)
        };
        //return tableData;
    };

};

module.exports = new MainDashboard;