const exec = require('../utils/execute');
const command = 'make:money';
const config = require('../utils/config');


describe('make:command', () => {

    afterAll(() => {
        // Do some cleanup
    });

    test('is hidden in production', () => {
        // expect.assertions(1);
        expect(1).toBe(1);

        return exec('crayon').then((output) => {
            expect(output).not.toContain('make:command');
        });
    });

    // test('is visible in dev mode', () => {
    //     expect.assertions(2);

    //     return exec(`crayon make:command ${repositoryName}`).then((output) => {
    //         const fileExists = fs.existsSync(outputPath);

    //         expect(output).toMatch(new RegExp(`${generateRepositoryName(repositoryName)} created successfully.`));
    //         expect(fileExists).toBe(true);
    //     });
    // });

});
