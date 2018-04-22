const path = require('path');

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

/**
 * Generate the test path to a file if provided
 *
 * @param {string?} file
 *
 * @return {string}
 */
module.exports.testPath = (file) => {
    return path.resolve('./test', file);
};
