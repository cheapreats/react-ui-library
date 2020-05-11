const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    devtool: 'inline-source-map',
    entry: './src/index.ts',
    output: {
        filename: './bundle.js',
    },
    resolve: {
        plugins: [
            new TsconfigPathsPlugin({
                configFile: 'tsconfig.json',
            }),
        ],
        alias: {
            '@Layouts': path.resolve(__dirname, './src/Fragments'),
            '@Containers': path.resolve(__dirname, './src/Containers'),
            '@Inputs': path.resolve(__dirname, './src/Inputs'),
            '@Text': path.resolve(__dirname, './src/Text'),
            '@Themes': path.resolve(__dirname, './src/Themes'),
            '@Utils': path.resolve(__dirname, './src/Utils'),
        },
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js', '.d.ts'],
    },
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.tsx?$/, loader: 'ts-loader' },
            { test: /\.css$/, use: 'css-loader' },
        ],
    },
};
