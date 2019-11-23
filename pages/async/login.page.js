const waitUntil = require("../../utils/async/waits");
const version = process.env.VERSION || "";

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
    async open() {
        browser.url(`/hackathon${version}.html?showAd=true`);
        const loginButton = await this.$loginButton;
        return await waitUntil.elementIsDisplayed(loginButton);
    };

    async submitForm(username, password) {
        const user = await this.$username;
        await user.setValue(username);

        const pword = await this.$password;
        await pword.setValue(password);

        const logButton = await this.$loginButton;
        return await logButton.click();
    };
};

module.exports = new LoginPage;