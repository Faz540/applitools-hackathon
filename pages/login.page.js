const waitUntil = require("../utils/waits");

class LoginPage {
    // Login Page Elements:
    get $logoImageLink() { return $(".logo-w img") };
    get $formHeader() { return $(".auth-header") };
    get $loginValidation() { return $(".alert-warning") };
    get $usernameIcon() { return $("#username + .pre-icon") };
    get $usernameLabel() { return $("//label[text()='Username']") };
    get $username() { return $("#username") };
    get $passwordIcon() { return $("#password + .pre-icon") };
    get $passwordLabel() { return $("//label[text()='Password']") };
    get $password() { return $("#password") };
    get $loginButton() { return $("#log-in") };
    get $rememberMeCheckbox() { return $(".form-check-label") };
    get $twitterImageLink() { return $("img[src*='twitter']") };
    get $facebookImageLink() { return $("img[src*='facebook']") };
    get $linkedInImageLink() { return $("img[src*='linkedin']") };

    // Login Page Functions:
    open() {
        browser.url("");
        return waitUntil.elementIsDisplayed(this.$loginButton);
    }

    submitForm(username, password) {
        this.$username.setValue(username);
        this.$password.setValue(password);
        return this.$loginButton.click();
    };
};

module.exports = new LoginPage;