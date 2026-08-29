import loginPage from './pages/login.page.js';

describe('Belajar Bareng - Login Test Cases', () => {
    after(async () => {
        await driver.pause(2000);
        await driver.terminateApp('com.example.belajar_bareng');
    });

    it('should show error when login fields are empty', async () => {
        await loginPage.usernameInput.waitForDisplayed({ timeout: 10000 });

        // Klik login tanpa isi data
        await loginPage.clickElement(loginPage.loginBtn);

        // Expect pesan error empty field
        const emptyErrorElement = loginPage.getErrorMessage('Semua field wajib diisi.');
        await expect(emptyErrorElement).toBeDisplayed();
    });

    it('should show error when credentials are invalid', async () => {
        // Input email & password salah
        await loginPage.login('invalid@example.com', 'wrongpassword');

        // Expect pesan error invalid credentials
        const invalidErrorElement = loginPage.getErrorMessage('Email atau password yang Anda masukkan salah.');
        await expect(invalidErrorElement).toBeDisplayed();
    });

    it.skip('should successfully login with valid credentials', async () => {
        await loginPage.login('qa.tester@example.com', 'Secret123!');
        await driver.pause(3000);
    });
});