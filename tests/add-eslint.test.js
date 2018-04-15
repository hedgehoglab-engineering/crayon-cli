const exec = require('../utils/execute');
/** @type {Object} **/
const fs = require('fs-extra');
const eslintrcFile = './test/.eslintrc';

describe('add:eslint', () => {

    beforeAll(() => {
        jest.setTimeout(20000);

        return exec('yarn init -y', './test').then(() => {
            return exec('crayon add:eslint', './test');
        });
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
