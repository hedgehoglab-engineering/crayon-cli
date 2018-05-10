const fs = require('fs-extra');
const path = require('path');
const config = require('../utils/config');
const entryFile = path.join(process.cwd(), 'test', config.get('js_directory'), config.get('js_entry'));
const exec = require('../utils/execute');

const configJsDir = config.get('js_directory');
const jsDir = path.resolve('test', configJsDir !== undefined ? configJsDir : 'resources/assets/js');

describe('remove:vuex', () => {

    beforeEach(() => {
        if (!fs.existsSync(entryFile)){
            const appJsStub = fs.readFileSync(path.join(`${__dirname}/stubs/add-vuex/app.js`), 'utf8');

            fs.outputFileSync(entryFile, appJsStub);
        }

        return exec('crayon add:vuex');
    }, 20000);

    test('removes vuex from entry file', () => {
        expect.assertions(2);

        return exec('crayon remove:vuex').then(() => {
            const entryFileContents = fs.readFileSync(entryFile, 'utf-8');
            const entryFileContentsArray = entryFileContents.split('\n');

            expect(entryFileContentsArray.indexOf(`import store from './store';`)).toEqual(-1);
            expect(entryFileContentsArray.indexOf(`    store,`)).toEqual(-1);
        }).catch((err) => {
            console.log(err);
        });

    }, 20000);

    test('removes store', () => {
        expect.assertions(1);

        return exec('crayon remove:vuex').then(() => {
            expect(fs.existsSync( path.join( jsDir, 'store' ) )).toBe(false);
        }).catch((err) => {
            console.log(err);
        });

    }, 20000);

});