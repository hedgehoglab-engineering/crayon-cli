const { generateOutputPath } = require('../commands/make-repository/utils');
const fs = require('fs-extra');
const path = require('path');
const exec = require('../utils/execute');
const repositoryName = 'user';
const outputPath = `./test/${generateOutputPath(repositoryName)}`;

describe('make:repository', () => {

    afterAll(() => {
        if (fs.existsSync(path.resolve(outputPath))) {
            fs.unlink(path.resolve(outputPath));
        }
    });

    test('generates boilerplate', () => {
        expect.assertions(2);

        return exec(`crayon make:repository ${repositoryName}`).then((output) => {
            const fileExists = fs.existsSync(path.resolve(outputPath));

            expect(output).toMatch('UserRepository created successfully.');
            expect(fileExists).toBe(true);
        });
    });

});
