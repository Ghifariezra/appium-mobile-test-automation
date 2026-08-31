import { loadEnvFile } from 'process';

try {
    loadEnvFile('.env');

    // Validate that the required environment variables are set
    const vars = process.env;
    if (!vars.DEVICE_NAME || !vars.UDID) {
        throw new Error('Required environment variables DEVICE_NAME and UDID are not set.');
    }
} catch (error) {
    throw new Error(`Failed to load environment variables: ${error.message}`);
}

export const ENV = Object.freeze({
    DEVICE_NAME: process.env.DEVICE_NAME,
    UDID: process.env.UDID,
});