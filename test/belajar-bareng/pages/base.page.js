export class BasePage {
    async clickElement(element) {
        await element.waitForDisplayed({ timeout: 10000 });
        await element.click();
    }

    async setInputValue(element, value) {
        await element.waitForEnabled({ timeout: 10000 });
        await element.waitForDisplayed({ timeout: 10000 });
        await element.click();
        await element.clearValue();
        await element.setValue(value);
    }

    async hideKeyboardIfVisible() {
        if (await driver.isKeyboardShown()) {
            await driver.hideKeyboard();
        }
    }
}