const fs = require('fs-extra');
const exec = require('../utils/execute');
const rcPath = `${process.cwd()}/.crayonrc`;
const rcPathTemp = `${process.cwd()}/.crayonrc-temp`;

describe('make:repository', () => {

    beforeAll(() => {
        const rcExists = fs.existsSync(rcPath);

        if (rcExists){
            fs.moveSync(rcPath, rcPathTemp);
        }
    });

    afterAll(() => {
        const rcExists = fs.existsSync(rcPath);
        const rcTempExists = fs.existsSync(rcPathTemp);

        if(rcExists){

            fs.unlink(rcPath);

        }

        if (rcTempExists){
            fs.moveSync(rcPathTemp, rcPath, { overwrite: true });
        }
    });

    test('crayon initialize', () => {
        expect.assertions(1);

        return exec('crayon init').then((output) => {
            const fileExists = fs.existsSync(rcPath);

            expect(fileExists).toBe(true);
        })
    })

});