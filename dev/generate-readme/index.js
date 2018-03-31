const fs = require('fs');
const execute = require('../../utils/execute');
const templateFile = fs.readFileSync(`${__dirname}/README.md`, 'utf8');
const outputFile = `${__dirname}/../../README.md`;

// Run the command and get the output
execute('crayon --no-color').then((commandOutput) => {
    // Replace it in our readme template
    const output = templateFile.replace('{{CRAYON_OUTPUT}}', commandOutput);

    // Write the file
    fs.writeFileSync(outputFile, output);
});
