/** @type {Object} **/
const fs = require('fs-extra');
/** @type {Promise} **/
const exec = require('../utils/execute');
const { testPath } = require('../utils');
const repositoryName = 'user';
const laroutePath = testPath('public/js/laroute.js');
const command = `crayon make:repository ${repositoryName}`;

describe('make:repository', () => {

    beforeAll(() => {
        fs.outputFileSync(laroutePath, '');
    });

    afterAll(() => {
        [laroutePath]
            .filter(fs.existsSync)
            .forEach((file) => fs.unlink(file));
    });

    test('generates repository boilerplate', () => {
        expect.assertions(2);

        return exec(`${command} -o`).then((output) => {
            const fileExists = fs.existsSync('./test/resources/assets/js/repositories/UserRepository.js');

            expect(output).toMatch(new RegExp('UserRepository created successfully.'));
            expect(fileExists).toBe(true);
        });
    });

    test('generates BaseRepository', () => {
        expect.assertions(2);

        return exec(`${command} --with-base -o`).then((output) => {
            const fileExists = fs.existsSync('./test/resources/assets/js/repositories/BaseRepository.js');

            expect(output).toMatch(new RegExp(`BaseRepository and UserRepository created successfully.`));
            expect(fileExists).toBe(true);
        });
    });

});
