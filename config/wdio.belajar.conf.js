import { config as baseConfig } from './wdio.conf.js';
import path from 'path';

export const config = {
    ...baseConfig,
    specs: [path.join(process.cwd(), 'test/belajar-bareng/**/*.js')],
    capabilities: [{
        platformName: 'Android',
        'appium:app': path.join(process.cwd(), 'apps', 'app-release.apk'),
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': 'emulator-5554',
        'appium:appPackage': 'com.example.belajar_bareng',
        'appium:appActivity': 'com.example.belajar_bareng.MainActivity',
        'appium:noReset': true,
    }],
    reporters: [
        'spec',
        ['allure', { outputDir: 'allure-results/belajar-bareng' }]
    ]
};