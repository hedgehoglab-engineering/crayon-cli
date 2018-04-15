const { exec } = require('child_process');
const fs = require('fs');

/**
 * Execute a command on the shell
 * 
 * @param {String} command
 * @param {String} directory
 *
 * @return {Promise}
 */
const execute = (command, directory = './') => {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
    }
    return new Promise((resolve, reject) => {
        exec(command, {
            cwd: directory,
        }, (error, stdout, stderr) => {
            if (error) {
                return reject({ error, stderr });
            }
            
            resolve(stdout); 
        });
    });
};

module.exports = execute;
