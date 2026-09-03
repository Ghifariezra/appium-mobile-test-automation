import { config as baseConfig } from './wdio.conf.js';
import path from 'path';

export const config = {
    ...baseConfig,
    specs: [
        [
            path.join(process.cwd(), 'test/specs/demo/login.spec.js').replace(/\\/g, '/')
        ]
    ],
    capabilities: [{
        platformName: 'Android',
        'appium:app': path.join(process.cwd(), 'apps', 'mda-2.2.0-25.apk'),
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': 'emulator-5554',
        'appium:appPackage': 'com.saucelabs.mydemoapp.android',
        'appium:appActivity': 'com.saucelabs.mydemoapp.android.view.activities.SplashActivity',
        'appium:noReset': true,
    }],
    reporters: [
        'spec',
        ['allure', { outputDir: 'allure-results/demo' }]
    ]
};