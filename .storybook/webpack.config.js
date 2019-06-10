const { aliases } = require('../package.json');
const path = require('path');

module.exports = async ({ config }) => {
    Object.entries(aliases).forEach(([ key, val ]) => {
        config.resolve.alias[key] = path.resolve(__dirname, `../${ val }`);
    });
    config.module.rules.push({
        test: /\.(ts|tsx)$/,
        use: [
            {
                loader: require.resolve('awesome-typescript-loader')
            },
            {
                loader: require.resolve('react-docgen-typescript-loader')
            }
        ]
    });
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
};
