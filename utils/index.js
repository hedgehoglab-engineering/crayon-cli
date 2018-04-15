const fs = require('fs-extra');

/**
 * Convert a string to upper camelcase
 *
 * @example toCamelCase('a-string') => 'AString'
 * @param {string} string
 *
 * @return {string}
 */
module.exports.toCamelCase = (string) => {
    return string.replace(/\b(\w)/g, (match, capture) => {
        return capture.toUpperCase();
    }).replace(/\s+/g, '');
};

module.exports.isWebpack = fs.existsSync('./webpack.mix.js') || fs.existsSync('./webpack.config.js');
