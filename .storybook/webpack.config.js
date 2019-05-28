const { aliases } = require('../package.json');
const path = require('path');

module.exports = async ({ config }) => {
    Object.entries(aliases).forEach(([ key, val ]) => {
        config.resolve.alias[key] = path.resolve(__dirname, `../${ val }`);
    });
    return config;
}