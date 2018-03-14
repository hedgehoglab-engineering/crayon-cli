const OUTPUT_DIRECTORY = `${process.cwd()}/js/repositories`;
module.exports.OUTPUT_DIRECTORY = OUTPUT_DIRECTORY;

    /**
 * Generate the camelcase entity name
 *
 * @param name
 *
 * @returns {string}
 */
function generateEntityName(name) {
    return name[0].toUpperCase() + name.slice(1);
}
module.exports.generateEntityName = generateEntityName;

/**
 * Generate the name of the repository
 *
 * @param name
 *
 * @returns {string}
 */
function generateRepositoryName (name) {
    return `${generateEntityName(name)}Repository`;
}
module.exports.generateRepositoryName = generateRepositoryName;

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
module.exports.generateOutputPath = generateOutputPath;
