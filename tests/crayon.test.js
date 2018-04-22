const exec = require('../utils/execute');
const { version } = require('../package');

describe('crayon', () => {

    test('runs', () => {
        return exec('crayon').then((content) => {
            return expect(content).toMatch(new RegExp(`crayon ${version}`));
        });
    });

});
