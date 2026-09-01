import { AuthLocators } from './auth.locator.js';

export class LoginLocators extends AuthLocators {
    #titleForm = '~Belajar Bareng';
    #usernameInput = '//android.widget.EditText[@resource-id="email_input"]';
    #passwordInput = '//android.widget.EditText[@resource-id="password_input"]';
    #loginBtn = 'Login';
    #toRegister = 'Belum punya akun? Register';

    get titleForm() { return $(this.#titleForm); }
    get usernameInput() { return $(this.#usernameInput); }
    get passwordInput() { return $(this.#passwordInput); }
    get loginBtn() { return this.getButton(this.#loginBtn); }
    get toRegister() { return this.getButton(this.#toRegister); }
}