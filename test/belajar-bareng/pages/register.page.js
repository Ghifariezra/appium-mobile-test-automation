import { RegisterLocators } from "../locators/index.js";
import { BasePage } from "./base.page.js";

export class RegisterPage extends BasePage {
    #locators = new RegisterLocators();

    get formRegister() { return this.#locators.formRegister; }
    getInput(id) { return this.#locators.getInput(id); }

    getErrorMessage(expectedMessage) {
        return this.#locators.getErrorMessage(expectedMessage);
    }

    get usernameInput() { return this.getInput(1); }
    get emailInput() { return this.getInput(2); }
    get passwordInput() { return this.getInput(3); }

    get registerBtn() { return this.#locators.registerBtn; }
}

export default new RegisterPage();