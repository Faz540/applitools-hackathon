class MainDashboard {
    // Main Dashboard Elements:
    get $transactionTable() { return $("#transactionsTable") };
    get $amountTableHeader() { return $("#amount") };
    get $$amounts() { return $$(".text-right") };
    get $$tableRows() { return $$("#transactionsTable tbody tr") };

    // Main Dashboard Functions:
    getNumericalAmountValues() {
        // Get all the Table Data values, unfortunately the Table Header "AMOUNTS" is included in this.
        let rawNumericAmounts = this.$$amounts.map(function(tableData) {
            return tableData.getText();
        });
        // The first element in the array is our Table Header, let's remove that.
        rawNumericAmounts.shift();

        const trueNumericAmounts = rawNumericAmounts.map(function(amount) {
            return parseFloat(amount
            .replace("+", "") // Remove any "+" symbols
            .replace("USD", "") // Remove "USD" from all values
            .replace(",", "") // Remove commas from larger numbers
            .replace("- ", "-") // Remove the space after the negative symbol
            .trim() // Remove any whitespace before or after the values
            ); // Convert the result to a Float
        });
        return trueNumericAmounts;
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
        const tableData = {
            "description": description,
            "status": this.getStatus(description),
            "date": this.getDate(description),
            "category": this.getCategory(description),
            "amount": this.getAmount(description)
        };
        return tableData;
    };
    
};

module.exports = new MainDashboard;