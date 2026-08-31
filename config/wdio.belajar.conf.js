import { ENV } from './env.conf.js';
import { config as baseConfig } from './wdio.conf.js';
import path from 'path';

export const config = {
    ...baseConfig,
    logLevel: 'error',
    specs: [
        [
            path.join(process.cwd(), 'test/belajar-bareng/specs/register.spec.js').replace(/\\/g, '/'),
            path.join(process.cwd(), 'test/belajar-bareng/specs/login.spec.js').replace(/\\/g, '/')
        ]
    ],
    capabilities: [{
        platformName: 'Android',
        'appium:app': path.join(process.cwd(), 'apps', 'app-release.apk'),
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': ENV.DEVICE_NAME,
        'appium:udid': ENV.UDID,
        'appium:appPackage': 'com.example.belajar_bareng',
        'appium:appActivity': 'com.example.belajar_bareng.MainActivity',
        'appium:noReset': true,
        'appium:autoGrantPermissions': true,
        'appium:ignoreHiddenApiPolicyError': true
    }],
    reporters: [
        'spec',
        ['allure', { outputDir: 'allure-results/belajar-bareng' }]
    ],
};