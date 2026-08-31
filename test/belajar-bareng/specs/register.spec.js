import { BELAJAR_BARANG_TEST_DATA } from '../data/index.js';
import loginPage from '../pages/login.page.js';
import registerPage from '../pages/register.page.js';

/*
    CAPAIBILITY FOR APPIUM INSPECTOR:
    {
        "platformName": "Android",
        "appium:automationName": "UiAutomator2",
        "appium:deviceName": "emulator-5554",
        "appium:appPackage": "com.example.belajar_bareng",
        "appium:appActivity": "com.example.belajar_bareng.MainActivity",
        "appium:noReset": true
    }
*/

describe('Belajar Bareng - Register Page', () => {
    const {
        appPackage,
        register: registerTestCases
    } = BELAJAR_BARANG_TEST_DATA;

    beforeEach(async () => {
        await driver.activateApp(appPackage);
        await loginPage.toRegister.waitForDisplayed({ timeout: 10000 }).catch(() => { });
        const isLoginScreen = await loginPage.toRegister.isDisplayed().catch(() => false);
        if (isLoginScreen) {
            await loginPage.clickElement(loginPage.toRegister);
        }

        await registerPage.formRegister.waitForDisplayed({ timeout: 15000 });
    });

    afterEach(async () => {
        await driver.terminateApp(appPackage);
    });

    for (const test of registerTestCases) {
        it(`[Regression] should ${test.name}`, async () => {
            if (test.username) {
                await registerPage.setInputValue(registerPage.usernameInput, test.username);
            }
            if (test.email) {
                await registerPage.setInputValue(registerPage.emailInput, test.email);
            }
            if (test.password) {
                await registerPage.setInputValue(registerPage.passwordInput, test.password);
            }

            await registerPage.hideKeyboardIfVisible();
            await registerPage.clickElement(registerPage.registerBtn);

            const resultElement = registerPage.getErrorMessage(test.expectedError);
            await resultElement.waitForDisplayed({ timeout: 20000 });

            await expect(resultElement).toBeDisplayed();
        });
    }
});