describe('SauceLabs Demo - Open App', () => {
    after(async () => {
        await driver.pause(5000);
        await driver.closeApp();
    });

    it('should launch the SauceLabs Demo app', async () => {
        console.log(' Application opened successfully');
    });
});