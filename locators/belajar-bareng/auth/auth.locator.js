export class AuthLocators {
    #button = (buttonText) => `~${buttonText}`;

    getErrorMessage(message) {
        return $(`~${message}`);
    }

    getButton(buttonText) {
        return $(this.#button(buttonText));
    }
}