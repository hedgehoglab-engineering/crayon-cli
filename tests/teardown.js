const fs = require('fs-extra');
const rmdir = require('rimraf');

/**
 * Teardown function to run after all tests complete
 * 
 * @returns {Promise<any>}
 */
const teardown = async() => {
    return await new Promise((resolve) => {
        [
            './test/.eslintrc',
            './test/.stylelintrc',
            './test/yarn.lock',
            './test/package.json',
        ].forEach((file) => {
            if (fs.existsSync(file)) {
                fs.unlink(file);
            }
        });

        rmdir('./test/node_modules', resolve);
    });
};

module.exports = teardown;
