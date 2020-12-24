const { aliases } = require('../package.json');
const path = require('path');

module.exports = {
    stories: ['../src/**/*.stories.@(js|mdx|tsx|ts|jsx)'],
    addons: ['@storybook/addon-docs', '@storybook/addon-viewport','@storybook/addon-controls', '@storybook/addon-actions/', '@storybook/addon-links/', '@storybook/addon-toolbars', '@storybook/addon-a11y', '@storybook/addon-backgrounds'],
    webpackFinal: async (config, { configType }) => {
        Object.entries(aliases).forEach(([key, val]) => {
            config.resolve.alias[key] = path.resolve(__dirname, `../${val}`);
        });
        config.module.rules.push({
            test: /\.(ts|tsx)$/,
            use: [
                {
                    loader: require.resolve('awesome-typescript-loader'),
                    options: {
                        transpileOnly: true
                    }
                },
                {
                    loader: require.resolve('react-docgen-typescript-loader')
                }
            ]
        });
        config.resolve.extensions.push('.ts', '.tsx');
        return config;
    },

};