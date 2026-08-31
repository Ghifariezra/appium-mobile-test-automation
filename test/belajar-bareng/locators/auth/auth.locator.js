export class AuthLocators {
    #button = (buttonText) => `//android.widget.Button[@content-desc="${buttonText}"]`;

    getErrorMessage(message) {
        return $(`//*[contains(@content-desc, "${message}") or contains(@text, "${message}")]`);
    }

    getButton(buttonText) {
        return $(this.#button(buttonText));
    }
}