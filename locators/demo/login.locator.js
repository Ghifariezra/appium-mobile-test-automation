import { BaseLocators } from "./base.locator";

export class LoginLocators extends BaseLocators {
    #usernameInput = '//android.widget.EditText[@resource-id="com.saucelabs.mydemoapp.android:id/nameET"]';
    #passwordInput = '//android.widget.EditText[@resource-id="com.saucelabs.mydemoapp.android:id/passwordET"]';
    #loginBtn = 'Tap to login with given credentials';

    get usernameInput() { return $(this.#usernameInput); }
    get passwordInput() { return $(this.#passwordInput); }
    get loginBtn() { return this.getButton(this.#loginBtn); }
}