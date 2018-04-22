const { write, reset } = require('../utils/config');

describe('config', () => {

    beforeAll(() => {
        write({
            js_directory: './repositories',
        }, '../test/.crayonrc');
    });

    afterAll(() => {
        reset('../test/.crayonrc');
    });

    test('user can override with a custom .crayonrc', () => {
        const { config } = require('../utils/config');

        expect(config.js_directory).toBe('./repositories');
    });

});
