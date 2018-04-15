const exec = require('../utils/execute');
/** @type {Object} **/
const fs = require('fs-extra');
const eslintrcFile = './test/.eslintrc';
const rmdir = require('rimraf');

describe('add:eslint', () => {

    beforeAll(() => {
        jest.setTimeout(10000);

        return Promise.all([
            exec('yarn init -y', './test'),
            exec('crayon add:eslint', './test'),
        ]);
    });

    afterAll(() => {
        [eslintrcFile, './test/yarn.lock', './test/package.json'].forEach((file) => {
            if (fs.existsSync(file)) {
                fs.unlink(file);
            }
        });

        rmdir('./test/node_modules');
    });

    test('adds correct dependencies', () => {
        const packageContents = require('../test/package.json');
        const devDependencies = Object.keys(packageContents.devDependencies);

        expect(devDependencies).toContain('eslint-config-netsells');
        expect(devDependencies).toContain('eslint');
    });

    test('generates a .eslintrc', () => {
        const eslintrcExists = fs.existsSync(eslintrcFile);

        expect(eslintrcExists).toBe(true);
    });

});
