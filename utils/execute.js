const { exec } = require('child_process');

/**
 * Execute a command on the shell
 * 
 * @param  {String} command
 *
 * @param  {Boolean} test
 * 
 * @return {Promise}
 */
const execute = (command, test = true) => {
    return new Promise((resolve, reject) => {
        exec(command, {
            cwd: test ? './test' : process.cwd(),
        }, (error, stdout, stderr) => {
            if (error) {
                return reject({ error, stderr });
            }
            
            resolve(stdout); 
        });
    });
};

module.exports = execute;
