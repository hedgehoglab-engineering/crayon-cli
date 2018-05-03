const fs = require('fs-extra');
const path = require('path');
const config = require('../utils/config');
const entryFile = path.join(process.cwd(), 'test', config.get('js_directory'), config.get('js_entry'));
const exec = require('../utils/execute');

const configJsDir = config.get('js_directory');
const jsDir = path.resolve('test', configJsDir !== undefined ? configJsDir : 'resources/assets/js');

describe('add:vuex', () => {

    beforeAll(() => {
        if (!fs.existsSync(entryFile)){
            const appJsStub = fs.readFileSync(path.join(`${__dirname}/stubs/add-vuex/app.js`), 'utf8');

            fs.outputFileSync(entryFile, appJsStub);
        }
    });

    afterAll(() => {
        fs.unlink(entryFile);
        fs.removeSync(jsDir);
    });

    test('creates files in correct places', () => {
        expect.assertions(1);

        return exec('crayon add:vuex').then((output) => {
            expect(fs.existsSync(path.join(jsDir, 'store/index.js'))).toBe(true);
        });
    });

    test('adds vuex to entry file', () => {
        expect.assertions(2);

        return exec('crayon add:vuex').then((output) => {
            const entryFileContents = fs.readFileSync(entryFile, 'utf-8');
            const entryFileContentsArray = entryFileContents.split('\n');
            
            expect(entryFileContentsArray.indexOf(`import store from './store';`)).toBeGreaterThan(-1);
            expect(entryFileContentsArray.indexOf(`    store,`)).toBeGreaterThan(entryFileContentsArray.indexOf(`new Vue({`));

        });
    });

});