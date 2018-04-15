const { generateOutputPath, generateRepositoryName } = require('../commands/make-repository/utils');
/** @type {Object} **/
const fs = require('fs-extra');
/** @type {Promise} **/
const exec = require('../utils/execute');
const { testPath } = require('../utils');
const repositoryName = 'user';
const repositoryOutputPath = generateOutputPath(repositoryName);
const baseRepositoryOutputPath = generateOutputPath('Base');
const laroutePath = testPath('public/js/laroute.js');
const command = `crayon make:repository ${repositoryName}`;

describe('make:repository', () => {

    beforeAll(() => {
        fs.outputFileSync(laroutePath, '');
    });

    afterAll(() => {
        [repositoryOutputPath, baseRepositoryOutputPath, laroutePath].forEach((path) => {
            if (fs.existsSync(path)) {
                fs.unlink(path);
            }
        });
    });

    test('generates repository boilerplate', () => {
        expect.assertions(2);

        return exec(`${command} -o`).then((output) => {
            const fileExists = fs.existsSync(repositoryOutputPath);

            expect(output).toMatch(new RegExp(`${generateRepositoryName(repositoryName)} created successfully.`));
            expect(fileExists).toBe(true);
        });
    });

    test('generates BaseRepository', () => {
        expect.assertions(2);

        return exec(`${command} --with-base -o`).then((output) => {
            const fileExists = fs.existsSync(baseRepositoryOutputPath);

            expect(output).toMatch(new RegExp(`${generateRepositoryName('Base')} and ${generateRepositoryName(repositoryName)} created successfully.`));
            expect(fileExists).toBe(true);
        });
    });

});
