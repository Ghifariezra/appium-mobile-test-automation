import { faker } from '@faker-js/faker';
import { getRegisterTestCases } from './register.data.js';
import { getLoginTestCases } from './login.data.js';

export const BELAJAR_BARANG_TEST_DATA = Object.freeze({
    appPackage: 'com.example.belajar_bareng',
    register: getRegisterTestCases(faker),
    login: getLoginTestCases(faker)
});