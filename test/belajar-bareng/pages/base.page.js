export class BasePage {
    async clickElement(element) {
        await element.waitForDisplayed({ timeout: 10000 });
        await element.click();
    }

    async setInputValue(element, value) {
        await element.waitForDisplayed({ timeout: 10000 });
        await element.click();
        await element.setValue(value);
    }
}