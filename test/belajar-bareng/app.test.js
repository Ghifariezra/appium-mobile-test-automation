describe('Belajar Bareng - Open App', () => {
    after(async () => {
        await driver.pause(5000);
        await driver.closeApp();
    });

    it('should launch the Belajar Bareng app', async () => {
        console.log(' Application opened successfully');
    });
});