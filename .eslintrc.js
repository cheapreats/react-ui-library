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
                map: [
                    ['@Containers', './src/Containers'],
                    ['@Layouts', './src/__Layouts'],
                    ['@Inputs', './src/Inputs'],
                    ['@Text', './src/Text'],
                    ['@Themes', './src/Themes'],
                    ['@Utils', './src/Utils'],
                ],
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
        'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-indent': ['error', 4],
        'react/prop-types': 'off',
        'import/namespace': ['error', { allowComputed: true }],
        'import/prefer-default-export': 'off',
        'no-underscore-dangle': 'off',
        'no-param-reassign': 'off',
        indent: ['error', 4],
    },
};
