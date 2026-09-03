import { getLoginTestCases } from "../../../data/demo/login.data.js";
import loginPage from "../../../pages/demo/login.page.js";

const APP_PACKAGE = 'com.saucelabs.mydemoapp.android';
const TYPE_TEST = {
    REGRESSION: 'Regression',
    SMOKE: 'Smoke'
};

describe('SauceLabs Demo - Login Page', () => {
    beforeEach(async () => {
        await driver.activateApp(APP_PACKAGE);
        await loginPage.titleHeader.waitForDisplayed({ timeout: 15000 });

        await loginPage.humbergerMenu.waitForExist({ timeout: 10000 });
        await loginPage.humbergerMenu.waitForDisplayed({ timeout: 10000 });
        await loginPage.clickElement(loginPage.humbergerMenu);

        await loginPage.clickElement(loginPage.loginMenu);
    });

    afterEach(async () => {
        await driver.terminateApp(APP_PACKAGE);
    });

    // Regression Test Cases for Login
    for (const test of getLoginTestCases()) {
        it(`[${TYPE_TEST.REGRESSION}] should ${test.name}`, async () => {
            const errorElement = await loginPage.login(
                test.username,
                test.password,
                test.expectedError,
                TYPE_TEST.REGRESSION.toLowerCase()
            );

            if (test.expectedError) {
                await expect(errorElement).toBeDisplayed();
                const errorText = await errorElement.getText();
                await expect(errorText).toEqual(test.expectedError);
            } else {
                await loginPage.titleHeader.waitForExist({ timeout: 10000 });
                await loginPage.titleHeader.waitForDisplayed({ timeout: 5000 });
                await expect(loginPage.titleHeader).toBeDisplayed();
            }
        });
    }
});