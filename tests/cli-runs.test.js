const exec = require('../utils/execute');
const { version } = require('../package');

test('cli runs', () => {
    return exec('crayon').then((content) => {
        return expect(content).toMatch(new RegExp(`crayon ${version}`));
    });
});
