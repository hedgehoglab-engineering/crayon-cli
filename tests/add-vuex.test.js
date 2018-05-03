const fs = require('fs-extra');
const path = require('path');
const { config } = require('../utils/config');
const entryFile = path.resolve(config.js_directory, config.js_entry);
const exec = require('../utils/execute');

describe('add:vuex', () => {

    beforeAll(() => {

    });

    afterAll(() => {
        
    });

    test('creates files in correct places', () => {
        return exec('crayon add:vuex');
    });

});