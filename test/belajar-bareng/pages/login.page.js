import { LoginLocators } from "../locators/login.locator.js";
import { BasePage } from "./base.page.js";

export class LoginPage extends BasePage {
    #locators = new LoginLocators();

    get usernameInput() { return this.#locators.usernameInput; }
    get passwordInput() { return this.#locators.passwordInput; }
    get loginBtn() { return this.#locators.loginBtn; }
    get titleForm() { return this.#locators.titleForm; }

    getErrorMessage(expectedMessage) {
        return this.#locators.getErrorMessage(expectedMessage);
    }

    async login(email, password) {
        await this.setInputValue(this.#locators.usernameInput, email);
        await this.setInputValue(this.#locators.passwordInput, password);
        await this.clickElement(this.#locators.loginBtn);
    }
}

export default new LoginPage();