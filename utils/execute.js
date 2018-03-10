const { exec } = require('child_process');

const execute = (command) => {
    return new Promise((resolve, reject) => {
        exec(command, function(error, stdout, stderr) { 
            if (error) {
                return reject({ error, sterr });
            }
            resolve(stdout); 
        });
    });
};

module.exports = execute;
