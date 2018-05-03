const fs = require('fs-extra');
const path = require('path');
const { addToInstance } = require('../utils/vue');
const { config } = require('../utils/config');
const entryFile = path.resolve(config.js_directory, config.js_entry);

describe('vue helpers', () => {

    beforeAll(() => {
        fs.outputFileSync(entryFile, `
new Vue({
    el: '#app',
});
        `);
    });

    afterAll(() => {
        fs.unlink(entryFile);
    });

    test('inserts into the instance', () => {
        addToInstance('router');

        const entry = fs.readFileSync(entryFile, 'utf8');

        expect(entry).toContain('router,');
    });

});