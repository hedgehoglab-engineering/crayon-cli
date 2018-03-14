const { generateOutputPath, generateRepositoryName } = require('../commands/make-repository/utils');

const fs = require('fs-extra');
const exec = require('../utils/execute');

afterAll(() => {
    return fs.unlink(generateOutputPath('test'));
});

test('makes a repository', () => {
    expect.assertions(2);

    return exec('crayon make:repository test').then((output) => {
        const fileExists = fs.existsSync(generateOutputPath('test'));

        expect(output).toMatch(new RegExp(`${generateRepositoryName('test')} created successfully.`));
        expect(fileExists).toBe(true);
    });
});
