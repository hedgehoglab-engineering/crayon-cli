const fs = require('fs-extra');
const exec = require('../utils/execute');
const testPath = './test/.crayonrc';

describe('init', () => {

    afterAll(() => {
        if (fs.existsSync(testPath)){
            fs.unlink(testPath);
        }
    });

    test('Create a Crayon config file', () => {
        expect.assertions(1);

        return exec('crayon init').then((output) => {

            console.log(output);

            expect( fs.existsSync(testPath) ).toBe(true);
        })
    })

});