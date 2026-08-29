export class LoginLocators {
    #titleForm = '//android.widget.ImageView[@content-desc="Belajar Bareng"]';
    #usernameInput = '//*[@resource-id="email_input"]'; 
    #passwordInput = '//*[@resource-id="password_input"]';
    #loginBtn = '~Login';
    #registerBtn = '//android.widget.Button[@content-desc="Belum punya akun? Register"]';

    get titleForm() { return $(this.#titleForm); }
    get usernameInput() { return $(this.#usernameInput); }
    get passwordInput() { return $(this.#passwordInput); }
    get loginBtn() { return $(this.#loginBtn); }
    get registerBtn() { return $(this.#registerBtn); }

    getErrorMessage(expectedMessage) {
        return $(`//android.view.View[@content-desc="${expectedMessage}"]`);
    }
}