import { BELAJAR_BARANG_TEST_DATA } from '../data/index.js';
import { userFields, loginErrorMessages } from '../data/login.data.js';
import loginPage from '../pages/login.page.js';

describe('Belajar Bareng - Login Page', () => {
    const { appPackage, login: loginTestCases, post: postTestCases } = BELAJAR_BARANG_TEST_DATA;

    beforeEach(async () => {
        await driver.activateApp(appPackage);
        await loginPage.titleForm.waitForDisplayed({ timeout: 15000 });
    });

    afterEach(async () => {
        await driver.terminateApp(appPackage);
    });

    // Regression Test Cases for Login
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

    // Smoke Test Cases for Post & Logout
    for (const test of postTestCases) {
        it(`[Smoke] should ${test.name.replace(/^should\s+/, '')}`, async () => {
            await loginPage.setInputValue(loginPage.usernameInput, userFields.email);
            await loginPage.setInputValue(loginPage.passwordInput, userFields.password);
            await loginPage.hideKeyboardIfVisible();
            await loginPage.clickElement(loginPage.loginBtn);

            const errorElement = loginPage.getErrorMessage(loginErrorMessages.loginSuccess);
            await errorElement.waitForDisplayed({ timeout: 20000 });
            await expect(errorElement).toBeDisplayed();

            await loginPage.titleHome.waitForDisplayed({ timeout: 15000 });
            await expect(loginPage.titleHome).toBeDisplayed();

            // 3. Jika test case memiliki data 'content', lakukan pembuatan Post
            if (test.content) {
                await loginPage.setInputValue(loginPage.postInput, test.content);
                await loginPage.hideKeyboardIfVisible();
                await loginPage.clickElement(loginPage.postBtn);

                // Verifikasi postingan baru berhasil tampil di feed
                const createdPost = loginPage.getPostByText(test.content);
                await createdPost.waitForDisplayed({ timeout: 10000 });
                await expect(createdPost).toBeDisplayed();
            }

            // 4. Eksekusi Logout
            await loginPage.clickElement(loginPage.logoutBtn);

            // 5. Verifikasi kembali ke halaman Login (Title Form Login muncul)
            await loginPage.titleForm.waitForDisplayed({ timeout: 15000 });
            await expect(loginPage.titleForm).toBeDisplayed();
        });
    }
});