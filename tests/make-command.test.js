const exec = require('../utils/execute');
const config = require('../utils/config');

describe('make:command', () => {

    afterAll(() => {
        config.reset();
    });

    test('is hidden in production', () => {
        config.write({
            env: 'production',
        }, './test/.crayonrc');

        expect.assertions(1);

        return exec('crayon').then((output) => {
            expect(output).not.toContain('make:command');
        });
    });

    test('is visible in dev mode', () => {
        config.write({
            env: 'dev',
        }, './test/.crayonrc');

        expect.assertions(1);

        return exec('crayon').then((output) => {
            expect(output).toContain('make:command');
        });
    });

});
