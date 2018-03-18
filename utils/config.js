const { existsSync, readFileSync } = require('fs');
const path = require('path');

let config = {
    js_directory: path.resolve('./resources/assets/js'),
};

if (existsSync(`${process.cwd()}/.crayonrc`)) {
    let projectConfig = readFileSync('./.crayonrc', 'utf8');

    Object.assign(config, JSON.parse(projectConfig));
}

module.exports = config;
