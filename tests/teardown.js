const fs = require('fs-extra');
const rmdir = require('rimraf');

const teardown = async () => {
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
