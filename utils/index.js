module.exports.toCamelCase = (string) => {
    return string.replace(/\b(\w)/g, (match, capture) => {
        return capture.toUpperCase();
    }).replace(/\s+/g, '');
}