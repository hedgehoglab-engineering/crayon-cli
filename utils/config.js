const { existsSync, readFileSync } = require('fs');
const path = require('path');

// Default config
let config = {
    js_directory: path.resolve('./resources/assets/js'),
};

// Override with the custom config if exists
if (existsSync(`${process.cwd()}/.crayonrc`)) {
    let projectConfig = readFileSync('./.crayonrc', 'utf8');

    // Merge!
    Object.assign(config, JSON.parse(projectConfig));
}

module.exports = config;
