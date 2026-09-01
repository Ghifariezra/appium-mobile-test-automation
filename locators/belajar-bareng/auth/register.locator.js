import { AuthLocators } from './auth.locator.js';

export class RegisterLocators extends AuthLocators {
    #formRegister = '//android.view.View[contains(@content-desc, "Create Account")]';
    #input = (id) => `${this.#formRegister}//android.widget.EditText[${id}]`;
    #registerBtn = 'Register';

    get formRegister() { return $(this.#formRegister); }
    getInput(id) { return $(this.#input(id)); }
    get registerBtn() { return this.getButton(this.#registerBtn); }
}