const tasks = arr => arr.join(' && ');

module.exports = {
    hooks: {
        'pre-commit': tasks([
            'npm run test',
            'npm run eslint:fix && npm run prettier:fix',
            'git add .',
        ]),
    },
};
