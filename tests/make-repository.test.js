const { generateOutputPath, generateRepositoryName } = require('../commands/make-repository/utils');
const fs = require('fs-extra');
const exec = require('../utils/execute');
const repositoryName = 'user';
const outputPath = generateOutputPath(repositoryName);

describe('make:repository', () => {

    afterAll(() => {
        fs.unlink(outputPath);
    });

    test('generates boilerplate', () => {
        expect.assertions(2);

        return exec(`crayon make:repository ${repositoryName}`).then((output) => {
            const fileExists = fs.existsSync(outputPath);

            expect(output).toMatch(new RegExp(`${generateRepositoryName(repositoryName)} created successfully.`));
            expect(fileExists).toBe(true);
        });
    });

});
