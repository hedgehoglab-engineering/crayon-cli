const { existsSync, readFileSync, outputFileSync } = require('fs-extra');

// Default config
const config = {
    js_directory: './resources/assets/js',
    env: 'production',
};

// Override with the custom config if exists
if (existsSync(`${process.cwd()}/.crayonrc`)) {
    const projectConfig = readFileSync('./.crayonrc', 'utf8');

    // Merge!
    Object.assign(config, JSON.parse(projectConfig));
}

/**
 * Reset the .crayonrc to the default
 *
 * @param path
 */
const reset = (path) => {
    write(config, path);
};

/**
 * Set a single config value programmatically
 *
 * @param key
 * @param value
 */
const setValue = (key, value) => {
    config[key] = value;
};

/**
 * Fetch the whole config or a single value if a key is provided
 *
 * @param key
 *
 * @returns {Object|*}
 */
const get = (key = undefined) => {
    return (key) ? config[key] : config;
};

/**
 * Fetch the whole config or a single value if a key is provided
 *
 * @param data
 * @param path
 *
 * @returns {Object|*}
 */
const write = (data, path) => {
    const newConfig = Object.assign(config, data);

    outputFileSync(path, JSON.stringify(newConfig, null, 4));
};

module.exports = {
    config,
    setValue,
    get,
    write,
};
