const { aliases } = require('./package.json');

module.exports = {
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    extends: [
        'airbnb',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'prettier',
        'prettier/@typescript-eslint',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    settings: {
        'import/resolver': {
            alias: {
                map: Object.entries(aliases).map(item => {
                    item[1] = `./${  item[1]}`;
                    return item;
                }),
                extensions: ['.ts', '.tsx', '.json'],
            },
        },
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'react'],
    rules: {
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-use-before-define': ['off'],
        '@typescript-eslint/no-shadow': 'error',
        '@typescript-eslint/ban-types': [ 'off' ],
        'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-indent': ['error', 4],
        'react/jsx-props-no-spreading': ['off'],
        'react/prop-types': 'off',
        'import/namespace': ['error', { allowComputed: true }],
        'import/prefer-default-export': 'off',
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': 'off',
        'no-shadow': 'off',
        'no-use-before-define': [0],
        'no-underscore-dangle': 'off',
        'no-param-reassign': 'off',
        indent: ['error', 4],
    },
};
