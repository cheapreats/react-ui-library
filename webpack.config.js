const webpack = require('webpack');
const pkg = require('./package.json');
const path = require('path');

module.exports = {
    entry: path.join(__dirname, '/src/index.js'),
    mode: process.env.ENV || 'development',
    output: {
        path: path.join(__dirname, '/dist'),
        libraryTarget: 'commonjs',
        filename: pkg.main
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    externals : {
        'react': 'react',
        'styled-components': 'styled-components'
    }
};