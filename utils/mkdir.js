const fs = require('fs');

/**
 * Recursively create a directory
 * 
 * @param  {String} directory
 */
const mkdir = (directory) => {
    directory.split('/').reduce((path, segment) => {
        path = `${path}/${segment}`;

        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }

        return path;
    }, '');
}

module.exports = mkdir;