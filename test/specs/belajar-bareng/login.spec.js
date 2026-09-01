// Data
import { BELAJAR_BARANG_TEST_DATA } from '../../../data/belajar-bareng/index.js';
import { userFields, loginErrorMessages } from '../../../data/belajar-bareng/login.data.js';

// Page Objects
import loginPage from '../../../pages/belajar-bareng/login.page.js';
import homePage from '../../../pages/belajar-bareng/home.page.js';

// Test Types
const TYPE_TEST = {
    REGRESSION: 'Regression',
    SMOKE: 'Smoke'
};

describe('Belajar Bareng - Login Page', () => {
    const {
        appPackage,
        login: loginTestCases,
        post: postTestCases
    } = BELAJAR_BARANG_TEST_DATA;

    beforeEach(async () => {
        await driver.activateApp(appPackage);
        await loginPage.titleForm.waitForDisplayed({ timeout: 15000 });
    });

    afterEach(async () => {
        await driver.terminateApp(appPackage);
    });

    // Regression Test Cases for Login
    for (const test of loginTestCases) {
        it(`[${TYPE_TEST.REGRESSION}] should ${test.name}`, async () => {
            const errorElement = await loginPage.login(
                test.email,
                test.password,
                test.expectedError,
                TYPE_TEST.REGRESSION.toLowerCase()
            );

            await expect(errorElement).toBeDisplayed();
        });
    }

    // Smoke Test Cases for Post & Logout
    for (const test of postTestCases) {
        it(`[${TYPE_TEST.SMOKE}] should ${test.name.replace(/^should\s+/, '')}`, async () => {
            const errorElement = await loginPage.login(
                userFields.email,
                userFields.password,
                loginErrorMessages.loginSuccess,
                TYPE_TEST.SMOKE.toLowerCase()
            );
            await expect(errorElement).toBeDisplayed();

            await homePage.titleHome.waitForDisplayed({ timeout: 15000 });
            await expect(homePage.titleHome).toBeDisplayed();

            if (test.content) {
                const createdPost = await homePage.postContent(test.content);
                await expect(createdPost).toBeDisplayed();
            }

            await homePage.clickElement(homePage.logoutBtn);

            await loginPage.titleForm.waitForDisplayed({ timeout: 15000 });
            await expect(loginPage.titleForm).toBeDisplayed();
        });
    }
});