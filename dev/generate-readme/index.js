const { readFileSync, writeFileSync } = require('fs-extra');
const execute = require('../../utils/execute');
/** @type {String} */
const templateFile = readFileSync(`${__dirname}/README.md`, 'utf8');
const outputFile = `${__dirname}/../../README.md`;

// Run the command and get the output
execute('crayon --no-color').then((commandOutput) => {
    // Replace it in our readme template
    const output = templateFile.replace('{{CRAYON_OUTPUT}}', commandOutput);

    // Write the file
    writeFileSync(outputFile, output);
});
