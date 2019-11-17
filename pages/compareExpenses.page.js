class CompareExpenses {
    // Compare Expenses Page Elements:
    get $canvasChart() { return $("#canvas") };
    get $showDataForNextYearButton() { return $("#addDataset") };


    // Compare Expenses Page Functions:
    showDataForNextYear() {
        return this.$showDataForNextYearButton.click();
    }

};

module.exports = new CompareExpenses;