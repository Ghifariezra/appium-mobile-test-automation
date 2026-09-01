import { ENV } from './env.conf.js';
import { config as baseConfig } from './wdio.conf.js';
import path from 'path';

export const config = {
    ...baseConfig,
    logLevel: 'error',
    specs: [
        [
            // path.join(process.cwd(), 'test/specs/belajar-bareng/register.spec.js').replace(/\\/g, '/'),
            path.join(process.cwd(), 'test/specs/belajar-bareng/login.spec.js').replace(/\\/g, '/')
        ]
    ],
    capabilities: [{
        platformName: 'Android',
        'appium:app': path.join(process.cwd(), 'apps', 'app-release.apk'),
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': "emulator-5554",
        'appium:appPackage': 'com.example.belajar_bareng',
        'appium:appActivity': 'com.example.belajar_bareng.MainActivity',
        'appium:noReset': true,

        // If you want to use Real Device you can uncomment the following lines
        // 'appium:deviceName': ENV.DEVICE_NAME,
        // 'appium:udid': ENV.UDID,

        // This for permission issues on Android 9 and you dont know how to fix it, you can uncomment the following lines
        // 'appium:autoGrantPermissions': true,
        // 'appium:ignoreHiddenApiPolicyError': true
    }],
    reporters: [
        'spec',
        ['allure', { outputDir: 'allure-results/belajar-bareng' }]
    ],
};