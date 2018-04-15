const exec = require('../utils/execute');
/** @type {Object} **/
const fs = require('fs-extra');
const stylelintrcFile = './test/.stylelintrc';

describe('add:stylelint', () => {

    beforeAll(() => {
        jest.setTimeout(20000);

        return exec('yarn init -y', './test').then(() => {
            return exec('crayon add:stylelint', './test');
        });
    });

    test('adds correct dependencies', () => {
        const packageContents = require('../test/package.json');
        const devDependencies = Object.keys(packageContents.devDependencies);

        expect(devDependencies).toContain('stylelint-config-netsells');
        expect(devDependencies).toContain('stylelint');
    });

    test('generates a .stylelintrc', () => {
        const stylelintrcExists = fs.existsSync(stylelintrcFile);

        expect(stylelintrcExists).toBe(true);
    });

});
