const secretPassword = 'Secret123!';

const registerErrorMessages = Object.freeze({
    emptyFields: 'Semua field wajib diisi.',
    invalidEmail: 'Unable to validate email address: invalid format',
    passwordTooShort: 'Password minimal 6 karakter.',
    registrationSuccess: 'Register berhasil, silakan login',
    usernameExists: 'Username sudah digunakan.',
    emailExists: 'Email sudah digunakan. Silakan login.'
});

export const getRegisterTestCases = (faker) => [
    // --- NEGATIVE CASES ---
    {
        name: 'show error when fields are empty',
        expectedError: registerErrorMessages.emptyFields
    },
    {
        name: 'show error when email is missing',
        username: faker.internet.username(),
        password: secretPassword,
        expectedError: registerErrorMessages.emptyFields
    },
    {
        name: 'show error when password is missing',
        username: faker.internet.username(),
        email: faker.internet.email(),
        expectedError: registerErrorMessages.emptyFields
    },
    {
        name: 'show error when username is missing',
        email: faker.internet.email(),
        password: secretPassword,
        expectedError: registerErrorMessages.emptyFields
    },
    {
        name: 'show error when email is invalid',
        username: faker.internet.username(),
        email: 'invalid-email',
        password: secretPassword,
        expectedError: registerErrorMessages.invalidEmail
    },
    {
        name: 'show error when password less than 6 characters',
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: '123',
        expectedError: registerErrorMessages.passwordTooShort
    },
    {
        name: 'show error when username already exists',
        username: 'qa.tester',
        email: faker.internet.email(),
        password: secretPassword,
        expectedError: registerErrorMessages.usernameExists
    },
    {
        name: 'show error when email already exists',
        username: faker.internet.username(),
        email: 'qa.tester@qa.tester.com',
        password: secretPassword,
        expectedError: registerErrorMessages.emailExists
    },

    // --- POSITIVE CASES ---
    {
        name: 'successfully register with valid credentials',
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: secretPassword,
        expectedError: registerErrorMessages.registrationSuccess,
    },

    // --- EDGE CASES ---
    {
        name: 'handle SQL injection attempt in email',
        username: faker.internet.username(),
        email: "' OR '1'='1",
        password: secretPassword,
        expectedError: registerErrorMessages.invalidEmail
    },
    {
        /*
            Why i set expectedError to usernameExists? 
            Because the backend will check if the username already exists in the database, previously, the username "' OR '1'='1" was registered in the database, so the backend will return the error message "Username sudah digunakan."
        */
        name: 'handle SQL injection attempt in username',
        username: "' OR '1'='1",
        email: faker.internet.email(),
        password: secretPassword,

        expectedError: registerErrorMessages.usernameExists
    },
    {
        name: 'handle SQL injection attempt in password',
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: "' OR '1'='1",
        expectedError: registerErrorMessages.registrationSuccess
    }
];