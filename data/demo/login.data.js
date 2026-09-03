const userFields = Object.freeze({
    users: [
        'bod@example.com',
        'alice@example.com',
        'visual@example.com',
    ],
    password: '10203040'
});

const loginErrorMessages = Object.freeze({
    emptyFields: 'Username is required',
    missingPassword: 'Enter Password',
    lockedAccount: 'Sorry this user has been locked out.',
});

export const getLoginTestCases = () => [
    {
        name: 'show error when fields are empty',
        expectedError: loginErrorMessages.emptyFields
    },
    {
        name: 'show error when password is missing',
        username: userFields.users[0],
        expectedError: loginErrorMessages.missingPassword
    },
    {
        name: 'show error when account is locked',
        username: userFields.users[1],
        password: userFields.password,
        expectedError: loginErrorMessages.lockedAccount
    },
    {
        name: 'successfully login with valid credentials',
        username: userFields.users[0],
        password: userFields.password
    }
];