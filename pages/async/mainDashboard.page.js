class MainDashboard {
    // Main Dashboard Elements:
    get $content() { return $(".content-i") };
    get $topMenu() { return $(".top-bar") }
    get $compareExpensesButton() { return $("#showExpensesChart") };
    get $finanicalOverviewSection() { return $(".element-balances") };
    get $transactionTable() { return $("#transactionsTable") };
    get $amountTableHeader() { return $("#amount") };
    get $$amounts() { return $$(".text-right") };
    get $$tableRows() { return $$("#transactionsTable tbody tr") };
    get $gifCyberMondayFlashSale() { return $("#flashSale img") };
    get $gifFlashSale() { return $("#flashSale2 img") };
    
};

module.exports = new MainDashboard;