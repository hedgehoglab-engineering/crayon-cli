const exec = require('../utils/execute');
const { version } = require('../package');

test('cli runs', () => {
    return exec('crayon').then((content) => {
        console.log(content)
        return expect(content).toMatch(new RegExp(`crayon ${version}`));
    }).catch((error) => {
        console.log(error)
    });
});
