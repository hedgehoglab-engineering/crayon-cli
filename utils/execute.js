const { exec } = require('child_process');

/**
 * Execute a command on the shell.
 *
 * @param {string} command
 * @param {object} options
 *
 * @returns {Promise}
 */
const execute = (command, options = {}) => {
    return new Promise((resolve, reject) => {
        exec(command, options, (error, stdout, stderr) => {
            if (error) {
                return reject({ error, stderr });
            }

            resolve(stdout);
        });
    });
};

module.exports = execute;
