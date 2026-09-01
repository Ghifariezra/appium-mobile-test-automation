const postData = Object.freeze({
    content: `Ini adalah konten post baru. ${Date.now()}`,
});

const postErrorMessages = Object.freeze({
    postSuccess: 'Post berhasil',
});

export const getPostTestCases = () => [
    {
        name: "logout successfully",
    },
    {
        name: 'create a new post and logout successfully',
        ...postData,
        expectedError: postErrorMessages.postSuccess,
    },
];