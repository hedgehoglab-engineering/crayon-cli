const { toCamelCase } = require('../../utils');
const { js_directory } = require('../../utils/config');
const OUTPUT_DIRECTORY = `${js_directory}/repositories`;

/**
 * Generate the name of the repository
 *
 * @param name
 *
 * @returns {string}
 */
function generateRepositoryName (name) {
    return `${toCamelCase(name)}Repository`;
}

/**
 * Generate the fully formed output path of the repository file
 *
 * @param name
 *
 * @returns {string}
 */
function generateOutputPath (name) {
    return `${OUTPUT_DIRECTORY}/${generateRepositoryName(name)}.js`;
}

module.exports.OUTPUT_DIRECTORY = OUTPUT_DIRECTORY;
module.exports.generateRepositoryName = generateRepositoryName;
module.exports.generateOutputPath = generateOutputPath;
