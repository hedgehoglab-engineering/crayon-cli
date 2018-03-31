const jsDir = './test/resources/assets/js';

describe('config', () => {

    test('user can override with a custom .crayonrc', () => {
        const { js_directory } = require('../utils/config');

        expect(js_directory).toBe(jsDir);
    });

});
