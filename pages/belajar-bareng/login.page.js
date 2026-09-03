import { LoginLocators } from "../../locators/belajar-bareng/index.js";
import { BasePage } from "../base.page.js";

export class LoginPage extends BasePage {
    #loginLocators = new LoginLocators();

    // Login Page Locators
    get usernameInput() { return this.#loginLocators.usernameInput; }
    get passwordInput() { return this.#loginLocators.passwordInput; }
    get loginBtn() { return this.#loginLocators.loginBtn; }
    get titleForm() { return this.#loginLocators.titleForm; }
    get toRegister() { return this.#loginLocators.toRegister; }

    async login(email, password, expectedError, typeTest) {
        switch (typeTest) {
            case 'regression':
                if (email) {
                    await this.usernameInput.clearValue();
                    await this.setInputValue(this.usernameInput, email);
                }
                if (password) {
                    await this.passwordInput.clearValue();
                    await this.setInputValue(this.passwordInput, password);
                }
                break;
            case 'smoke':
                await this.setInputValue(this.usernameInput, email);
                await this.setInputValue(this.passwordInput, password);
                break;
            default:
                throw new Error(`Invalid typeTest: ${typeTest}`);
        }

        await this.hideKeyboardIfVisible();
        await this.clickElement(this.loginBtn);
        await this.hideKeyboardIfVisible();

        const errorElement = this.getErrorMessage(expectedError);
        await errorElement.waitForExist({ timeout: 10000 });
        await errorElement.waitForDisplayed({ timeout: 5000 });

        return errorElement;
    }

    getErrorMessage(expectedMessage) { return this.#loginLocators.getErrorMessage(expectedMessage); }
}

export default new LoginPage();