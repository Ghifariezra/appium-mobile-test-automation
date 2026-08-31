const userFields = {
    email: 'tester@example.com',
    password: '123456',
};

const loginErrorMessages = Object.freeze({
    emptyFields: 'Semua field wajib diisi.',
    invalidCredentials: 'Email atau password yang Anda masukkan salah.',
    loginSuccess: 'Login berhasil'
});

export const getLoginTestCases = (faker) => [
    {
        name: 'show error when fields are empty',
        expectedError: loginErrorMessages.emptyFields
    },
    {
        name: 'show error when email is missing',
        password: faker.internet.password(),
        expectedError: loginErrorMessages.emptyFields
    },
    {
        name: 'show error when credentials are invalid',
        email: faker.internet.email(),
        password: faker.internet.password(),
        expectedError: loginErrorMessages.invalidCredentials
    },
    {
        name: 'handle SQL injection attempt in email',
        email: "' OR '1'='1",
        password: faker.internet.password(),
        expectedError: loginErrorMessages.invalidCredentials
    },
    {
        name: 'successfully login with valid credentials',
        ...userFields,
        expectedError: loginErrorMessages.loginSuccess
    }
];