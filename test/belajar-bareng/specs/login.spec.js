import { BELAJAR_BARANG_TEST_DATA } from '../data/index.js';
import loginPage from '../pages/login.page.js';

describe('Belajar Bareng - Login Page', () => {
    const { appPackage, login: loginTestCases } = BELAJAR_BARANG_TEST_DATA;

    beforeEach(async () => {
        await driver.activateApp(appPackage);
        await loginPage.titleForm.waitForDisplayed({ timeout: 15000 });
    });

    afterEach(async () => {
        await driver.terminateApp(appPackage);
    });

    for (const test of loginTestCases) {
        it(`[Regression] should ${test.name}`, async () => {
            if (test.email) {
                await loginPage.setInputValue(loginPage.usernameInput, test.email);
            }
            if (test.password) {
                await loginPage.setInputValue(loginPage.passwordInput, test.password);
            }

            await loginPage.hideKeyboardIfVisible();
            await loginPage.clickElement(loginPage.loginBtn);

            const errorElement = loginPage.getErrorMessage(test.expectedError);
            await errorElement.waitForDisplayed({ timeout: 20000 });
            await expect(errorElement).toBeDisplayed();
        });
    }
});