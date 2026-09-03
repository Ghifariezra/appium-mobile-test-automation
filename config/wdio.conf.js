/*
    For Experimental:
        1. Testing for Demo APK
        2. Testing for Belajar Bareng APK

    NOTED: 
        I am very curious about this, I wonder if that's possible.
*/
export const config = {
    runner: 'local',

    hostname: '127.0.0.1',
    port: 4723,
    path: '/',

    maxInstances: 1,

    framework: 'mocha',
    mochaOpts: {
        timeout: 60000,
    },
    logLevel: 'error',
};