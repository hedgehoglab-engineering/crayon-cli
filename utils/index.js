/**
 * Convert a string to upper camelcase
 *
 * @example toCamelCase('a-string') => 'AString'
 *
 * @param string
 *
 * @return {string}
 */
module.exports.toCamelCase = (string) => {
    return string.replace(/\b(\w)/g, (match, capture) => {
        return capture.toUpperCase();
    }).replace(/\s+/g, '');
};
