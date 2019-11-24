class MainDashboard {
    // Main Dashboard Elements:
    get $topMenu() { return $(".top-bar") }
    get $compareExpensesButton() { return $("#showExpensesChart") };
    get $finanicalOverviewSection() { return $(".element-balances") };
    get $transactionTable() { return $("#transactionsTable") };
    get $amountTableHeader() { return $("#amount") };    
};

module.exports = new MainDashboard;