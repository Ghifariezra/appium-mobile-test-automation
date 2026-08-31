import { LoginLocators } from "../locators/index.js";
import { BasePage } from "./base.page.js";

export class LoginPage extends BasePage {
    #locators = new LoginLocators();

    get usernameInput() { return this.#locators.usernameInput; }
    get passwordInput() { return this.#locators.passwordInput; }
    get loginBtn() { return this.#locators.loginBtn; }
    get titleForm() { return this.#locators.titleForm; }
    get toRegister() { return this.#locators.toRegister; }

    getErrorMessage(expectedMessage) {
        return this.#locators.getErrorMessage(expectedMessage);
    }
}

export default new LoginPage();