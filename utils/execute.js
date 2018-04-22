const { exec } = require('child_process');

/**
 * Execute a command on the shell
 * 
 * @param  {String} command
 * 
 * @return {Promise}
 */
const execute = (command) => {
    return new Promise((resolve, reject) => {
        exec(command, {
            cwd: './test',
        }, (error, stdout, stderr) => {
            if (error) {
                return reject({ error, stderr });
            }
            
            resolve(stdout); 
        });
    });
};

module.exports = execute;
