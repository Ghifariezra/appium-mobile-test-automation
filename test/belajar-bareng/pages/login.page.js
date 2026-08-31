import { LoginLocators, HomeLocators } from "../locators/index.js";
import { BasePage } from "./base.page.js";

export class LoginPage extends BasePage {
    #loginLocators = new LoginLocators();
    #homeLocators = new HomeLocators();

    // Login Page Locators
    get usernameInput() { return this.#loginLocators.usernameInput; }
    get passwordInput() { return this.#loginLocators.passwordInput; }
    get loginBtn() { return this.#loginLocators.loginBtn; }
    get titleForm() { return this.#loginLocators.titleForm; }
    get toRegister() { return this.#loginLocators.toRegister; }

    getErrorMessage(expectedMessage) { return this.#loginLocators.getErrorMessage(expectedMessage); }

    // Home Page Locators
    get titleHome() { return this.#homeLocators.titleHeader; }
    get logoutBtn() { return this.#homeLocators.logoutBtn; }
    get postInput() { return this.#homeLocators.postInput; }
    get postBtn() { return this.#homeLocators.postBtn; }
    get postList() { return this.#homeLocators.postList; }

    getPostByText(text) { return this.#homeLocators.getPostByText(text); }
}

export default new LoginPage();