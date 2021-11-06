const { readFileSync, writeFileSync } = require('fs-extra');
/** @type {string} */
const templateFile = readFileSync(`${ __dirname }/README.md`, 'utf8');
const outputFile = `${ __dirname }/../../README.md`;
const { execSync } = require('child_process');

// Run the command and get the output
try {
    const commandOutput = execSync('node ./index.js --help --no-color', {
        cwd: process.cwd(),
        encoding: 'utf-8',
    }).replace(/index\.js/g, 'crayon');

    // Replace it in our readme template
    const output = templateFile.replace('{{CRAYON_OUTPUT}}', commandOutput);

    // Write the file
    writeFileSync(outputFile, output);
} catch (e) {
    console.log(e);
}
