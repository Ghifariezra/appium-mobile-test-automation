import { LoginLocators } from "../../locators/demo/index.js";
import { BasePage } from "../base.page.js";

export class LoginPage extends BasePage {
    #loginLocators = new LoginLocators();

    // Header Locators
    get humbergerMenu() { return this.#loginLocators.humbergerMenu; }
    get titleHeader() { return this.#loginLocators.titleHeader; }
    get checkoutBtn() { return this.#loginLocators.checkoutBtn; }

    // Sidebar Locators
    get loginMenu() { return this.#loginLocators.loginMenu; }

    // Login Page Locators
    get usernameInput() { return this.#loginLocators.usernameInput; }
    get passwordInput() { return this.#loginLocators.passwordInput; }
    get loginBtn() { return this.#loginLocators.loginBtn; }

    // Error Messages
    get nameError() { return this.#loginLocators.nameError; }
    get passwordError() { return this.#loginLocators.passwordError; }

    // Utils
    async login(username, password, expectedError = null, typeTest = 'regression') {
        switch (typeTest) {
            case 'regression':
                if (username) {
                    await this.setInputValue(this.usernameInput, username);
                }
                if (password) {
                    await this.setInputValue(this.passwordInput, password);
                }
                break;
            case 'smoke':
                await this.setInputValue(this.usernameInput, username);
                await this.setInputValue(this.passwordInput, password);
                break;
            default:
                throw new Error(`Invalid typeTest: ${typeTest}`);
        }

        await this.hideKeyboardIfVisible();
        await this.clickElement(this.loginBtn);

        if (expectedError) {
            const errorElement = !username ? this.nameError : this.passwordError;

            await errorElement.waitForExist({ timeout: 10000 });
            await errorElement.waitForDisplayed({ timeout: 5000 });
            
            return errorElement;
        }
    }
}

export default new LoginPage();