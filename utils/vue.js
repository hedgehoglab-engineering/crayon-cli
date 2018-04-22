const { existsSync, readFileSync, writeFileSync } = require('fs-extra');
const path = require('path');
const { config } = require('../utils/config');
const appEntry = path.resolve(config.js_directory, config.js_entry);

/**
 * Add a property to the vue instance
 *
 * @param {String} val
 */
const addToInstance = (val) => {
    // Make sure the entry file actually exists
    if (!existsSync(appEntry)) {
        throw new Error('App entry point not found.');
    }

    // Split the file into lines that we can search through
    const appJs = readFileSync(appEntry, 'utf8').split('\n');

    // Make sure Vue is set up in the project
    if (!appJs.includes('new Vue({')) {
        throw new Error('Please add Vue to your project first.');
    }

    // Find the line that has the Vue instance and add the new value
    const newVueIndex = appJs.indexOf('new Vue({');
    appJs.splice(newVueIndex + 1, 0, `    ${val},`);

    // Update the file with the addition
    writeFileSync(appEntry, appJs.join('\n'));
};

module.exports = {
    addToInstance,
};
