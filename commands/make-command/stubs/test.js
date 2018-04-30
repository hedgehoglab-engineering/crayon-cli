const exec = require('../utils/execute');

describe('{{COMMAND}}', () => {

    afterAll(() => {
        // Do some cleanup
    });

    test('runs successfully', () => {
        expect.assertions(1);

        return exec('crayon {{COMMAND}}').then((output) => {
            // Make an assertion
        });
    });

});
